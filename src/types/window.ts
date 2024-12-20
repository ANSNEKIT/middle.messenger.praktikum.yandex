import Router from '@/services/Router';

declare global {
    interface Window {
        router: Router;
    }
}

window.router = window.router || {};
