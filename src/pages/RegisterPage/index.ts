import Handlebars from 'handlebars';
import RegisterPage from './register.hbs?raw';

const registerPageTemplate = Handlebars.compile(RegisterPage);
const registerPageData = {
    title: 'Регистрация',
    items: [
        {
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
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
            id: 'phone',
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
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
            name: 'password',
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
