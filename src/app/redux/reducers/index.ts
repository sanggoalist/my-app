import { Currency } from 'src/app/models/currency';

export interface State {
  amount: number
  currencies: Currency[]
  infoList: Array<Info>
  messsageMap: Map<number, string>;
  messageId: number;
  waiting: boolean;
  friends: number[];
  friendListForAccept: number[];
  messages: Map<number,string>;
  messageFriends: WrapperMessage[];
  friendSelect: number;
  messageIdSelect: string;
  messageNotice: Map<number,number>;
}
import * as fromAmount from './amount';
import * as fromCurrency from './currency';
import * as fromInfoList from './infoList';
import * as fromMessageMap from './messageMap';
import * as fromMessageId from './messageId';
import * as fromWaiting from './waiting';
import * as fromFriends from './friends';
import * as fromMessages from './messages';
import * as fromMessageFriend from './message';
import * as fromFriendSelect from './friendSelect';
import * as fromMessageIdSelect from './messageIdSelect';
import * as fromMessageNotice from './messageNotice';
import * as fromFriendListForAccept from './friendListForAccept';
import { Info } from 'src/app/models/info';
import { Message } from 'src/app/models/message';
import { WrapperMessage } from 'src/app/models/wrapperMessage';

export const reducers = {
  amount: fromAmount.reducer,
  currencies: fromCurrency.reducer,
  infoList: fromInfoList.reducer,
  messageMap: fromMessageMap.reducer,
  messageId: fromMessageId.reducer,
  waiting: fromWaiting.reducer,
  friends: fromFriends.reducer,
  messages: fromMessages.reducer,
  messageFriends: fromMessageFriend.reducer,
  friendSelect: fromFriendSelect.reducer,
  messageIdSelect: fromMessageIdSelect.reducer,
  messageNotice: fromMessageNotice.reducer,
  friendListForAccept: fromFriendListForAccept.reducer

}
export const getAmountState = (state: State) => state.amount

export const getCurrnecyRates = (state: State) => state.currencies

export const getInfoListState = (state: State) => state.infoList

export const getMessageMap = (state: State) => state.messsageMap

export const getMessageId = (state: State) => state.messageId

export const getWaiting = (state: State) => state.waiting

export const getFriends  = (state: State) => state.friends

export const getMessages  = (state: State) => state.messages

export const getMessageFriend  = (state: State) => state.messageFriends

export const getFriendSelect  = (state: State) => state.friendSelect

export const getMessageIdSelect  = (state: State) => state.messageIdSelect

export const getMessageNotice  = (state: State) => state.messageNotice

export const getFriendListForAccept  = (state: State) => state.friendListForAccept