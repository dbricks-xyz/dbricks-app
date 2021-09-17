import {
  Connection, PublicKey,
  Signer,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import axios, { AxiosPromise } from 'axios';
import { deserializeIxs, deserializeSigners } from 'dbricks-lib';
import Wallet from '@project-serum/sol-wallet-adapter';
import { getConfiguredBricks } from '@/common/state';
import { CONNECTION_URL, SERVER_BASE_URL, WALLET_PROVIDER_URL } from '@/dbricks-sdk/config';

export default class SDK {
  connection: Connection;

  ixs: TransactionInstruction[] = [];

  signers: Signer[] = [];

  wallet!: Wallet;

  constructor() {
    this.connection = new Connection(CONNECTION_URL, 'processed');
    console.log('Initialized dbricks SDK');
  }

  async _connectWallet() {
    this.wallet = new Wallet(WALLET_PROVIDER_URL, CONNECTION_URL);
    this.wallet.on('connect', (ownerPk) => {
      console.log(`Wallet connected to ${ownerPk.toBase58()}`);
    });
    this.wallet.on('disconnect', () => console.log('Wallet disconnected'));
    await this.wallet.connect();
  }

  async _prepareAndSendTx(ixs: TransactionInstruction[], signers: Signer[]) {
    let tx = new Transaction().add(...ixs);
    const { blockhash } = await this.connection.getRecentBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = this.wallet.publicKey as PublicKey;

    // sign - first with passed signers, then finally with the wallet
    if (signers.length > 0) {
      tx.sign(...signers);
    }
    tx = await this.wallet.signTransaction(tx);

    const sig = await this.connection.sendRawTransaction(tx.serialize());
    console.log('Tx successful,', sig);
    return sig;
  }

  async _requestIxsFromServer() {
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
      });
    });
    const responses = await axios.all(requests);

    responses.forEach((r) => {
      const [serIxs, serSigners] = r.data;
      this.ixs.push(...deserializeIxs(serIxs));
      this.signers.push(...deserializeSigners(serSigners));
    });

    console.log('Resultingg instructions', this.ixs);
    console.log('Resultingg signers', this.signers);
  }

  async executeTxs() {
    await this._connectWallet();
    await this._requestIxsFromServer();
    await this._prepareAndSendTx(
      this.ixs,
      this.signers,
    );
  }
}
