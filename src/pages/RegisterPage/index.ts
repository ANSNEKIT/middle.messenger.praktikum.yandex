import Handlebars from 'handlebars';
import RegisterPage from './register.hbs?raw';

const registerPageTemplate = Handlebars.compile(RegisterPage);
const registerPageData = {
    title: 'Регистрация',
    items: [
        {
            id: 'mail',
            label: 'Почта',
            type: 'email',
            name: 'email',
            required: true,
        },
        {
            id: 'name',
            label: 'Имя',
            type: 'text',
            name: 'name',
            required: true,
        },
        {
            id: 'last-name',
            label: 'Фамилия',
            type: 'text',
            name: 'last-name',
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
            id: 'password',
            label: 'Пароль',
            type: 'password',
            name: 'password',
            required: true,
        },
        {
            id: 'password-repeat',
            label: 'Пароль еще раз',
            type: 'password',
            name: 'password-repeat',
            required: true,
        },
    ],
    submitBtn: {
        id: 'register-btn',
        name: 'Зарегистрироваться',
    },
    link: {
        href: '#login',
        dataPage: 'loginPage',
        name: 'Войти',
    },
}

export {
    registerPageTemplate as template,
    registerPageData as data,
}
