import { HTTPTransport } from '@/services/httpTransport';
import { IAuthApi, IUserLogin, IUserRegistration } from './types';

const authApi = new HTTPTransport('/auth');

export default class AuthApi implements IAuthApi {
    async login(data: IUserLogin) {
        return authApi.post('/signup', { data });
    }
    async registration(data: IUserRegistration) {
        return authApi.post('/signin', { data });
    }
    async me() {
        return authApi.get('/user');
    }
    async logout() {
        return authApi.post('/logout');
    }
}
