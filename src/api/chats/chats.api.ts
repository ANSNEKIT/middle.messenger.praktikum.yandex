import { IChatCreate, IChatDelete, IChatParams, IChatsApi, IChatUserParams, IChatUserPut } from './types';
import { HTTPTransport } from '@/services/httpTransport';

const httpApi = new HTTPTransport('/chats');

const options = {
    mode: 'cors',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export default class ChatsApi implements IChatsApi {
    async getChats(data: IChatParams = {}) {
        return httpApi.get('/', { ...options, data });
    }
    async addChat(data: IChatCreate) {
        return httpApi.post('/', { ...options, data });
    }
    async deleteChat(data: IChatDelete) {
        return httpApi.delete('/', { ...options, data });
    }
    async getUsers(data: IChatUserParams) {
        return httpApi.get(`/${data.id}/users`, { ...options, data });
    }
    async addUser(data: IChatUserPut) {
        return httpApi.put('/users', { ...options, data });
    }
    async deleteUser(data: IChatUserPut) {
        return httpApi.delete('/users', { ...options, data });
    }
}
