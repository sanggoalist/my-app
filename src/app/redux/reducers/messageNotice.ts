import { ActionReducer, Action } from '@ngrx/store'
import * as messageNotice from '../actions/messageNotice'
import { Info } from 'src/app/models/info'

export function reducer(state: Map<number, number> = new Map(), action: messageNotice.MessageNoticeChangeAction) {
  switch (action.type) {
    case messageNotice.MESSAGENOTICESCHANGE:
      return action.payload
    default:
      return state
  }
}