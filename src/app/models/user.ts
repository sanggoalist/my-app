import { Message } from './message';
import { AuthItem } from './authItem';

export class User{
    user_id?: number;
    nickname?: string;
    forbidden?: number;
    message?: Array<Message>;
    role?: number;
    friends?: Array<Number>;
    auth?: AuthItem;
    
}
