import { Action } from '@ngrx/store';

export const MESSAGENOTICESCHANGE = 'Message Notices Change';

export class MessageNoticeChangeAction implements Action {
    type = MESSAGENOTICESCHANGE;
  
    constructor(public payload: Map<number, number>) {}
  }