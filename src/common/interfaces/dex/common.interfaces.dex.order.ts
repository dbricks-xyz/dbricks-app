export type side = 'buy' | 'sell';
export type orderType = 'limit' | 'ioc' | 'postOnly' | undefined;

export interface IDEXOrderPlace {
  marketName: string,
  side: side,
  price: string,
  size: string,
  orderType: orderType,
}

export interface IDEXOrderCancel {
  marketName: string,
  orderId: string,
}
