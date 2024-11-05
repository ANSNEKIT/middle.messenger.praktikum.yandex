import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";

export const chatsPageProps = {
    profileLink: new Link('a', {
        href: '/profile',
        dataPage: 'profilePage',
        linkName: 'Профиль',
    }),
    buttonAttachFile: new Button('button', {
        id: 'button-link',
        class: 'button-icon',
        text: 'Прикрепить файл',
    }),
    inputSendMessage: new Input('input', {
        id: 'input-message',
        class: 'chat-main__submit-form-input',
        inputClass: 'chat-main__submit-form-input-input',
        type: 'text',
        name: 'message',
        required: true,
    }),
    buttonSubmit: new Button('button', {
        id: 'button-submit',
        class: 'button-icon',
        text: 'Отправить',
    }),
};
