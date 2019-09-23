import { Action } from '@ngrx/store';
import { Info } from 'src/app/models/info';

export const FRIENDLISTACCEPTCHANGE = '[FRIENDLISTACCEPTCHANGE] Change'

export class FriendListAcceptChangeAction implements Action {
  type = FRIENDLISTACCEPTCHANGE

  constructor(public payload: number[]) {}
}