import { ActionReducer, Action } from '@ngrx/store'
import * as messages from '../actions/messages'


export function reducer(state: Map<number,string> = new Map<number,string>(), action: messages.MessagesChangeAction) {
  switch (action.type) {
    case messages.MESSAGESCHANGE:
      return action.payload
    default:
      return state
  }
}