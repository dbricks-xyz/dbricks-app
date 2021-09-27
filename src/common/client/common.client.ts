import {
  PublicKey, Signer, Transaction, TransactionSignature,
} from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { DBricksSDK, sizedBrick } from 'dbricks-lib';
import { configuredBricks, pushToStatusLog } from '@/common/common.state';
import { SERVER_BASE_URL, WALLET_PROVIDER_URL } from '@/config/config';

export default class SolClient extends DBricksSDK {
  async connectWallet(
    providerUrl: string,
  ): Promise<Wallet> {
    const wallet = new Wallet(providerUrl, this.connectionUrl);
    wallet.on('connect', (ownerPubkey) => {
      console.log({
        content: `Wallet connected to ${ownerPubkey.toBase58()}.`,
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

  async signTransactionWithWalletAndSend(
    transaction: Transaction,
    additionalSigners: Signer[],
    wallet: Wallet,
  ): Promise<TransactionSignature> {
    if (additionalSigners.length > 0) {
      transaction.sign(...additionalSigners);
    }
    const signedTransaction = await wallet.signTransaction(transaction);
    const sig = await this.connection.sendRawTransaction(signedTransaction.serialize());
    console.log('Transaction successful', sig);
    return sig;
  }

  async executeBricks(sizedBricks: sizedBrick[], wallet: Wallet): Promise<void> {
    const toDoTracker = {};
    const doneTracker = {};
    sizedBricks.forEach((b) => {
      toDoTracker[b.id] = (toDoTracker[b.id] + 1) || 1;
    });

    const promises: Promise<TransactionSignature>[] = [];
    sizedBricks.forEach((sizedBrick) => {
      const p = this.signTransactionWithWalletAndSend(sizedBrick.transaction, sizedBrick.signers, wallet);
      promises.push(p);
      p
        .then((sig) => {
          pushToStatusLog({
            content: `Transaction successful, ${sig}`,
            color: 'green',
          });
          doneTracker[sizedBrick.id] = (doneTracker[sizedBrick.id] + 1) || 1;
          if (toDoTracker[sizedBrick.id] === doneTracker[sizedBrick.id]) {
            pushToStatusLog({
              content: `Brick succeffully executed: ${sizedBrick.description}.`,
              color: 'white',
            });
          }
        })
        .catch((e) => {
          pushToStatusLog({
            content: `Transaction failed, ${e}`,
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

    const wallet = await this.connectWallet(WALLET_PROVIDER_URL);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ownerPubkey = wallet.publicKey!;
    pushToStatusLog({
      content: `Wallet connected to ${wallet.publicKey?.toBase58()}.`,
      color: 'white',
    });

    const fetchedBricks = await this.fetchBricksFromServer(SERVER_BASE_URL, configuredBricks.value, ownerPubkey);
    pushToStatusLog({
      content: `Instructions and signers for bricks ${fetchedBricks.map((b) => b.id)} fetched.`,
      color: 'white',
    });

    const flattenedBricks = this.flattenBricks(fetchedBricks);
    let sizedBricks = await this.findOptimalBrickSize(flattenedBricks, ownerPubkey);
    pushToStatusLog({
      content: 'Bricks re-composed to minimize required transactions.',
      color: 'white',
    });

    sizedBricks = await this.updateBlockhashOnSimilarTransactions(sizedBricks);
    pushToStatusLog({
      content: 'Transactions with similar blockhashes de-duplicated.',
      color: 'white',
    });

    pushToStatusLog({
      content: 'Please sign the transactions with your wallet.',
      color: 'yellow',
    });
    await this.executeBricks(sizedBricks, wallet);
    return ownerPubkey;
  }

  // --------------------------------------- to be moved to sdk
}
