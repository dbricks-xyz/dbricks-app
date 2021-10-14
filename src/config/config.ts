/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Commitment, PublicKey } from '@solana/web3.js';

// --------------------------------------- network config
export const NETWORK = process.env.VUE_APP_NETWORK
  ? process.env.VUE_APP_NETWORK
  : 'mainnet';
console.log('// ---------------------------------------');
console.log('LOADED ENV:', NETWORK);

// --------------------------------------- server url config
export const SERVER_BASE_URL = process.env.VUE_APP_SERVER_BASE_URL
  ? process.env.VUE_APP_SERVER_BASE_URL
  : 'http://localhost:3000';
console.log('SERVER URL:', SERVER_BASE_URL);

// --------------------------------------- debug config
if (process.env.VUE_APP_DEBUG) {
  console.log('Debug mode on.');
}

// --------------------------------------- on-chain connection config
export let SERUM_PROG_ID: PublicKey;
export let SABER_PROG_ID: PublicKey;
export let MANGO_PROG_ID: PublicKey;
export let CONNECTION_URL: string;

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
  // if these aren't provided, using random keys to prevent compilation errors
  SERUM_PROG_ID = process.env.VUE_APP_LOCAL_SERUM_PROG_ID
    ? new PublicKey(process.env.VUE_APP_LOCAL_SERUM_PROG_ID)
    : new PublicKey('So11111111111111111111111111111111111111112');
  SABER_PROG_ID = process.env.VUE_APP_LOCAL_SABER_PROG_ID
    ? new PublicKey(process.env.VUE_APP_LOCAL_SABER_PROG_ID)
    : new PublicKey('So11111111111111111111111111111111111111112');
  MANGO_PROG_ID = process.env.VUE_APP_LOCAL_MANGO_PROG_ID
    ? new PublicKey(process.env.VUE_APP_LOCAL_MANGO_PROG_ID)
    : new PublicKey('So11111111111111111111111111111111111111112');
  CONNECTION_URL = 'http://localhost:8899';
} else {
  throw new Error(`Network unrecognized. Should be mainnet/devnet/localnet. Currently: ${NETWORK}`);
}

export const COMMITTMENT: Commitment = 'processed';
