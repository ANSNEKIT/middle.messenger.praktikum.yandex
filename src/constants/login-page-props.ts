import AuthForm from "@/components/AuthForm";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import { LoginFormInputs } from "@/types";
import { validate, validateInput, validateWithMessage } from "@/utils";
import { ErrorText, regExpLogin, regExpPassword } from "./validate";


const onSubmit = (evt: MouseEvent) => {
    evt.preventDefault();

    const target = evt.target as HTMLElement;
    const $loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
    if ($loginForm) {
        const formD = new FormData($loginForm, target);
        const formEntries = Object.fromEntries(formD) as Record<LoginFormInputs, string | File>;
        console.log(formEntries);

        const loginRules = {
            login: validateWithMessage(formEntries.login, regExpLogin, ErrorText.login),
            password: validateWithMessage(formEntries.password, regExpPassword, ErrorText.password),
        };

        const isValid = validate(loginRules);

        if (isValid) {
            console.log('isValid', formEntries);
        }
    }
};

const onblur = (evt: MouseEvent) => {
    if ((evt.target as HTMLElement).tagName === 'INPUT') {
        const target = evt.target as HTMLInputElement;

        console.log('onBlur', target);
        const inpName = target.name as keyof typeof LoginFormInputs;
        const inpValue = target.value;

        console.log('onBlur inpName', inpName);
        console.log('onBlur inpValue', inpValue);
        
        const validInp = validateInput(inpName, inpValue);

        console.log('onBlur ====validInp===', validInp);
        
    }
};

const authFormLogin = new AuthForm('div', {
    attrs: {
        class: 'auth-form',
        name: 'loginForm',
    },
    formId: 'loginForm',
    formName: 'loginForm',
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
        type: 'submit',
        class: 'button auth-form__submit-btn',
        text: 'Войти',
        '@click': onSubmit,
    }),
    link: new Link('a', {
        href: '/register',
        dataPage: 'registerPage',
        linkName: 'Зарегистрироваться',
    }),
    '@blur': onblur,
});

export const loginPageProps = {
    attrs: {
        class: 'page page-center',
    },
    authForm: authFormLogin,
};
