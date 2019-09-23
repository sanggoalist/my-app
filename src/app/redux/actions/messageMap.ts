import { Action } from '@ngrx/store';

export const MESSAGEIDSCHANGE = 'Message Ids Change';

export class MesssageMapChangeAction implements Action {
    type = MESSAGEIDSCHANGE;
  
    constructor(public payload: Map<number, string>) {}
  }