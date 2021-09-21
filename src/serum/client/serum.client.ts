import axios from 'axios';
import { PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';
import { Order } from '@project-serum/serum/lib/market';
import SolClient from '@/common/client/common.client';
import { SERUM_PROG_ID, SERVER_BASE_URL } from '@/config/config';

export default class SerumClient extends SolClient {
  async getBaseQuote(marketPk: string): Promise<[string, string]> {
    const res = await axios({
      baseURL: SERVER_BASE_URL,
      method: 'POST',
      url: '/serum/markets/basequote',
      data: {
        marketPk,
      },
    });
    return res.data;
  }

  async getOrdersForOwner(
    marketPk: PublicKey | string,
    ownerPk: PublicKey,
  ): Promise<Order[]> {
    const market = await Market.load(
      this.connection,
      typeof (marketPk) === 'string' ? new PublicKey(marketPk) : marketPk,
      {
        skipPreflight: true,
        commitment: 'processed',
      },
      SERUM_PROG_ID,
    );
    return market.loadOrdersForOwner(
      this.connection,
      ownerPk,
    );
  }
}
