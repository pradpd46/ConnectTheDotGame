import { Message } from './Message';
import { Line } from "./Line";

export interface StateUpdate {
  newLine: Line | null,
  heading: Message | null,
  message: Message | null
}