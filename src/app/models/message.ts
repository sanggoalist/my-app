import { Timestamp } from 'rxjs';

export class Message{
    message_id?: string;
    message?: string;
    user_id?: number;
    send_at?: string;
    read?: boolean;
}