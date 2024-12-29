import { HTTPTransport } from '@/services/httpTransport';
import { IAuthApi, IUserLogin, IUserRegistration } from '../types';

const httpApi = new HTTPTransport('/auth');

export default class AuthApi implements IAuthApi {
    async login(data: IUserLogin) {
        return httpApi.post('/signin', { data });
    }
    async registration(data: IUserRegistration) {
        return httpApi.post('/signup', { data });
    }
    async me() {
        return httpApi.get('/user');
    }
    async logout() {
        return httpApi.post('/logout');
    }
}
