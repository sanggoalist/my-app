import { ActionReducer, Action } from '@ngrx/store'
import * as messageId from '../actions/messageId'

export function reducer(state: number = -1, action: messageId.MessageIdChangeAction) {
  switch (action.type) {
    case messageId.MESSAGEIDCHANGE:
      return action.payload
    default:
      return state
  }
}