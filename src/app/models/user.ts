import { Message } from './message';
import { AuthItem } from './authItem';
import { Mes } from './mes';
import { Notifications } from './notifications';

export class User{
    user_id?: number;
    nickname?: string;
    forbidden?: number;
    message?: Array<Message>;
    mes?: Mes;
    role?: number;
    friends?: Array<number>;
    auth?: AuthItem;
    notification?: Notifications;
    
}
