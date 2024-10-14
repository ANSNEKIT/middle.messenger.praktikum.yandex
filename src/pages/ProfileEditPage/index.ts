import Handlebars from 'handlebars';
import ProfileEditPage from './profile-edit.hbs?raw';
import './profile-edit.pcss';

const profileEditPageTemplate = Handlebars.compile(ProfileEditPage);
const profileEditPageData = {
    title: 'Редактировать профиль',
    items: [
        {
            id: 'avatar',
            label: 'Изменить аватар',
            type: 'file',
            name: 'avatar',
            required: true,
        },
        {
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            required: true,
        },
        {
            id: 'login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            required: true,
        },
        {
            id: 'first_name',
            label: 'Имя',
            type: 'text',
            name: 'first_name',
            required: true,
        },
        {
            id: 'second_name',
            label: 'Фамилия',
            type: 'text',
            name: 'second_name',
            required: true,
        },
        {
            id: 'display',
            label: 'Имя в чате',
            type: 'text',
            name: 'display_name',
            required: true,
        },
        {
            id: 'phone',
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
            required: true,
        },
        {
            id: 'old-password',
            label: 'Старый пароль',
            type: 'password',
            name: 'oldPassword',
            required: true,
        },
        {
            id: 'new-password',
            label: 'Новый пароль',
            type: 'password',
            name: 'newPassword',
            required: true,
        },
        {
            id: 'new-password-repeat',
            label: 'Повторите новый пароль',
            type: 'password',
            name: 'newPassword',
            required: true,
        },
    ],
    submitBtn: {
        id: 'register-btn',
        name: 'Сохранить',
    },
    link: {
        href: '#profile',
        dataPage: 'profilePage',
        name: 'Отмена',
    },
}


export {
    profileEditPageTemplate as template,
    profileEditPageData as data,
}
