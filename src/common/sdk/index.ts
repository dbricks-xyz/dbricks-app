import {
  Connection, PublicKey, Signer, Transaction, TransactionSignature,
} from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { CONNECTION_URL, WALLET_PROVIDER_URL } from '@/common/sdk/config';

export class DbricksSDK {
  connection: Connection;

  wallet: Wallet;

  ownerPk?: PublicKey;

  constructor() {
    this.connection = new Connection(CONNECTION_URL, 'processed');
    this.wallet = new Wallet(WALLET_PROVIDER_URL, CONNECTION_URL);
    console.log('Initialized dbricks SDK');
  }

  async connectWallet(): Promise<PublicKey | undefined> {
    this.wallet.on('connect', (ownerPk) => {
      this.ownerPk = ownerPk;
      console.log({
        content: `Wallet connected to ${ownerPk.toBase58()}.`,
        color: 'white',
      });
    });
    this.wallet.on('Disconnect', () => {
      this.ownerPk = undefined;
      console.log({
        content: 'Wallet disconnected.',
        color: 'white',
      });
    });
    await this.wallet.connect();
    return this.ownerPk;
  }

  async signAndSendTx(tx: Transaction, additionalSigners: Signer[]): Promise<TransactionSignature> {
    if (additionalSigners.length > 0) {
      tx.sign(...additionalSigners);
    }
    const signedTx = await this.wallet.signTransaction(tx);
    const sig = await this.connection.sendRawTransaction(signedTx.serialize());
    console.log('Tx successful', sig);
    return sig;
  }
}
