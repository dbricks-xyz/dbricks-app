import { PublicKey } from '@solana/web3.js';

export interface IDEXMarketInit {
  baseMintPk: PublicKey,
  quoteMintPk: PublicKey,
  lotSize: string,
  tickSize: string,
}

export interface IDEXMarketSettle {
  marketName: string,
}
