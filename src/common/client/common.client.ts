import {
  PublicKey, Signer, Transaction, TransactionSignature,
} from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { DBricksSDK, sizedBrick } from 'dbricks-lib';
import axios from 'axios';
import { configuredBricks, pushToStatusLog } from '@/common/common.state';
import { SERVER_BASE_URL, WALLET_PROVIDER_URL } from '@/config/config';

export default class SolClient extends DBricksSDK {
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

  async executeBricks(sizedBricks: sizedBrick[], wallet: Wallet): Promise<void> {
    const toDoTracker = {};
    const doneTracker = {};
    sizedBricks.forEach((b) => {
      toDoTracker[b.id] = (toDoTracker[b.id] + 1) || 1;
    });

    const promises: Promise<TransactionSignature>[] = [];
    sizedBricks.forEach((sizedBrick) => {
      const p = this.signTxWithWalletAndSend(sizedBrick.tx, sizedBrick.signers, wallet);
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

    const wallet = await this.connectWallet(WALLET_PROVIDER_URL);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ownerPk = wallet.publicKey!;
    pushToStatusLog({
      content: `Wallet connected to ${wallet.publicKey?.toBase58()}.`,
      color: 'white',
    });

    const fetchedBricks = await this.fetchBricksFromServer(SERVER_BASE_URL, configuredBricks.value, ownerPk);
    pushToStatusLog({
      content: `Instructions and signers for bricks ${fetchedBricks.map((b) => b.id)} fetched.`,
      color: 'white',
    });

    const flattenedBricks = this.flattenBricks(fetchedBricks);
    let sizedBricks = await this.findOptimalBrickSize(flattenedBricks, ownerPk);
    pushToStatusLog({
      content: 'Bricks re-composed to minimize required transactions.',
      color: 'white',
    });

    sizedBricks = await this.updateBlockhashOnSimilarTxs(sizedBricks);
    pushToStatusLog({
      content: 'Transactions with similar blockhashes de-duplicated.',
      color: 'white',
    });

    pushToStatusLog({
      content: 'Please sign the transactions with your wallet.',
      color: 'yellow',
    });
    await this.executeBricks(sizedBricks, wallet);
    return ownerPk;
  }

  // --------------------------------------- to be moved to sdk

  async getMintName(mintPk: string): Promise<string | undefined> {
    const res = await axios({
      baseURL: SERVER_BASE_URL,
      method: 'POST',
      url: '/mintname',
      data: {
        mintPk,
      },
    });
    return res.data;
  }
}
