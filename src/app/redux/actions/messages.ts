import { Action } from '@ngrx/store';


export const MESSAGESCHANGE = '[Amount] Change'

export class MessagesChangeAction implements Action {
  type = MESSAGESCHANGE

  constructor(public payload: Map<number, string>) {}
}