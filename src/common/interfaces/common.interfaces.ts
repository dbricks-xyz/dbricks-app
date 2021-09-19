import { Method } from 'axios';
import {
  IDEXMarketInitParams, IDEXMarketSettleParams, IDEXOrderCancelParams, IDEXOrderPlaceParams,
} from 'dbricks-lib';

export type BrickPayload =
  IDEXOrderPlaceParams | IDEXOrderCancelParams |
  IDEXMarketInitParams | IDEXMarketSettleParams;

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
