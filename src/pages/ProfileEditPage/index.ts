import { Block } from '@/services/base-component';
import { IProps, RequiredKeys } from '@/types';
import AuthFormTemplate from '@/components/AuthForm/auth-form.hbs?raw';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import { onblur, prepareSubmitForm, withRouter } from '@/utils/events';
import { ERouter } from '@/constants/router';
import * as userService from '@/services/apiServices/user';
import { IProfileData } from '@/api/types';

import '@/components/AuthForm/auth-form.pcss';
import './profile-edit.pcss';

const onEditProfile = async (evt: MouseEvent, inputs: Input[]) => {
    evt.preventDefault();
    const $form = document.getElementById('form') as HTMLFormElement | null;

    if (!$form) {
        return;
    }

    const editProfileForm = prepareSubmitForm($form, inputs) as unknown as IProfileData;

    if (editProfileForm) {
        await userService.editProfile(editProfileForm);
    }
};

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

class ProfileEditPage extends Block {
    constructor(props = {} as RequiredKeys<IProps, 'router'>) {
        super('div', {
            ...props,
            ...{
                attrs: {
                    class: 'page page-center justify-center',
                },
                formName: 'profileEdit',
                pageTitle: new PageTitle('h1', {
                    settings: {
                        isSimple: true,
                    },
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
                    '@click': (evt: MouseEvent) => onEditProfile(evt, inputs),
                }),
                link: new Link('a', {
                    settings: {
                        isSimple: true,
                    },
                    href: '#',
                    linkName: 'Отмена',
                    '@click': () => props.router.go(ERouter.SETTINGS),
                }),
                '@blur': (evt: MouseEvent) => onblur(evt, inputs),
            },
        });
    }
    render() {
        return this.compile(AuthFormTemplate);
    }
}

export default withRouter(ProfileEditPage as typeof Block);
