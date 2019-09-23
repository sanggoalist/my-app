export interface WrapperMessage{
    send_at: string;
    message?: string;
    sender_id?: number;
    target_id?: number;
    read?: boolean;
}