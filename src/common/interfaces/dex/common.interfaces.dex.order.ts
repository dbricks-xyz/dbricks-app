import BN from 'bn.js';

export type side = 'buy' | 'sell';
export type orderType = 'limit' | 'ioc' | 'postOnly' | undefined;

export interface IDEXOrderPlace {
  marketName: string,
  side: side,
  price: number,
  size: number,
  orderType: orderType,
}

export interface IDEXOrderCancel {
  marketName: string,
  orderId: BN,
}
