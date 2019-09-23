import { ActionReducer, Action } from '@ngrx/store'
import * as friendSelect from '../actions/friendSelect'

export function reducer(state: number = -1, action: friendSelect.FriendSelectChangeAction) {
  switch (action.type) {
    case friendSelect.FRIENDSELECTCHANGE:
      return action.payload
    default:
      return state
  }
}