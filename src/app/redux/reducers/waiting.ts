import { ActionReducer, Action } from '@ngrx/store'
import * as waiting from '../actions/waiting';


export function reducer(state: boolean = false, action: waiting.WaitingAction) {
  switch (action.type) {
    case waiting.WAITING:
      return action.payload
    default:
      return state
  }
}