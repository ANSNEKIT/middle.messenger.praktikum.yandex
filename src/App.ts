import * as Pages from './pages/index';
import { BASE_QUERY, ERouter } from './constants/router';
import Router from './services/Router';

export default class App {
    render() {
        window.router = new Router(BASE_QUERY);

        window.router
            .use(ERouter.LOGIN, Pages.LoginPage)
            .use(ERouter.REGISTRATION, Pages.RegisterPage)
            .use(ERouter.MESSENGER, Pages.ChatsPage)
            .use(ERouter.SETTINGS, Pages.ProfilePage)
            .use(ERouter.NOT_FOUND, Pages.NotFoundPage)
            .start();
    }
}
