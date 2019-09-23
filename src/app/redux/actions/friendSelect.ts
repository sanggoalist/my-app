import { Action } from '@ngrx/store'

export const FRIENDSELECTCHANGE = '[FRIENDSELECTCHANGE] Change'

export class FriendSelectChangeAction implements Action {
  type = FRIENDSELECTCHANGE

  constructor(public payload: number) {}
}