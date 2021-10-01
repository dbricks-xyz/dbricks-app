import { PublicKey, Transaction } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Builder } from '@dbricks/dbricks-ts';
import { configuredBricks, pushToStatusLog } from '@/common/common.state';
import { CONNECTION_URL, WALLET_PROVIDER_URL } from '@/config/config';

async function connectWallet(): Promise<Wallet> {
  const wallet = new Wallet(WALLET_PROVIDER_URL, CONNECTION_URL);
  wallet.on('connect', (ownerPubkey) => {
    pushToStatusLog({
      content: `Wallet connected to ${ownerPubkey.toBase58()}.`,
      color: 'white',
    });
  });
  wallet.on('Disconnect', () => {
    pushToStatusLog({
      content: 'Wallet disconnected.',
      color: 'white',
    });
  });
  await wallet.connect();
  return wallet;
}

async function signTransactionWithWallet(tx: Transaction, wallet: Wallet): Promise<Transaction> {
  await wallet.signTransaction(tx);
  console.log('signeedddddd');
  return tx;
}

export async function buildAndExecute(): Promise<PublicKey> {
  pushToStatusLog({
    content: 'Building new brick stack.',
    color: 'white',
  });

  const wallet = await connectWallet();
  const builder = new Builder({
    ownerPubkey: wallet.publicKey!,
  });

  // prepare rawbricks
  configuredBricks.value.forEach((b) => {
    builder.addBrick({
      protocol: b.protocol,
      action: b.action,
      args: b.args,
    });
  });

  const parsedBricks = builder.parseBricks(builder.rawBricks);
  const fetchedBricks = await builder.fetchBricks(parsedBricks);
  pushToStatusLog({
    content: 'Instructions and signers for each of the bricks fetched.',
    color: 'white',
  });

  const flattenedBricks = builder.flattenBricks(fetchedBricks);
  const sizedBricks = await builder.optimallySizeBricks(flattenedBricks);
  pushToStatusLog({
    content: 'Bricks re-composed to minimize required transactions.',
    color: 'white',
  });

  const finalBricks = await builder.updateBlockhashOnSimilarTransactions(sizedBricks);
  pushToStatusLog({
    content: 'Transactions with similar blockhashes de-duplicated.',
    color: 'white',
  });

  pushToStatusLog({
    content: 'Please sign the transactions with your wallet.',
    color: 'yellow',
  });
  await builder.executeBricks(finalBricks, signTransactionWithWallet, [wallet]);
  pushToStatusLog({
    content: 'Transactions executed.',
    color: 'green',
  });

  return builder.ownerPubkey;
}
