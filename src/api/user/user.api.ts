import { HTTPTransport } from '@/services/httpTransport';
import { IProfileData, IUserApi, IUserAvatar, IUserChangePassword, IUserSearch } from './types';

const httpApi = new HTTPTransport('/user');
const options = {
    mode: 'cors',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export default class UserApi implements IUserApi {
    async putProfile(data: IProfileData) {
        return httpApi.put('/profile', { ...options, data });
    }
    async putAvatar(data: IUserAvatar) {
        return httpApi.put('/profile/avatar', { ...options, data });
    }
    async putPassword(data: IUserChangePassword) {
        return httpApi.put('/profile/password', { ...options, data });
    }
    async postSearch(data: IUserSearch) {
        return httpApi.post('/search', { ...options, data });
    }
}
