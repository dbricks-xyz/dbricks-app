import { Method } from 'axios';
import {
  ISerumDEXMarketInitParams,
  ISerumDEXMarketSettleParams,
  ISerumDEXOrderCancelParams,
  ISerumDEXOrderPlaceParams,
  ixsAndSigners,
} from 'dbricks-lib';
import { Signer, Transaction } from '@solana/web3.js';

export type BrickPayload =
  ISerumDEXOrderPlaceParams | ISerumDEXOrderCancelParams |
  ISerumDEXMarketInitParams | ISerumDEXMarketSettleParams;

export type configuredRequest = {
  method: Method,
  path: string,
  payload: BrickPayload,
}

export type configuredBrick = {
  id: number,
  desc: string,
  req: configuredRequest[]
}

export type fetchedBrick = {
  id: number,
  desc: string,
  ixsAndSigners: ixsAndSigners[],
}

export type flattenedBrick = {
  id: number,
  desc: string,
  ixsAndSigners: ixsAndSigners,
}

export type sizedBrick = {
  id: number,
  desc: string,
  tx: Transaction,
  signers: Signer[],
}
