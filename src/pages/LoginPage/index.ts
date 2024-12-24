import { Block } from '@/services/base-component';
import AuthFormTemplate from '@/components/AuthForm/auth-form.hbs?raw';
import Input from '@/components/Input';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import { onblur, prepareSubmitForm, withRouter } from '@/utils/events';
import Link from '@/components/Link';
import { ERouter } from '@/constants/router';
import { IProps, RequiredKeys } from '@/types';
import { IUserLogin } from '@/api/types';
import * as apiServiceAuth from '@/services/apiServices/auth';

import '@/components/AuthForm/auth-form.pcss';

const onLogin = async (evt: MouseEvent, inputs: Input[]) => {
    const loginForm = prepareSubmitForm(evt, inputs);

    if (loginForm) {
        await apiServiceAuth.login(loginForm as unknown as IUserLogin);
    }
};

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

class LoginPage extends Block {
    constructor(props = {} as RequiredKeys<IProps, 'router'>) {
        super('div', {
            ...props,
            ...{
                attrs: {
                    class: 'page page-center',
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
                    '@click': (evt: MouseEvent) => onLogin(evt, inputs),
                }),
                link: new Link('a', {
                    settings: {
                        isSimple: true,
                    },
                    href: '#',
                    linkName: 'Зарегистрироваться',
                    '@click': () => props.router.go(ERouter.REGISTRATION),
                }),
                '@blur': (evt: MouseEvent) => onblur(evt, inputs),
            },
        });
    }

    render() {
        return this.compile(AuthFormTemplate);
    }
}

export default withRouter(LoginPage as typeof Block);
