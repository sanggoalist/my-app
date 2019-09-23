import { ActionReducer, Action } from '@ngrx/store'
import * as friendListForAccept from '../actions/friendListForAccept'


export function reducer(state: number[] = [], action: friendListForAccept.FriendListAcceptChangeAction) {
  switch (action.type) {
    case friendListForAccept.FRIENDLISTACCEPTCHANGE:
      return action.payload
    default:
      return state
  }
}