import Avatar from '@/components/Avatar';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';

export const profilePageProps = {
    attrs: {
        class: 'page page-center profile',
    },
    pageTitle: new PageTitle('h1', {
        class: 'profile__title',
        title: 'Профиль',
    }),
    avatar: new Avatar('div', {
        class: 'profile__avatar',
        image: '',
    }),
    profile: {
        userName: 'Артемий Лебедев',
        fields: [
            {
                name: 'Почта',
                value: 't@t.ru',
            },
            {
                name: 'Логин',
                value: 'asdf',
            },
            {
                name: 'Имя',
                value: 'Артемий',
            },
            {
                name: 'Фамилия',
                value: 'Лебедев',
            },
            {
                name: 'Имя в чате',
                value: 'art',
            },
            {
                name: 'Телефон',
                value: '+7999',
            },
        ],
    },
    editLink: new Link('a', {
        href: '/editProfile',
        dataPage: 'profileEditPage',
        linkName: 'Редактировать профиль',
    }),
};
