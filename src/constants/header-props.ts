import Link from "@/components/Link";


export const headerProps = {
    attrs: {
        class: 'header',
    },
    items: [
        new Link('a', {
            href: '/login',
            dataPage: 'loginPage',
            linkName: 'Вход',
        }),
        new Link('a', {
            href: '/register',
            dataPage: 'registerPage',
            linkName: 'Регистрация',
        }),
        new Link('a', {
            href: '/chats',
            dataPage: 'chatsPage',
            linkName: 'Чаты',
        }),
        new Link('a', {
            href: '/profile',
            dataPage: 'profilePage',
            linkName: 'Профиль',
        }),
        new Link('a', {
            href: '/profile-edit',
            dataPage: 'profileEditPage',
            linkName: 'Редактировать профиль',
        }),
        new Link('a', {
            href: '/not-found',
            dataPage: 'notFoundPage',
            linkName: '404 ошибка',
        }),
        new Link('a', {
            href: '/server-erorr',
            dataPage: 'serverErrorPage',
            linkName: '500 ошибка',
        }),
    ],
};
