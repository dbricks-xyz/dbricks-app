import {
  Commitment,
  Connection, PublicKey, Signer, Transaction, TransactionSignature,
} from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import axios, { AxiosPromise } from 'axios';
import { deserializeIxsAndSigners } from 'dbricks-lib';
import {
  configuredBrick, fetchedBrick, flattenedBrick, sizedBrick,
} from '@/common/sdk/types';

export class DBricksSDK {
  connectionUrl: string;

  connection: Connection;

  constructor(connectionUrl: string, committment: Commitment) {
    this.connectionUrl = connectionUrl;
    this.connection = new Connection(connectionUrl, committment);
    console.log('Initialized dbricks SDK');
  }

  async connectWallet(
    providerUrl: string,
  ): Promise<Wallet> {
    const wallet = new Wallet(providerUrl, this.connectionUrl);
    wallet.on('connect', (ownerPk) => {
      console.log({
        content: `Wallet connected to ${ownerPk.toBase58()}.`,
        color: 'white',
      });
    });
    wallet.on('Disconnect', () => {
      console.log({
        content: 'Wallet disconnected.',
        color: 'white',
      });
    });
    await wallet.connect();
    return wallet;
  }

  async signTxWithWalletAndSend(
    tx: Transaction,
    additionalSigners: Signer[],
    wallet: Wallet,
  ): Promise<TransactionSignature> {
    if (additionalSigners.length > 0) {
      tx.sign(...additionalSigners);
    }
    const signedTx = await wallet.signTransaction(tx);
    const sig = await this.connection.sendRawTransaction(signedTx.serialize());
    console.log('Tx successful', sig);
    return sig;
  }

  async fetchBricksFromServer(baseURL: string, configuredBricks: configuredBrick[], ownerPk: PublicKey): Promise<fetchedBrick[]> {
    const fetchedBricks: fetchedBrick[] = [];
    const requests: AxiosPromise[] = [];
    configuredBricks.forEach((b) => {
      b.req.forEach((r) => {
        const req = axios({
          baseURL,
          method: r.method,
          url: r.path,
          data: {
            ...r.payload,
            ownerPk: ownerPk.toBase58(),
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

  // in the future could try add dedup logic - just need to be careful
  // eg user might have 3 "place order" ixs - we don't want to dedup to 1
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

  async findOptimalBrickSize(bricks: flattenedBrick[], feePayer: PublicKey): Promise<sizedBrick[]> {
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
    attemptedBrick.tx.feePayer = feePayer;
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
      return [
        ...(await this.findOptimalBrickSize(left, feePayer)),
        ...(await this.findOptimalBrickSize(right, feePayer)),
      ];
    }
  }
}
