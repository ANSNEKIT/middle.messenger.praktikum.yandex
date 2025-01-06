import Router from '@/services/Router';
import Store from '@/services/Store';

export interface IStore {
    isLoading: boolean;
    authUser: string | null;
    authError: string | null;
}

declare global {
    interface Window {
        router: Router;
        store: Store;
    }
}

window.router = window.router || {};
