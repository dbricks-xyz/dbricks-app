import { PublicKey, Transaction } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Builder, builderEmitter } from '@dbricks/dbricks-ts';
import { configuredBricks, pushToStatusLog } from '@/common/common.state';
import {
  COMMITTMENT, CONNECTION_URL, SERVER_BASE_URL, WALLET_PROVIDER_URL,
} from '@/config/config';

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
  return tx;
}

export async function buildAndLog(): Promise<PublicKey> {
  pushToStatusLog({
    content: 'Building new brick stack.',
    color: 'white',
  });

  const wallet = await connectWallet();
  const builder = new Builder({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ownerPubkey: wallet.publicKey!,
    connectionUrl: CONNECTION_URL,
    committment: COMMITTMENT,
    baseUrl: SERVER_BASE_URL,
  });

  // prepare rawbricks
  configuredBricks.value.forEach((b) => {
    builder.addBrick({
      protocol: b.protocol,
      action: b.action,
      args: b.args,
    });
  });

  builderEmitter.removeAllListeners();
  builderEmitter.on('fetchBricks', () => {
    pushToStatusLog({
      content: 'Instructions and signers fetched.',
      color: 'white',
    });
  });

  builderEmitter.on('optimallySizeBricks', (data) => {
    pushToStatusLog({
      content: data,
      color: 'white',
    });
  });

  builderEmitter.on('updateBlockhashOnSimilarTransactions', (data) => {
    pushToStatusLog({
      content: data,
      color: 'white',
    });
  });

  builderEmitter.on('executeBricks', (data) => {
    pushToStatusLog({
      content: data,
      color: 'green',
    });
  });

  builderEmitter.on('executeBricksError', (data) => {
    pushToStatusLog({
      content: data,
      color: 'red',
    });
  });

  builderEmitter.on('executeBricksSign', (data) => {
    pushToStatusLog({
      content: data,
      color: 'yellow',
    });
  });

  try {
    await builder.build(signTransactionWithWallet, [wallet]);
    pushToStatusLog({
      content: 'All transactions succeeded. 🎉',
      color: 'green',
    });
  } catch (e) {
    pushToStatusLog({
      content: 'Some transactions failed. Please re-run or see browser console to debug.',
      color: 'red',
    });
  }

  return builder.ownerPubkey;
}
