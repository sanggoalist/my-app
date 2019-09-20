import { ActionReducer, Action } from '@ngrx/store'
import * as messageMap from '../actions/messageMap'
import { Info } from 'src/app/models/info'

export function reducer(state: Map<number, string> = new Map(), action: messageMap.MesssageMapChangeAction) {
  switch (action.type) {
    case messageMap.MESSAGEIDSCHANGE:
      return action.payload
    default:
      return state
  }
}