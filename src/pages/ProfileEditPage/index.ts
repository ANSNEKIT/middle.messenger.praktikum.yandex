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
import { IProfileData } from '@/api/user/types';

import '@/components/AuthForm/auth-form.pcss';
import './profile-edit.pcss';
import { ErrorText, InputRegExp } from '@/constants/validate';

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
        rule: InputRegExp.email,
        errText: ErrorText.email,
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
        rule: InputRegExp.login,
        errText: ErrorText.login,
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
        rule: InputRegExp.first_name,
        errText: ErrorText.first_name,
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
        rule: InputRegExp.second_name,
        errText: ErrorText.second_name,
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
        rule: InputRegExp.display_name,
        errText: ErrorText.display_name,
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
        rule: InputRegExp.phone,
        errText: ErrorText.phone,
    }),
];

class ProfileEditPage extends Block {
    constructor(props = {} as RequiredKeys<IProps, 'router'>) {
        super('div', {
            ...props,
            ...{
                attrs: {
                    class: 'page page-center justify-center edit-profile',
                },
                formName: 'profileEdit',
                pageTitle: new PageTitle('h1', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'edit-profile__title',
                    title: 'Редактировать профиль',
                }),
                items: [],
                button: new Button('button', {
                    settings: {
                        isSimple: true,
                    },
                    id: 'edit-profile-btn',
                    type: 'submit',
                    class: 'button--primary auth-form__submit-btn',
                    text: 'Сохранить',
                    '@click': (evt: MouseEvent) => this.onEditProfile(evt, inputs),
                }),
                link: new Link('a', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'edit-profile__link',
                    href: '#',
                    linkName: 'Отмена',
                    '@click': () => props.router.go(ERouter.SETTINGS),
                }),
                '@blur': (evt: MouseEvent) => onblur(evt, inputs),
            },
        });

        this.setProps({ items: this.initProfileInputs() });
    }

    initProfileInputs() {
        return [
            new Input('div', {
                attrs: {
                    class: 'input',
                },
                id: 'email',
                label: 'Почта',
                type: 'email',
                name: 'email',
                required: true,
                rule: InputRegExp.email,
                errText: ErrorText.email,
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
                rule: InputRegExp.login,
                errText: ErrorText.login,
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
                rule: InputRegExp.first_name,
                errText: ErrorText.first_name,
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
                rule: InputRegExp.second_name,
                errText: ErrorText.second_name,
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
                rule: InputRegExp.display_name,
                errText: ErrorText.display_name,
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
                rule: InputRegExp.phone,
                errText: ErrorText.phone,
            }),
        ];
    }

    async onEditProfile(evt: MouseEvent, inputs: Input[]) {
        evt.preventDefault();
        const $form = document.getElementById('form') as HTMLFormElement | null;

        if (!$form) {
            return;
        }

        const editProfileForm = prepareSubmitForm($form, inputs) as unknown as IProfileData;

        if (editProfileForm) {
            await userService.editProfile(editProfileForm);
        }
    }

    render() {
        return this.compile(AuthFormTemplate);
    }
}

export default withRouter(ProfileEditPage as typeof Block);
