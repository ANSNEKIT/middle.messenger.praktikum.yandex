import Handlebars from 'handlebars';
import LoginPage from './login.hbs?raw';

const loginPageTemplate = Handlebars.compile(LoginPage);
const loginPageData = {
    title: 'Вход',
    items: [
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
    ],
    submitBtn: {
        id: 'login-btn',
        name: 'Войти',
    },
    link: {
        href: '#register',
        dataPage: 'registerPage',
        name: 'Зарегистрироваться',
    },
}

export {
    loginPageTemplate as template,
    loginPageData as data,
}
