import { Action } from '@ngrx/store';
import { Info } from 'src/app/models/info';

export const FRIENDSCHANGE = '[FRIENDSCHANGE] Change'

export class FriendsChangeAction implements Action {
  type = FRIENDSCHANGE

  constructor(public payload: number[]) {}
}