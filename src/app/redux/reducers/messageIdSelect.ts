import { ActionReducer, Action } from '@ngrx/store'
import * as messageIdSelect from '../actions/messageIdSelect'

export function reducer(state: string = null, action: messageIdSelect.MessageIdSelectChangeAction) {
  switch (action.type) {
    case messageIdSelect.MESSAGEIDSELECTCHANGE:
      return action.payload
    default:
      return state
  }
}