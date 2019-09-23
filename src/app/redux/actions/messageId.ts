import { Action } from '@ngrx/store'

export const MESSAGEIDCHANGE = '[MessageId] Change'

export class MessageIdChangeAction implements Action {
  type = MESSAGEIDCHANGE

  constructor(public payload: number) {}
}