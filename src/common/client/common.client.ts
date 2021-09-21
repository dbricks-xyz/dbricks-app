import axios, { AxiosPromise } from 'axios';
import {
  PublicKey, Signer, Transaction, TransactionSignature,
} from '@solana/web3.js';
import { deserializeIxsAndSigners, ixsAndSigners } from 'dbricks-lib';
import { DbricksSDK } from '@/common/sdk';
import { configuredBricks, pushToStatusLog } from '@/common/common.state';
import { SERVER_BASE_URL } from '@/common/sdk/config';
import { isLast } from '@/common/common.util';

type fetchedBrick = {
  id: number,
  desc: string,
  ixsAndSigners: ixsAndSigners[],
}

type flattenedBrick = {
  id: number,
  desc: string,
  ixsAndSigners: ixsAndSigners,
}

type sizedBrick = {
  id: number,
  desc: string,
  tx: Transaction,
  signers: Signer[],
}

export default class SolClient extends DbricksSDK {
  async fetchBricksFromServer(ownerPk?: PublicKey): Promise<fetchedBrick[]> {
    const fetchedBricks: fetchedBrick[] = [];
    const requests: AxiosPromise[] = [];
    configuredBricks.value.forEach((b) => {
      b.req.forEach((r) => {
        const req = axios({
          baseURL: SERVER_BASE_URL,
          method: r.method,
          url: r.path,
          data: {
            ...r.payload,
            ownerPk: ownerPk ?? (this.wallet.publicKey as PublicKey).toBase58(),
          },
        });
        requests.push(req);
        fetchedBricks.push({
          id: b.id,
          desc: b.desc,
          ixsAndSigners: [],
        });
      });
    });
    const responses = await axios.all(requests);

    for (let i = 0; i < responses.length; i += 1) {
      fetchedBricks[i].ixsAndSigners = deserializeIxsAndSigners(responses[i].data);
    }
    console.log('Fetched bricks from server:', fetchedBricks);
    return fetchedBricks;
  }

  // todo could add dedup logic
  flattenBricks(fetchedBricks: fetchedBrick[]): flattenedBrick[] {
    const flattenedBricks: flattenedBrick[] = [];
    fetchedBricks.forEach((b) => {
      b.ixsAndSigners.forEach((i) => {
        if (i.ixs.length > 0) {
          flattenedBricks.push({
            id: b.id,
            desc: b.desc,
            ixsAndSigners: i,
          });
        }
      });
    });
    console.log('Flattened bricks', flattenedBricks);
    return flattenedBricks;
  }

  async findOptimalBrickSize(bricks: flattenedBrick[]): Promise<sizedBrick[]> {
    console.log(`Attempting tx with ${bricks.length} bricks`);
    const attemptedBrick: sizedBrick = {
      id: 0,
      desc: '',
      tx: new Transaction(),
      signers: [],
    };
    bricks.forEach((i) => {
      attemptedBrick.id = i.id;
      attemptedBrick.desc = i.desc;
      attemptedBrick.tx.add(...i.ixsAndSigners.ixs);
      attemptedBrick.signers.push(...i.ixsAndSigners.signers);
    });
    attemptedBrick.tx.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
    attemptedBrick.tx.feePayer = this.ownerPk;
    try {
      const buf = attemptedBrick.tx.serialize({
        verifySignatures: false,
      });
      console.log(`Tx of size ${buf.length} fits ${bricks.length} bricks just ok`);
      return [attemptedBrick];
    } catch (e) {
      const middle = Math.ceil(bricks.length / 2);
      console.log(`Tx with ${bricks.length} bricks is too large, breaking into 2 at ${middle}`);
      const left = bricks.splice(0, middle);
      const right = bricks.splice(-middle);
      return [...(await this.findOptimalBrickSize(left)), ...(await this.findOptimalBrickSize(right))];
    }
  }

  async executeBricks(sizedBricks: sizedBrick[]): Promise<void> {
    const toDoTracker = {};
    const doneTracker = {};
    sizedBricks.forEach((b) => {
      toDoTracker[b.id] = (toDoTracker[b.id] + 1) || 1;
    });

    const promises: Promise<TransactionSignature>[] = [];
    sizedBricks.forEach((sizedBrick) => {
      const p = this.signAndSendTx(sizedBrick.tx, sizedBrick.signers);
      promises.push(p);
      p
        .then((sig) => {
          pushToStatusLog({
            content: `Tx successful, ${sig}`,
            color: 'green',
          });
          doneTracker[sizedBrick.id] = (doneTracker[sizedBrick.id] + 1) || 1;
          if (toDoTracker[sizedBrick.id] === doneTracker[sizedBrick.id]) {
            pushToStatusLog({
              content: `Brick succeffully executed: ${sizedBrick.desc}.`,
              color: 'white',
            });
          }
        })
        .catch((e) => {
          pushToStatusLog({
            content: `Tx failed, ${e}`,
            color: 'red',
          });
        });
    });
    await Promise.all(promises)
      .then(() => {
        pushToStatusLog({
          content: 'All transactions succeeded.',
          color: 'green',
        });
      })
      .catch(() => {
        pushToStatusLog({
          content: 'Some transactions failed, see log.',
          color: 'red',
        });
      });
  }

  async prepAndExecBricks(): Promise<PublicKey> {
    pushToStatusLog({
      content: 'Building new brick stack.',
      color: 'white',
    });

    await this.connectWallet();
    pushToStatusLog({
      content: `Wallet connected to ${this.ownerPk}.`,
      color: 'white',
    });

    const fetchedBricks = await this.fetchBricksFromServer();
    pushToStatusLog({
      content: `Instructions and signers for bricks ${fetchedBricks.map((b) => b.id)} fetched.`,
      color: 'white',
    });

    const flattenedBricks = this.flattenBricks(fetchedBricks);
    const sizedBricks = await this.findOptimalBrickSize(flattenedBricks);
    pushToStatusLog({
      content: 'Bricks re-composed to minimize required transactions.',
      color: 'white',
    });

    pushToStatusLog({
      content: 'Please sign the transactions with your wallet.',
      color: 'yellow',
    });
    await this.executeBricks(sizedBricks);
    return this.ownerPk as PublicKey;
  }
}
