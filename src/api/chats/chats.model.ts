export interface IChatDTO {
    id: number;
    title: string;
    avatar: File | null;
    created_by: number;
    unread_count: number;
    last_message: string | null;
}

export interface IChatCreateDTO {
    id: number;
}

export interface IChatDeleteDTO {
    chatId: number;
}

export interface IChatUserDTO {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    avatar: File | null;
    role: string;
}
