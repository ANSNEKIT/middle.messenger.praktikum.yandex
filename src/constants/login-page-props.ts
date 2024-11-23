import AuthForm from '@/components/AuthForm';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import { onblur, onSubmit } from '@/utils/events';

const inputs = [
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'login',
        label: 'Логин',
        type: 'text',
        name: 'login',
        required: true,
    }),
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'password',
        label: 'Пароль',
        type: 'password',
        name: 'password',
        required: true,
    }),
];

const authFormLogin = new AuthForm('div', {
    attrs: {
        class: 'auth-form',
    },
    formName: 'loginForm',
    pageTitle: new PageTitle('h1', {
        settings: {
            isSimple: true,
        },
        title: 'Вход',
    }),
    items: inputs,
    button: new Button('button', {
        settings: {
            isSimple: true,
        },
        id: 'login-btn',
        type: 'submit',
        class: 'button auth-form__submit-btn',
        text: 'Войти',
        '@click': (evt: MouseEvent) => onSubmit(evt, inputs),
    }),
    link: new Link('a', {
        settings: {
            isSimple: true,
        },
        href: '/register',
        dataPage: 'registerPage',
        linkName: 'Зарегистрироваться',
    }),
    '@blur': (evt: MouseEvent) => onblur(evt, inputs),
});

export const loginPageProps = {
    attrs: {
        class: 'page page-center',
    },
    authForm: authFormLogin,
};
