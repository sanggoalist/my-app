import { ActionReducer, Action } from '@ngrx/store'
import * as info from '../actions/infoList'
import { Info } from 'src/app/models/info'

export function reducer(state: Array<Info> = [], action: info.InfoChangeAction) {
  switch (action.type) {
    case info.INFOCHANGE:
      return action.payload
    default:
      return state
  }
}