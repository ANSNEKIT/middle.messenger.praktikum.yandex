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
        id: 'email',
        label: 'Почта',
        type: 'email',
        name: 'email',
        required: true,
    }),
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'first_name',
        label: 'Имя',
        type: 'text',
        name: 'first_name',
        required: true,
    }),
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'second_name',
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
        required: true,
    }),
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'phone',
        label: 'Телефон',
        type: 'tel',
        name: 'phone',
        required: true,
    }),
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
        name: 'oldPassword',
        required: true,
    }),
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'password-repeat',
        label: 'Пароль еще раз',
        type: 'password',
        name: 'newPassword',
        required: true,
    }),
];

const authFormRegister = new AuthForm('div', {
    attrs: {
        class: 'auth-form',
    },
    formName: 'registerForm',
    pageTitle: new PageTitle('h1', {
        settings: {
            isSimple: true,
        },
        title: 'Регистрация',
    }),
    items: inputs,
    button: new Button('button', {
        settings: {
            isSimple: true,
        },
        id: 'register-btn',
        type: 'submit',
        class: 'button auth-form__submit-btn',
        text: 'Зарегистрироваться',
        '@click': (evt: MouseEvent) => onSubmit(evt, inputs),
    }),
    link: new Link('a', {
        settings: {
            isSimple: true,
        },
        href: '/login',
        dataPage: 'loginPage',
        linkName: 'Войти',
    }),
    '@blur': (evt: MouseEvent) => onblur(evt, inputs),
});

export const registerPageProps = {
    attrs: {
        class: 'page page-center',
    },
    authForm: authFormRegister,
};
