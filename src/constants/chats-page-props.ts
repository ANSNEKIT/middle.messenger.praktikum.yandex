import AvatarMini from '@/components/AvatarMini';
import Bubble from '@/components/Bubble';
import Button from '@/components/Button';
import Chat from '@/components/Chat';
import Input from '@/components/Input';
import Link from '@/components/Link';
import { onSendMessage } from '@/utils/events';

const inputMessage = new Input('div', {
    attrs: {
        class: 'input chat-main__submit-form-input',
    },
    id: 'input-message',
    class: 'chat-main__submit-form-input',
    inputClass: 'chat-main__submit-form-input-input',
    type: 'text',
    name: 'message',
    required: true,
});

export const chatsPageProps = {
    attrs: {
        class: 'chats-page',
    },
    profileLink: new Link('a', {
        settings: {
            isSimple: true,
        },
        href: '/profile',
        dataPage: 'profilePage',
        linkName: 'Профиль',
    }),
    currentChat: 'one',
    avatarMini: new AvatarMini('div', {
        settings: {
            isSimple: true,
        },
        class: 'tab__header-avatar',
    }),
    headerMenuBtn: new Button('button', {
        settings: {
            isSimple: true,
        },
        id: 'header-button-menu',
        class: 'tab__header-menu-btn button-icon flex-center',
        text: '...',
    }),
    chats: [
        new Chat('li', {
            attrs: {
                class: 'chat',
            },
            avatarMini: new AvatarMini('div', {
                class: 'chat__avatar',
                settings: {
                    isSimple: true,
                },
            }),
        }),
        new Chat('li', {
            attrs: {
                class: 'chat',
            },
            avatarMini: new AvatarMini('div', {
                class: 'chat__avatar',
                settings: {
                    isSimple: true,
                },
            }),
        }),
        new Chat('li', {
            attrs: {
                class: 'chat',
            },
            avatarMini: new AvatarMini('div', {
                class: 'chat__avatar',
                settings: {
                    isSimple: true,
                },
            }),
        }),
    ],
    messages: [
        {
            groupName: 'One',
            bubbles: [
                new Bubble('div', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'test',
                    text: 'asdf 111',
                }),
                new Bubble('div', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'test',
                    text: 'asdf 111',
                }),
            ],
        },
        {
            groupName: 'Two',
            bubbles: [
                new Bubble('div', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'test',
                    text: 'asdf 3333',
                }),
                new Bubble('div', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'test',
                    text: 'asdf 4444',
                }),
            ],
        },
    ],
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
