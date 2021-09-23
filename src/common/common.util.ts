import SolClient from '@/common/client/common.client';
import { COMMITTMENT, CONNECTION_URL, SERVER_BASE_URL } from '@/config/config';
import SerumClient from '@/serum/client/serum.client';

export function isLast<T>(i: T, arr: T[]): boolean {
  return arr.indexOf(i) === arr.length - 1;
}

export async function prettifyMint(mintPk: string): Promise<string> {
  const name: string | undefined = await (new SolClient(CONNECTION_URL, COMMITTMENT)).getMintName(mintPk, SERVER_BASE_URL);
  console.log('Received mint name:', name);
  return name || `${mintPk.substring(0, 5)}..`;
}

export async function getMarketMints(marketPk: string): Promise<[string, string]> {
  const [base, quote] = await (new SerumClient(CONNECTION_URL, COMMITTMENT)).getMarketMints(marketPk);
  if (base.length > 20 && quote.length > 20) {
    return [await prettifyMint(base), await prettifyMint(quote)];
  }
  console.log('Received market mints:', base, quote);
  return [base, quote];
}
