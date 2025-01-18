import chatsPageTemplate from './chats.hbs?raw';
import { Block } from '@/services/base-component';
import { IProps, RequiredKeys } from '@/types';
import AvatarMini from '@/components/AvatarMini';
import Bubble from '@/components/Bubble';
import Button from '@/components/Button';
import Chat from '@/components/Chat';
import Input from '@/components/Input';
import Link from '@/components/Link';
import { withRouter } from '@/utils/events';
import * as serviceChats from '@/services/apiServices/chats';

import './chats.pcss';
import { ERouter } from '@/constants/router';

export const onSendMessage = (evt: MouseEvent, input: Input) => {
    evt.preventDefault();

    console.log('onSendMessage', input);
};

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

class ChatsPage extends Block {
    constructor(props = {} as RequiredKeys<IProps, 'router'>) {
        super('div', {
            ...props,
            ...{
                attrs: {
                    class: 'chats-page',
                },
                profileLink: new Link('a', {
                    settings: {
                        isSimple: true,
                    },
                    href: '#',
                    linkName: 'Профиль',
                    '@click': () => props.router.go(ERouter.SETTINGS),
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
            },
        });
    }
    render() {
        return this.compile(chatsPageTemplate);
    }

    mounted() {
        setTimeout(async () => {
            const chats = await serviceChats.getChats();
            console.log('chats', chats);
        }, 0);
    }
}

export default withRouter(ChatsPage as typeof Block);
