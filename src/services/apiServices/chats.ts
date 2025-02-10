import ChatsApi from '@/api/chats/chats.api';
import * as ChatDTO from '@/api/chats/chats.model';
import * as ChatTypes from '@/api/chats/types';

const chatsApi = new ChatsApi();

export const getChats = async (): Promise<ChatDTO.IChatDTO[]> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await chatsApi.getChats();
        if (xhr.ok) {
            const chats = xhr.json<ChatDTO.IChatDTO[]>() || [];
            window.store.setState({ chats });
            return chats;
        }
        return [];
    } catch (responsError: unknown) {
        console.error(responsError);
        return [];
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const addChat = async (form: ChatTypes.IChatCreate): Promise<ChatDTO.IChatCreateDTO | null> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await chatsApi.addChat(form);
        if (xhr.ok) {
            const chat = xhr.json<ChatDTO.IChatCreateDTO>();
            return chat;
        }
        return null;
    } catch (responsError: unknown) {
        console.error(responsError);
        return null;
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const deleteChat = async (form: ChatTypes.IChatDelete): Promise<ChatDTO.IChatDeleteDTO | null> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await chatsApi.deleteChat(form);
        if (xhr.ok) {
            return xhr.json<ChatDTO.IChatDeleteDTO>();
        }
        return null;
    } catch (responsError: unknown) {
        console.error(responsError);
        return null;
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const getUsers = async (form: ChatTypes.IChatUserParams): Promise<ChatDTO.IChatUserDTO[]> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await chatsApi.getUsers(form);
        if (xhr.ok) {
            return xhr.json<ChatDTO.IChatUserDTO[]>() || [];
        }
        return [];
    } catch (responsError: unknown) {
        console.error(responsError);
        return [];
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const addUser = async (form: ChatTypes.IChatUserPut): Promise<void> => {
    window.store.setState({ isLoading: true });
    try {
        await chatsApi.addUser(form);
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const deleteUser = async (form: ChatTypes.IChatUserPut): Promise<void> => {
    window.store.setState({ isLoading: true });
    try {
        await chatsApi.deleteUser(form);
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const getToken = async (chatId: number): Promise<void> => {
    try {
        const xhr = await chatsApi.getToken(chatId);
        const data = xhr.json<ChatDTO.IToken>();
        window.store.setState({ token: data?.token || null });
    } catch (error) {
        console.log(error);
    }
};
