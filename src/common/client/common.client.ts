import { PublicKey } from '@solana/web3.js';
import { Builder, builderEmitter } from '@dbricks/dbricks-ts';
import { configuredBricks, connectedWallet, pushToStatusLog } from '@/common/common.state';
import { COMMITTMENT, CONNECTION_URL, SERVER_BASE_URL } from '@/config/config';

export async function buildAndLog(): Promise<PublicKey | undefined> {
  pushToStatusLog({
    content: 'Building new brick stack.',
    color: 'white',
  });
  let connectedAdapter;
  if (connectedWallet.value) {
    connectedAdapter = connectedWallet.value.connectedAdapter;
  } else {
    pushToStatusLog({
      content: 'Looks like you haven\'t connected your wallet!',
      color: 'red',
    });
    return;
  }

  const builder = new Builder({
    ownerPubkey: connectedAdapter.publicKey,
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
  builderEmitter.on('fetchBricks', (data) => {
    pushToStatusLog({
      content: data,
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
    await builder.build({
      connectedAdapter,
    });
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

  // eslint-disable-next-line consistent-return
  return builder.ownerPubkey;
}
