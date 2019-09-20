import { ActionReducer, Action } from '@ngrx/store'
import * as message from '../actions/message'
import { Message } from 'src/app/models/message'
import { WrapperMessage } from 'src/app/models/wrapperMessage'


export function reducer(state: WrapperMessage[] = [], action: message.MessageFriendChangeAction) {
  switch (action.type) {
    case message.MESSAGEFRIENDCHANGE:
      return action.payload
    default:
      return state
  }
}