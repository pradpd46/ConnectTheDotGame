import { StateUpdate } from './StateUpdate';
import { Point } from './Point';
import { RequestType, ResponseType } from '../configs/constants';

export interface Payload {
  msg: RequestType | ResponseType,
  body: StateUpdate | Point | string | null
}
