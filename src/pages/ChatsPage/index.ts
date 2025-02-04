// import { Router } from '@/services/Router';
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
import Modal from '@/components/Modal';
import { IChatDTO } from '@/api/chats/chats.model';
import { firstCharUpper } from '@/utils';
import ContextMenu from '@/components/ContextMenu';
import { ErrorText, regExpLogin } from '@/constants/validate';

import './chats.pcss';

// type TModal = 'addUser' | 'removeUser' | 'loadMedia' | 'loadFile' | 'loadLocation';

class ChatsPage extends Block {
    constructor(props = {} as RequiredKeys<IProps, 'router'>) {
        super('div', props);

        this.initChatPageProps();
    }

    initAsideChatsProps() {
        return {
            profileLink: new Link('a', {
                settings: {
                    isSimple: true,
                },
                href: '#',
                linkName: 'Профиль',
                '@click': () => this.getProps()?.router.go(ERouter.SETTINGS),
            }),
            currentChat: 'one',
            avatarMini: new AvatarMini('div', {
                settings: {
                    isSimple: true,
                },
                class: 'tab__header-avatar',
            }),
            chats: [],
        };
    }

    initMessagesProps() {
        return {
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
            inputSendMessage: new Input('div', {
                attrs: {
                    class: 'input chat-main__submit-form-input',
                },
                id: 'input-message',
                class: 'chat-main__submit-form-input',
                inputClass: 'chat-main__submit-form-input-input',
                type: 'text',
                name: 'message',
                required: true,
            }),
            buttonSubmit: new Button('button', {
                settings: {
                    isSimple: true,
                },
                id: 'button-submit',
                class: 'button-icon',
                text: 'Отправить',
                '@click': this.onSendMessage,
            }),
        };
    }

    initAddFileContextMenuProps() {
        return {
            buttonAttachFile: new Button('button', {
                settings: {
                    isSimple: true,
                },
                id: 'button-link',
                class: 'button-icon',
                text: 'Прикрепить файл',
            }),
        };
    }

    getModalAddUserProps() {
        return {
            settings: {
                isSimple: true,
            },
            title: 'Test title',
            body: new Input('div', {
                attrs: {
                    class: 'input',
                },
                id: 'login',
                label: 'Логин',
                type: 'text',
                name: 'login',
                required: true,
                rule: regExpLogin,
                errText: ErrorText.login,
            }),
            submitBtn: new Button('button', {
                settings: {
                    isSimple: true,
                },
                id: 'button-submit',
                class: 'button-icon',
                text: 'Submit',
                '@click': () => this.onModalSend('AddUserInput'),
            }),
        };
    }

    getModalRemoveUserProps() {
        return {
            settings: {
                isSimple: true,
            },
            title: 'Test title 2222',
            body: new Input('div', {
                attrs: {
                    class: 'input',
                },
                id: 'login',
                label: 'Логин',
                type: 'text',
                name: 'login',
                required: true,
                rule: regExpLogin,
                errText: ErrorText.login,
            }),
            submitBtn: new Button('button', {
                settings: {
                    isSimple: true,
                },
                id: 'button-submit',
                class: 'button-icon',
                text: 'Submit 222',
                '@click': () => this.onModalSend('removeUserInput'),
            }),
        };
    }

    initModalProps() {
        return {
            isShowModal: true,
            modal: new Modal(this.getModalAddUserProps()),
        };
    }

    initUserContextMenuProps() {
        return {
            userContextMenu: new ContextMenu({
                settings: {
                    isSimple: true,
                },
                Activator: new Button('button', {
                    settings: {
                        isSimple: true,
                    },
                    id: 'context-menu-activator',
                    class: 'button--icon flex-center',
                    text: `<svg width="3" height="16" viewBox="0 0 3 16" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1.5" cy="2" r="1.5" />
                    <circle cx="1.5" cy="8" r="1.5" />
                    <circle cx="1.5" cy="14" r="1.5" />
                    </svg>`,
                    '@click': (evt: MouseEvent) => this.onOpenUserContextMenu(evt),
                }),
                isShowMenu: false,
                position: ['bottom', 'right'],
                menuList: [
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-activator',
                        class: 'button--tertary',
                        text: 'Добавить пользователя',
                        '@click': this.onOpenModalAddUser.bind(this),
                    }),
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-activator',
                        class: 'button--tertary',
                        text: 'Удалить пользователя',
                        '@click': this.onOpenModalRemoveUser.bind(this),
                    }),
                ],
            }),
        };
    }

    initChatPageProps() {
        const localProps = {
            attrs: {
                class: 'chats-page',
            },
            ...this.initAsideChatsProps(),
            ...this.initMessagesProps(),
            ...this.initAddFileContextMenuProps(),
            ...this.initModalProps(),
            ...this.initUserContextMenuProps(),
        };
        this.setProps(localProps);
        this.addEvents();
    }

    onModalSend(value: string) {
        // TODO доделать
        console.log('onModalSend', value);

        // const isValid = InputUserLogin?.validate();

        // if (!InputUserLogin || !isValid) {
        //     return;
        // }

        // const value = InputUserLogin.getValue();

        // console.log('onModalAddUser input', value);

        // // modalAddUser.hide();
        // // closeModal();
        // InputUserLogin.clearState();
        // // isShowModal = false;
    }

    onOpenUserContextMenu(evt: MouseEvent) {
        // evt.stopPropagation();
        const UserContextMenu = this.initUserContextMenuProps().userContextMenu as ContextMenu;
        UserContextMenu.show();
        console.log('onOpenUserContextMenu', evt);

        this.setProps({ userContextMenu: UserContextMenu });
    }

    onOpenModalAddUser() {
        const modal = this.getChildren().modal as Modal;
        modal.show();
        console.log('onOpenModalAddUser --modal', modal);
        // this.setProps({ modal: modal });
    }

    onOpenModalRemoveUser() {
        const modal = this.getChildren().modal as Modal;
        const removeUserProps = this.getModalRemoveUserProps();
        modal.show();

        // TODO без вызова этой строки модалка отображается
        // Если вызывать в текущем порядке то видно только черный экран. Внутренние компоненты модалки не отрендерились
        // Если вызвать сначала modal.setProps(removeUserProps); потом  modal.show(); то ничего не отрендерено
        modal.setProps(removeUserProps);
        console.log('onOpenModalRemoveUser --modal', modal);

        // TODO Не отображается окно без вызова и с вызовом this.setProps({ modal: modal })
        // this.setProps({ modal: modal });
    }

    onSendMessage(evt: MouseEvent) {
        // TODO доделать
        evt.preventDefault();
        const input = this.getProps().inputMessage as Input;

        console.log('onSendMessage', input);
    }

    onChatSelect = (evt: MouseEvent, _: IRouter | undefined, chatId: number) => {
        console.log('onChatSelect');

        // TODO доделать
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

    async loadChats() {
        const chats = await serviceChats.getChats();
        const propChats = {
            chats: this.adapterChatsToFront(chats),
        };
        this.setProps(propChats);
    }

    adapterChatsToFront(chats: IChatDTO[]) {
        const router = this.getProps().router;

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
                '@click': (evt: MouseEvent) => this.onChatSelect(evt, router, chat.id),
            });
        });
    }

    render() {
        return this.compile(chatsPageTemplate);
    }

    mounted() {
        setTimeout(async () => {
            await this.loadChats();
        }, 0);
    }
}

export default withRouter(ChatsPage as typeof Block);
