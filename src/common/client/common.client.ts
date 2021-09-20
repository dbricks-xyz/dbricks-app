import axios, { AxiosPromise } from 'axios';
import { PublicKey, TransactionSignature } from '@solana/web3.js';
import { deserializeIxsAndSigners } from 'dbricks-lib';
import { DbricksSDK, fetchedBrick } from '@/common/sdk';
import { configuredBricks, pushToStatusLog } from '@/common/common.state';
import { isLast } from '@/common/common.util';
import { SERVER_BASE_URL } from '@/common/sdk/config';

export default class SolClient extends DbricksSDK {
  fetchedBricks: fetchedBrick[] = [];

  async executeTxsFromBricks(): Promise<void> {
    // Simple solution - single req = single tx
    const promises: Promise<TransactionSignature>[] = [];

    this.fetchedBricks.forEach((brick) => {
      brick.ixsAndSigners.forEach((iAndS) => {
        if (iAndS.ixs.length > 0) {
          const p = this.signAndSendTx(iAndS);
          promises.push(p);
          p
            .then((sig) => {
              pushToStatusLog({
                content: `Tx successful, ${sig}`,
                color: 'green',
              });
              if (isLast(iAndS, brick.ixsAndSigners)) {
                pushToStatusLog({
                  content: `Done: ${brick.desc}.`,
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
        }
      });
    });

    // todo Hacky solution - try simulate, if fails, split in 2, then try again, keep doing
    //  would need a way to keep track of keypairs from the BE
    //  this means the BE will be sending packs of tx rather than everything mumbo jumboed together

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

  async requestTxsFromServer(): Promise<void> {
    const requests: AxiosPromise[] = [];
    configuredBricks.value.forEach((b) => {
      b.req.forEach((r) => {
        const req = axios({
          baseURL: SERVER_BASE_URL,
          method: r.method,
          url: r.path,
          data: {
            ...r.payload,
            ownerPk: (this.wallet.publicKey as PublicKey).toBase58(),
          },
        });
        requests.push(req);
        this.fetchedBricks.push({
          id: b.id,
          desc: b.desc,
          ixsAndSigners: [],
        });
      });
    });
    const responses = await axios.all(requests);

    for (let i = 0; i < responses.length; i += 1) {
      this.fetchedBricks[i].ixsAndSigners = deserializeIxsAndSigners(responses[i].data);
    }
    console.log('Fetched bricks from server:', this.fetchedBricks);
  }

  async executeAndLogTxs(): Promise<PublicKey> {
    pushToStatusLog({
      content: 'Building new transaction stack.',
      color: 'white',
    });

    await this.connectWallet();
    pushToStatusLog({
      content: `Wallet connected to ${this.ownerPk}.`,
      color: 'white',
    });

    await this.requestTxsFromServer();
    pushToStatusLog({
      content: `Instructions and signers for bricks ${this.fetchedBricks.map((b) => b.id)} fetched.`,
      color: 'white',
    });

    pushToStatusLog({
      content: 'Please sign the transactions with your wallet.',
      color: 'yellow',
    });
    await this.executeTxsFromBricks();

    return this.ownerPk as PublicKey;
  }
}
