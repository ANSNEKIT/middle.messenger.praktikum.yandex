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
import { ERouter } from '@/constants/router';
import { IRouter } from '@/types/router';

import './chats.pcss';
import { IChatDTO } from '@/api/chats/chats.model';
import { firstCharUpper } from '@/utils';

export const onSendMessage = (evt: MouseEvent, input: Input) => {
    evt.preventDefault();

    console.log('onSendMessage', input);
};

const onChatSelect = (evt: MouseEvent, _: IRouter | undefined, chatId: number) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement | null;
    const chat = target?.closest('.chat');

    const $chatList = document.querySelector('.aside__chats');
    if ($chatList?.children) {
        for (const $chat of $chatList.children) {
            const id = $chat.getAttribute('id') || '';
            if (id !== String(chatId)) {
                $chat.classList.remove('select');
            }
        }
    }

    if (chat) {
        chat.classList.add('select');
    }

    // if (!router) {
    //     return;
    // }
    // router.go(`${ERouter.MESSENGER}/${chatId}`, true);
};

const adapterChatsToFront = (chats: IChatDTO[], router?: IRouter) => {
    return chats.map((chat) => {
        return new Chat('li', {
            attrs: {
                id: chat.id,
                class: 'chat',
            },
            avatarMini: new AvatarMini('div', {
                class: 'chat__avatar',
                settings: {
                    isSimple: true,
                },
                avatarSrc: chat.avatar,
                userNameChar: firstCharUpper(chat.last_message?.user.first_name || chat.title),
            }),
            link: `${ERouter.MESSENGER}/${chat.id}`,
            chat,
            '@click': (evt: MouseEvent) => onChatSelect(evt, router, chat.id),
        });
    });
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
                chats: [],
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
            const propChats = {
                chats: adapterChatsToFront(chats, this.getProps().router),
            };
            this.setProps(propChats);
        }, 0);
    }
}

export default withRouter(ChatsPage as typeof Block);
