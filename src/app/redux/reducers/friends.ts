import { ActionReducer, Action } from '@ngrx/store'
import * as friends from '../actions/friends'
import { Info } from 'src/app/models/info'

export function reducer(state: number[] = [], action: friends.FriendsChangeAction) {
  switch (action.type) {
    case friends.FRIENDSCHANGE:
      return action.payload
    default:
      return state
  }
}