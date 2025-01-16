import { IUserDTO } from '@/api/user/user.model';
import Router from '@/services/Router';
import Store from '@/services/Store';

export interface IStore {
    isLoading: boolean;
    authUser: IUserDTO | null;
    authError: string | null;
}

declare global {
    interface Window {
        router: Router;
        store: Store;
    }
}

window.router = window.router || {};
