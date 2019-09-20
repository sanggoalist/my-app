import { Action } from '@ngrx/store'

export const MESSAGEIDSELECTCHANGE = '[MESSAGEIDSELECTCHANGE] Change'

export class MessageIdSelectChangeAction implements Action {
  type = MESSAGEIDSELECTCHANGE

  constructor(public payload: string) {}
}