import AuthForm from '@/components/AuthForm';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';

function onEditProfile() {
    console.log('click onEditProfile');
}

const authFormProfileEdit = new AuthForm('div', {
    attrs: {
        class: 'auth-form',
    },
    pageTitle: new PageTitle('h1', {
        title: 'Редактировать профиль',
    }),
    items: [
        new Input('input', {
            id: 'avatar',
            label: 'Изменить аватар',
            type: 'file',
            name: 'avatar',
            required: true,
        }), 
        new Input('input', {
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
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
            id: 'display',
            label: 'Имя в чате',
            type: 'text',
            name: 'display_name',
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
            id: 'old-password',
            label: 'Старый пароль',
            type: 'password',
            name: 'oldPassword',
            required: true,
        }), 
        new Input('input', {
            id: 'new-password',
            label: 'Новый пароль',
            type: 'password',
            name: 'newPassword',
            required: true,
        }), 
        new Input('input', {
            id: 'new-password-repeat',
            label: 'Повторите новый пароль',
            type: 'password',
            name: 'newPassword',
            required: true,
        }), 
    ],
    button: new Button('button', {
        id: 'edit-profile-btn',
        class: 'button auth-form__submit-btn',
        text: 'Сохранить',
        '@click': onEditProfile,
    }),
    link: new Link('a', {
        href: '/profile',
        dataPage: 'profilePage',
        linkName: 'Отмена',
    }),
});

export const profileEditPageProps = {
    attrs: {
        class: 'page page-center',
    },
    authForm: authFormProfileEdit,
};
