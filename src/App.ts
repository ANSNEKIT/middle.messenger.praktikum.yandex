import { AuthPage, ProfileEditPage, ProfilePage, ChatsPage, StubPage } from './pages/index';
import LayoutDefault from './layouts/Default';
import { EPages } from './types';
import Header from './components/Header';
import {
    headerProps,
    loginPageProps,
    registerPageProps,
    profilePageProps,
    profileEditPageProps,
    chatsPageProps,
    serverErrorsPageProps,
    notFoundPageProps,
} from './constants';
import { BaseComponent } from './services/base-component';

const header = new Header('header', headerProps);
const loginPage = new AuthPage('div', loginPageProps);
const registerPage = new AuthPage('div', registerPageProps);
const profilePage = new ProfilePage('div', profilePageProps);
const profileEditPage = new ProfileEditPage('div', profileEditPageProps);
const chatsPage = new ChatsPage('div', chatsPageProps);
const notFoundPage = new StubPage('div', notFoundPageProps);
const serverErrorPage = new StubPage('div', serverErrorsPageProps);

const layoutPageProps = {
    attrs: {
        class: 'page',
    },
    header: header,
    page: chatsPage,
    '@click': onClickLayout,
};
const layoutDefault = new LayoutDefault('div', layoutPageProps);

const Pages: Record<EPages, BaseComponent> = {
    loginPage: loginPage,
    registerPage: registerPage,
    profilePage: profilePage,
    profileEditPage: profileEditPage,
    chatsPage: chatsPage,
    notFoundPage: notFoundPage,
    serverErrorPage: serverErrorPage,
};

function onClickLayout(evt: MouseEvent) {
    if ((evt?.target as HTMLElement)?.classList.contains('link')) {
        const link = evt.target as HTMLLinkElement;

        evt.preventDefault();

        const pageName = link.getAttribute('data-page') as EPages;

        if (pageName) {
            layoutDefault.setProps({ page: Pages[pageName] });
        }
    }
}

export default class App {
    $rootEl: HTMLElement | null;

    constructor() {
        this.$rootEl = document.getElementById('app');
    }

    render() {
        if (!this.$rootEl) {
            return;
        }

        const $defaultLayout = layoutDefault.getContent();

        if ($defaultLayout) {
            this.$rootEl.append($defaultLayout);
        }
    }
}
