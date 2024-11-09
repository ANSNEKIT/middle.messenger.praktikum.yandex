import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import { onSendMessage } from "@/utils/events";


const inputMessage = new Input('div', {
    attrs: {
        class: 'input',
    },
    id: 'input-message',
    class: 'chat-main__submit-form-input',
    inputClass: 'chat-main__submit-form-input-input',
    type: 'text',
    name: 'message',
    required: true,
});

export const chatsPageProps = {
    profileLink: new Link('a', {
        settings: {
            isSimple: true,
        },
        href: '/profile',
        dataPage: 'profilePage',
        linkName: 'Профиль',
    }),
    buttonAttachFile: new Button('button', {
        settings: {
            isSimple: true,
        },
        id: 'button-link',
        class: 'button-icon',
        text: 'Прикрепить файл',
    }),
    inputSendMessage: inputMessage,
    buttonSubmit: new Button('button', {
        settings: {
            isSimple: true,
        },
        id: 'button-submit',
        class: 'button-icon',
        text: 'Отправить',
        '@click': (evt: MouseEvent) => onSendMessage(evt, inputMessage),
    }),
};
