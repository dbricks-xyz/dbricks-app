import {
  Connection, PublicKey, Transaction, TransactionSignature,
} from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { ixsAndSigners } from 'dbricks-lib';
import { CONNECTION_URL, WALLET_PROVIDER_URL } from '@/common/sdk/config';

export type fetchedBrick = {
  id: number,
  desc: string,
  ixsAndSigners: ixsAndSigners[],
}

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

  async signAndSendTx(ixsAndSigners: ixsAndSigners): Promise<TransactionSignature> {
    let tx = new Transaction().add(...ixsAndSigners.ixs);
    const { blockhash } = await this.connection.getRecentBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = this.wallet.publicKey as PublicKey;

    // sign - first with passed signers, then finally with the wallet
    if (ixsAndSigners.signers.length > 0) {
      tx.sign(...ixsAndSigners.signers);
    }
    tx = await this.wallet.signTransaction(tx);
    const sig = await this.connection.sendRawTransaction(tx.serialize());
    console.log('Tx successful', sig);
    return sig;
  }
}
