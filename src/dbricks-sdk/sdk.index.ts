import {
  Connection, PublicKey, Transaction, TransactionSignature,
} from '@solana/web3.js';
import axios, { AxiosPromise } from 'axios';
import { deserializeIxsAndSigners, ixsAndSigners } from 'dbricks-lib';
import Wallet from '@project-serum/sol-wallet-adapter';
import { getConfiguredBricks, pushToStatusLog } from '@/common/state';
import { CONNECTION_URL, SERVER_BASE_URL, WALLET_PROVIDER_URL } from '@/dbricks-sdk/sdk.config';
import { isLast } from '@/common/util';

type fetchedBrick = {
  id: number,
  desc: string,
  ixsAndSigners: ixsAndSigners[],
}

export default class SDK {
  connection: Connection;

  fetchedBricks: fetchedBrick[] = [];

  wallet!: Wallet;

  constructor() {
    this.connection = new Connection(CONNECTION_URL, 'processed');
    console.log('Initialized dbricks SDK');
  }

  async _connectWallet(): Promise<void> {
    this.wallet = new Wallet(WALLET_PROVIDER_URL, CONNECTION_URL);
    this.wallet.on('connect', (ownerPk) => {
      pushToStatusLog({
        content: `Wallet connected to ${ownerPk.toBase58()}.`,
        color: 'white',
      });
    });
    this.wallet.on('Disconnect', () => pushToStatusLog({
      content: 'Wallet disconnected.',
      color: 'white',
    }));
    await this.wallet.connect();
  }

  async _processSingleTx(ixsAndSigners: ixsAndSigners): Promise<TransactionSignature> {
    let tx = new Transaction().add(...ixsAndSigners.ixs);
    const { blockhash } = await this.connection.getRecentBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = this.wallet.publicKey as PublicKey;

    // sign - first with passed signers, then finally with the wallet
    if (ixsAndSigners.signers.length > 0) {
      tx.sign(...ixsAndSigners.signers);
    }
    tx = await this.wallet.signTransaction(tx);
    return this.connection.sendRawTransaction(tx.serialize());
  }

  async _prepareAndSendTx(): Promise<void> {
    pushToStatusLog({
      content: 'Please sign the transactions with your wallet.',
      color: 'yellow',
    });
    // Simple solution - single req = single tx
    for (const brick of this.fetchedBricks) {
      for (const iAndS of brick.ixsAndSigners) {
        if (iAndS.ixs.length > 0) {
          this._processSingleTx(iAndS)
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
      }
    }

    // todo Hacky solution - try simulate, if fails, split in 2, then try again, keep doing
    //  would need a way to keep track of keypairs from the BE
    //  this means the BE will be sending packs of tx rather than everything mumbo jumboed together
  }

  async _requestIxsFromServer(): Promise<void> {
    const requests: AxiosPromise[] = [];
    getConfiguredBricks.value.forEach((b) => {
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

  async executeTxs(): Promise<void> {
    await this._connectWallet();
    await this._requestIxsFromServer();
    await this._prepareAndSendTx();
  }

  // --------------------------------------- srm

  async getBaseQuote(marketPk: string): Promise<[string, string]> {
    const res = await axios({
      baseURL: SERVER_BASE_URL,
      method: 'POST',
      url: '/serum/markets/basequote',
      data: {
        marketPk,
      },
    });
    return res.data;
  }
}
