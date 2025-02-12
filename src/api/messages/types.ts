export interface IMessageOld {
    chat_id: number;
    time: 'string';
    type: 'string';
    user_id: 'string';
    content: 'string';
    file?: IMessageFile;
}

export interface IMessage {
    id: 'string';
    time: 'string';
    user_id: 'string';
    content: 'string';
    type: 'message';
}

export interface IMessageFile {
    id: number;
    user_id: number;
    path: 'string';
    filename: 'string';
    content_type: 'string';
    content_size: number;
    upload_date: 'string';
}
