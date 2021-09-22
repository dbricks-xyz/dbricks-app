import axios from 'axios';
import { PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';
import { Order } from '@project-serum/serum/lib/market';
import SolClient from '@/common/client/common.client';
import { SERUM_PROG_ID, SERVER_BASE_URL } from '@/config/config';
import { pushToStatusLog } from '@/common/common.state';

export default class SerumClient extends SolClient {
  async getMarketMints(marketPk: string): Promise<[string, string]> {
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

  async getSerumOrdersForOwner(
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

  async printSerumOrdersForOwner(
    marketPk: PublicKey | string,
    ownerPk: PublicKey,
  ): Promise<void> {
    const orders = await this.getSerumOrdersForOwner(marketPk, ownerPk);
    const orderIds = orders.map((o) => `${o.orderId}\n`);
    pushToStatusLog({
      content: `User's outstanding Serum orders are: ${orderIds}`,
      color: 'white',
    });
  }
}
