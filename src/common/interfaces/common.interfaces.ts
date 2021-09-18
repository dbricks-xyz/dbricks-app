import { Method } from 'axios';
import {
  IDEXMarketInit, IDEXMarketSettle, IDEXOrderCancel, IDEXOrderPlace,
} from 'dbricks-lib';

export type BrickPayload =
  IDEXOrderPlace | IDEXOrderCancel |
  IDEXMarketInit | IDEXMarketSettle;

export interface IConfiguredRequest {
  method: Method,
  path: string,
  payload: BrickPayload,
}

export interface IConfiguredBrick {
  id: number,
  req: IConfiguredRequest[]
}
