import { renderPage } from './utils/index';
import Handlebars from 'handlebars';
import {LoginPage, RegisterPage, ChatsPage, NotFoundPage, ServerErrorPage, ProfilePage, ProfileEditPage } from './pages/index';
import { EPages, TPageValues } from './types';
import Avatar from '@/components/Avatar/index';
import Button from '@/components/Button/index';
import Input from '@/components/Input/index';
import Link from '@/components/Link/index';
import PageTitle from '@/components/PageTitle/index';
import AuthForm from '@/partials/AuthForm';
import Header from '@/partials/Header';
import * as DefaultLayout from '@/layouts/Default';

// Base components
Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('PageTitle', PageTitle);


//Partials
Handlebars.registerPartial('AuthForm', AuthForm);
Handlebars.registerPartial('Header', Header);


export default class App {
    $rootEl: HTMLElement | null;
    currentPage: EPages;

    constructor() {
        this.currentPage = EPages.loginPage;
        this.$rootEl = document.getElementById('app');
    }

    render() {
        if (!this.$rootEl) {
            return;
        }

        this.$rootEl.innerHTML = renderPage(DefaultLayout.template, DefaultLayout.data);
        const $mainEl = document.getElementById('main');        

        this.setTeplatePage(this.currentPage, $mainEl);
        this.attachEventListeners();
    }

    attachEventListeners() {
        const pageLinks = document.querySelectorAll('.link');
        pageLinks.forEach((link) => {
            link.addEventListener('click', (evt) => {                
                evt.preventDefault();
                const evtTarget = evt.target as HTMLLinkElement;
                const pageName = evtTarget?.dataset?.page as TPageValues;

                if (!pageName) {
                    return;
                }

                this.changePage(pageName);
            });
        });
    }

    changePage(page: EPages) {
        this.currentPage = EPages[page];
        this.render();
    }

    setTeplatePage(page: EPages, mainEl: HTMLElement | null) {   
        if (!page || !mainEl) {
            return;
        }

        if (page === EPages.loginPage) {
            mainEl.innerHTML = renderPage(LoginPage.template, LoginPage.data);
            return;
        }

        if (page === EPages.registerPage) {            
            mainEl.innerHTML = renderPage(RegisterPage.template, RegisterPage.data);
            return;
        }

        if (page === EPages.chatsPage) {            
            mainEl.innerHTML = renderPage(ChatsPage.template, ChatsPage.data);
            return;
        }

        if (page === EPages.profilePage) {            
            mainEl.innerHTML = renderPage(ProfilePage.template, ProfilePage.data);
            return;
        }

        if (page === EPages.profileEditPage) {            
            mainEl.innerHTML = renderPage(ProfileEditPage.template, ProfileEditPage.data);
            return;
        }

        if (page === EPages.notFoundPage) {            
            mainEl.innerHTML = renderPage(NotFoundPage, {});
            return;
        }

        if (page === EPages.serverErrorPage) {            
            mainEl.innerHTML = renderPage(ServerErrorPage, {});
            return;
        }
    }

}
