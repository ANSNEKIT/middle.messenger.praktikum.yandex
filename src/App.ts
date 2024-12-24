import * as Pages from './pages/index';
import { BASE_QUERY, ERouter } from './constants/router';
import Router from './services/Router';
import Store from './services/Store';
import { EStoreEvents } from './types/store';

export default class App {
    useRouter() {
        window.router = new Router(BASE_QUERY);

        window.router
            .use(ERouter.LOGIN, Pages.LoginPage)
            .use(ERouter.REGISTRATION, Pages.RegisterPage)
            .use(ERouter.MESSENGER, Pages.ChatsPage)
            .use(ERouter.SETTINGS, Pages.ProfilePage)
            .use(ERouter.PROFILE_EDIT, Pages.ProfileEditPage)
            .use(ERouter.SERVER_ERROR, Pages.ServerErrorPage)
            .use(ERouter.NOT_FOUND, Pages.NotFoundPage)
            .start();
    }

    useStore() {
        window.store = new Store({
            isLoading: false,
            authUser: null,
            authError: null,
        });

        window.store.on(EStoreEvents.Updated, (oldStore, newStore) => {
            console.log('oldStore', oldStore);
            console.log('newStore', newStore);
        });
    }
}
