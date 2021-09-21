import { PublicKey, TransactionSignature } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { DBricksSDK } from '@/common/sdk';
import { configuredBricks, pushToStatusLog } from '@/common/common.state';
import { sizedBrick } from '@/common/sdk/types';
import { SERVER_BASE_URL, WALLET_PROVIDER_URL } from '@/config/config';

export default class SolClient extends DBricksSDK {
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
    const sizedBricks = await this.findOptimalBrickSize(flattenedBricks, ownerPk);
    pushToStatusLog({
      content: 'Bricks re-composed to minimize required transactions.',
      color: 'white',
    });

    pushToStatusLog({
      content: 'Please sign the transactions with your wallet.',
      color: 'yellow',
    });
    await this.executeBricks(sizedBricks, wallet);
    return ownerPk;
  }
}
