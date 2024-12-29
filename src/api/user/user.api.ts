import { HTTPTransport } from '@/services/httpTransport';
import { IProfileData, IUserApi, IUserAvatar, IUserChangePassword, IUserSearch } from '../types';

const httpApi = new HTTPTransport('/user');

export default class UserApi implements IUserApi {
    async putProfile(data: IProfileData) {
        return httpApi.put('/profile', { data });
    }
    async putAvatar(data: IUserAvatar) {
        return httpApi.put('/profile/avatar', { data });
    }
    async putPassword(data: IUserChangePassword) {
        return httpApi.put('/profile/password', { data });
    }
    async postSearch(data: IUserSearch) {
        return httpApi.post('/search', { data });
    }
}
