import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import axios, { AxiosPromise } from 'axios';
import { deserializeIxsAndSigners, ixsAndSigners } from 'dbricks-lib';
import Wallet from '@project-serum/sol-wallet-adapter';
import { getConfiguredBricks, pushToStatusLog } from '@/common/state';
import { CONNECTION_URL, SERVER_BASE_URL, WALLET_PROVIDER_URL } from '@/dbricks-sdk/sdk.config';

type fetchedBrick = {
  id: number,
  desc: string,
  ixAndSigners: ixsAndSigners[],
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
      pushToStatusLog(`Wallet connected to ${ownerPk.toBase58()}`);
    });
    this.wallet.on('Disconnect', () => pushToStatusLog('Wallet disconnected'));
    await this.wallet.connect();
  }

  async _processSingleTx(ixAndSigners: ixsAndSigners): Promise<void> {
    let tx = new Transaction().add(...ixAndSigners.ixs);
    const { blockhash } = await this.connection.getRecentBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = this.wallet.publicKey as PublicKey;

    // sign - first with passed signers, then finally with the wallet
    if (ixAndSigners.signers.length > 0) {
      tx.sign(...ixAndSigners.signers);
    }
    tx = await this.wallet.signTransaction(tx);

    const sig = await this.connection.sendRawTransaction(tx.serialize());
    pushToStatusLog(`Tx successful, ${sig}`);
  }

  async _prepareAndSendTx(): Promise<void> {
    // todo 1 - single req = single tx

    // todo 2 hacky solution - try simulate, if fails, split in 2, then try again, keep doing
    //  would need a way to keep track of keypairs from the BE
    //  this means the BE will be sending packs of tx rather than everything mumbo jumboed together

    this.ixsAndSigners.forEach(async (iAndS) => {
      if (iAndS.ixs.length > 0) {
        await this._processSingleTx(iAndS);
      }
    });
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
          ixAndSigners: [],
        });
      });
    });
    const responses = await axios.all(requests);

    // todo check if responses order matches request order
    for (let i = 0; i <= responses.length; i++) {
      this.fetchedBricks[i].ixAndSigners = deserializeIxsAndSigners(responses[i].data);
    }
    console.log('Fetched bricks:', this.fetchedBricks);
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
