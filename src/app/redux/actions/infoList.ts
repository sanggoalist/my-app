import { Action } from '@ngrx/store';
import { Info } from 'src/app/models/info';
export const INFOCHANGE = 'Info Change';

export class InfoChangeAction implements Action {
    type = INFOCHANGE;
  
    constructor(public payload: Array<Info>) {}
  }