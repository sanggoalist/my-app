import { Action } from '@ngrx/store';

export const WAITING = '[WAITING] Change'

export class WaitingAction implements Action {
  type = WAITING

  constructor(public payload: boolean) {}
}