import AuthFormTemplate from '@/components/AuthForm/auth-form.hbs?raw';
import { Block } from '@/services/base-component';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import { onblur, prepareRegisterForm, prepareSubmitForm, withRouter } from '@/utils/events';
import { IProps, RequiredKeys } from '@/types';
import { ERouter } from '@/constants/router';
import * as apiServiceAuth from '@/services/apiServices/auth';
import { IUserRegistration } from '@/api/types';

import '@/components/AuthForm/auth-form.pcss';

const onRegister = async (evt: MouseEvent, inputs: Input[]) => {
    const registerForm = prepareSubmitForm(evt, inputs);
    const preparedRegisterForm = prepareRegisterForm(registerForm);

    if (preparedRegisterForm) {
        await apiServiceAuth.register(preparedRegisterForm as unknown as IUserRegistration);
    }
};

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
        name: 'password',
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

class RegisterPage extends Block {
    constructor(props = {} as RequiredKeys<IProps, 'router'>) {
        super('div', {
            ...props,
            ...{
                attrs: {
                    class: 'page page-center',
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
                    '@click': (evt: MouseEvent) => onRegister(evt, inputs),
                }),
                link: new Link('a', {
                    settings: {
                        isSimple: true,
                    },
                    href: '#',
                    linkName: 'Войти',
                    '@click': () => props.router.go(ERouter.LOGIN),
                }),
                '@blur': (evt: MouseEvent) => onblur(evt, inputs),
            },
        });
    }

    render() {
        return this.compile(AuthFormTemplate);
    }
}

export default withRouter(RegisterPage as typeof Block);
