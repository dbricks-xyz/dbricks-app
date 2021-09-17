import { Method } from 'axios';
import { IDEXOrderPlace, IDEXOrderCancel } from '@/common/interfaces/dex/common.interfaces.dex.order';
import {
  IDEXMarketInit,
  IDEXMarketSettle,
} from '@/common/interfaces/dex/common.interfaces.dex.market';

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
