import AuthForm from '@/components/AuthForm';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';


function onRegister() {
    console.log('click onRegister');
}

const authFormRegister = new AuthForm('div', {
    attrs: {
        class: 'auth-form',
    },
    pageTitle: new PageTitle('h1', {
        title: 'Регистрация',
    }),
    items: [
        new Input('input', {
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            required: true,
        }),
        new Input('input', {
            id: 'first_name',
            label: 'Имя',
            type: 'text',
            name: 'first_name',
            required: true,
        }),
        new Input('input', {
            id: 'second_name',
            label: 'Фамилия',
            type: 'text',
            name: 'second_name',
            required: true,
        }),
        new Input('input', {
            id: 'phone',
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
            required: true,
        }),
        new Input('input', {
            id: 'login',
            label: 'Логин',
            type: 'text',
            name: 'login',
            required: true,
        }),
        new Input('input', {
            id: 'password',
            label: 'Пароль',
            type: 'password',
            name: 'password',
            required: true,
        }),
        new Input('input', {
            id: 'password-repeat',
            label: 'Пароль еще раз',
            type: 'password',
            name: 'password',
            required: true,
        }),
    ],
    button: new Button('button', {
        id: 'register-btn',
        class: 'button auth-form__submit-btn',
        text: 'Зарегистрироваться',
        '@click': onRegister,
    }),
    link: new Link('a', {
        href: '/login',
        dataPage: 'loginPage',
        linkName: 'Войти',
    }),
});

export const registerPageProps = {
    attrs: {
        class: 'page page-center',
    },
    authForm: authFormRegister,
};
