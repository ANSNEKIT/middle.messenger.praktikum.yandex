import Handlebars from 'handlebars';
import DefaultLayout from './default.hbs?raw';
import './default-layout.pcss';

const defaultLayoutTemplate = Handlebars.compile(DefaultLayout);
const defaultLayoutData = {
    items: [
        {
            href: '#login',
            dataPage: 'loginPage',
            name: 'Вход',
        },
        {
            href: '#register',
            dataPage: 'registerPage',
            name: 'Регистрация',
        },
        {
            href: '#chats',
            dataPage: 'chatsPage',
            name: 'Чаты',
        },
        {
            href: '#profile',
            dataPage: 'profilePage',
            name: 'Профиль',
        },
        {
            href: '#profile-edit',
            dataPage: 'profileEditPage',
            name: 'Редактировать профиль',
        },
        {
            href: '#not-found',
            dataPage: 'notFoundPage',
            name: '404 ошибка',
        },
        {
            href: '#server-erorr',
            dataPage: 'serverErrorPage',
            name: '500 ошибка',
        },
    ],
}

export {
    defaultLayoutTemplate as template,
    defaultLayoutData as data,
}
