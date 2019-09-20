import { Action } from '@ngrx/store';
import { Message } from 'src/app/models/message';
import { WrapperMessage } from 'src/app/models/wrapperMessage';



export const MESSAGEFRIENDCHANGE = '[MESSAGEFRIENDCHANGE] Change'

export class MessageFriendChangeAction implements Action {
  type = MESSAGEFRIENDCHANGE

  constructor(public payload: WrapperMessage[]) {}
}