import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';
import { Order } from '@project-serum/serum/lib/market';
import {
  COMMITTMENT, CONNECTION_URL, SERUM_PROG_ID, SERVER_BASE_URL,
} from '@/config/config';
import { pushToStatusLog } from '@/common/common.state';

export default class SerumClient {
  connection: Connection;

  constructor() {
    this.connection = new Connection(CONNECTION_URL, COMMITTMENT);
  }

  async getMarketMints(marketPubkey: string): Promise<[string, string]> {
    const response = await axios({
      baseURL: SERVER_BASE_URL,
      method: 'POST',
      url: '/serum/markets/basequote',
      data: {
        marketPubkey,
      },
    });
    return response.data;
  }

  async getSerumOrdersForOwner(
    marketPubkey: PublicKey | string,
    ownerPubkey: PublicKey,
  ): Promise<Order[]> {
    const market = await Market.load(
      this.connection,
      typeof (marketPubkey) === 'string' ? new PublicKey(marketPubkey) : marketPubkey,
      {
        skipPreflight: true,
        commitment: 'processed',
      },
      SERUM_PROG_ID,
    );
    return market.loadOrdersForOwner(
      this.connection,
      ownerPubkey,
    );
  }

  async printSerumOrdersForOwner(
    marketPubkey: PublicKey | string,
    ownerPubkey: PublicKey,
  ): Promise<void> {
    const orders = await this.getSerumOrdersForOwner(marketPubkey, ownerPubkey);
    const orderIds = orders.map((o) => `${o.orderId}\n`);
    pushToStatusLog({
      content: `User's outstanding Serum orders are: ${orderIds}`,
      color: 'white',
    });
  }
}
