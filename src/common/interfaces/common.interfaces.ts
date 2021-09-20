import { Method } from 'axios';
import {
  ISerumDEXMarketInitParams, ISerumDEXMarketSettleParams, ISerumDEXOrderCancelParams, ISerumDEXOrderPlaceParams,
} from 'dbricks-lib';

export type BrickPayload =
  ISerumDEXOrderPlaceParams | ISerumDEXOrderCancelParams |
  ISerumDEXMarketInitParams | ISerumDEXMarketSettleParams;

export interface IConfiguredRequest {
  method: Method,
  path: string,
  payload: BrickPayload,
}

export interface IConfiguredBrick {
  id: number,
  desc: string,
  req: IConfiguredRequest[]
}
