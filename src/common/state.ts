import { computed, reactive } from 'vue';
import axios, { AxiosPromise } from 'axios';
import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  Signer,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { IConfiguredBrick } from '@/common/interfaces/common.interfaces';

const state = reactive({
  configuredBricks: <IConfiguredBrick[]>[],
});

export const getConfiguredBricks = computed(() => state.configuredBricks);

export const addOrModifyConfiguredBrick = (newOrUpdatedBrick: IConfiguredBrick):void => {
  const i = state.configuredBricks.map((b) => b.id).indexOf(newOrUpdatedBrick.id);
  if (i === -1) {
    state.configuredBricks.push(newOrUpdatedBrick);
  } else {
    state.configuredBricks[i] = newOrUpdatedBrick;
  }
  console.log('State updated', state.configuredBricks);
};

export const removeConfiguredBrick = (brickId: number):void => {
  const i = state.configuredBricks.map((b) => b.id).indexOf(brickId);
  if (i >= 0) {
    state.configuredBricks.splice(i, 1);
  }
  console.log('State updated', state.configuredBricks);
};

export async function prepareTxs(): Promise<[TransactionInstruction[], Signer[]]> {
  const ixs: TransactionInstruction[] = [];
  const signers: Signer[] = [];

  const requests: AxiosPromise[] = [];
  state.configuredBricks.forEach((b) => {
    console.log({
      ...b.payload,
      ownerPk: ownerKp.publicKey.toBase58(),
    });
    const r = axios({
      baseURL: 'http://localhost:3000',
      method: b.method,
      url: b.path,
      data: {
        ...b.payload,
        ownerPk: ownerKp.publicKey.toBase58(),
      },
    });
    requests.push(r);
  });

  const responses = await axios.all(requests);

  responses.forEach((r) => {
    const [serIxs, serSigners] = r.data;
    ixs.push(...deserializeIxs(serIxs));
    signers.push(...deserializeSigners(serSigners));
  });

  console.log('Resultingg instructions', ixs);
  console.log('Resultingg signers', signers);

  return [ixs, signers];
}

async function _prepareAndSendTx(ixs: TransactionInstruction[], signers: Signer[]) {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const tx = new Transaction().add(...ixs);
  const sig = await sendAndConfirmTransaction(connection, tx, signers);
  console.log('Tx successful,', sig);
}

export async function executeTx(ixs: TransactionInstruction[], signers: Signer[]) {
  await _prepareAndSendTx(
    ixs,
    [
      ownerKp,
      ...signers,
    ],
  );
}
