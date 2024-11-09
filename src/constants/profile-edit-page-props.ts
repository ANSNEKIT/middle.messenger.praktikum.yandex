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
        id: 'avatar',
        label: 'Изменить аватар',
        type: 'file',
        name: 'avatar',
        required: true,
    }), 
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
        id: 'display',
        label: 'Имя в чате',
        type: 'text',
        name: 'display_name',
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
        id: 'old-password',
        label: 'Старый пароль',
        type: 'password',
        name: 'oldPassword',
        required: true,
    }), 
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'new-password',
        label: 'Новый пароль',
        type: 'password',
        name: 'newPassword',
        required: true,
    }), 
    new Input('div', {
        attrs: {
            class: 'input',
        },
        id: 'new-password-repeat',
        label: 'Повторите новый пароль',
        type: 'password',
        name: 'newPassword',
        required: true,
    }), 
];

const authFormProfileEdit = new AuthForm('div', {
    attrs: {
        class: 'auth-form',
    },
    formName: 'profileEdit',
    pageTitle: new PageTitle('h1', {
        title: 'Редактировать профиль',
    }),
    items: inputs,
    button: new Button('button', {
        settings: {
            isSimple: true,
        },
        id: 'edit-profile-btn',
        type: 'submit',
        class: 'button auth-form__submit-btn',
        text: 'Сохранить',
        '@click': (evt: MouseEvent) => onSubmit(evt, inputs),
    }),
    link: new Link('a', {
        settings: {
            isSimple: true,
        },
        href: '/profile',
        dataPage: 'profilePage',
        linkName: 'Отмена',
    }),
    '@blur': (evt: MouseEvent) => onblur(evt, inputs),
});

export const profileEditPageProps = {
    attrs: {
        class: 'page page-center',
    },
    authForm: authFormProfileEdit,
};
