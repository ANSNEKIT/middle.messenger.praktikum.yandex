import Handlebars from 'handlebars';
import ProfilePage from './profile.hbs?raw';
import './profile.pcss';

const profilePageTemplate = Handlebars.compile(ProfilePage);
const profilePageData = {
    profile: {
        image: '',
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
        editLink: {
            href: '#editProfile',
            dataPage: 'profileEditPage',
            name: 'Редактировать профиль',
        }
    }
}


export {
    profilePageTemplate as template,
    profilePageData as data,
}
