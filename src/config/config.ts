import { Commitment, PublicKey } from '@solana/web3.js';

/*eslint-disable */
export let NETWORK: string;
if (process.env.VUE_APP_TESTING_LOCAL) {
  NETWORK = 'localnet';
} else if (process.env.VUE_APP_TESTING_DEV) {
  NETWORK = 'devnet';
} else {
  NETWORK = process.env.VUE_APP_NETWORK as string;
}
console.log('// ---------------------------------------')
console.log('LOADED ENV:', NETWORK);

if (process.env.VUE_APP_DEBUG) {
  console.log('Debug mode on.');
}

export let SERUM_PROG_ID: PublicKey;
export let SABER_PROG_ID: PublicKey;
export let MANGO_PROG_ID: PublicKey;
export let CONNECTION_URL: string;
/* eslint-enable */

if (NETWORK === 'mainnet') {
  SERUM_PROG_ID = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');
  SABER_PROG_ID = new PublicKey('SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ');
  MANGO_PROG_ID = new PublicKey('mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68');
  CONNECTION_URL = 'https://solana-api.projectserum.com';
} else if (NETWORK === 'devnet') {
  SERUM_PROG_ID = new PublicKey('DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY');
  SABER_PROG_ID = new PublicKey('Crt7UoUR6QgrFrN7j8rmSQpUTNWNSitSwWvsWGf1qZ5t');
  MANGO_PROG_ID = new PublicKey('4skJ85cdxQAFVKbcGgfun8iZPL7BadVYXG3kGEGkufqA');
  CONNECTION_URL = 'https://api.devnet.solana.com';
} else if (NETWORK === 'localnet') {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  SERUM_PROG_ID = new PublicKey(process.env.VUE_APP_LOCAL_SERUM_PROG_ID!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  SABER_PROG_ID = new PublicKey(process.env.VUE_APP_LOCAL_SABER_PROG_ID!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  MANGO_PROG_ID = new PublicKey(process.env.VUE_APP_LOCAL_MANGO_PROG_ID!);
  CONNECTION_URL = 'http://localhost:8899';
} else {
  throw new Error(`Network unrecognized. Should be mainnet/devnet/localnet. Currently: ${NETWORK}`);
}

export const SERVER_BASE_URL = 'http://localhost:3000';
export const WALLET_PROVIDER_URL = 'https://www.sollet.io';
export const COMMITTMENT: Commitment = 'processed';
