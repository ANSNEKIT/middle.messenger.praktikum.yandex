import AuthForm from "@/components/AuthForm";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";

function onLogin() {
    console.log('click onLogin');
}

const authFormLogin = new AuthForm('div', {
    attrs: {
        class: 'auth-form',
    },
    pageTitle: new PageTitle('h1', {
        title: 'Вход',
    }),
    items: [
        new Input('div', {
            id: 'login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            required: true,
        }),
        new Input('div', {
            id: 'password',
            label: 'Пароль',
            type: 'password',
            name: 'password',
            required: true,
        }),
    ],
    button: new Button('button', {
        id: 'login-btn',
        class: 'button auth-form__submit-btn',
        text: 'Войти',
        '@click': onLogin,
    }),
    link: new Link('a', {
        href: '/register',
        dataPage: 'registerPage',
        linkName: 'Зарегистрироваться',
    }),
});

export const loginPageProps = {
    attrs: {
        class: 'page page-center',
    },
    authForm: authFormLogin,
};
