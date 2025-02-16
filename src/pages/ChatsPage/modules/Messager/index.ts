import { ChatHeader, ChatFooter } from '@/pages/ChatsPage/modules';
import { Block } from '@/services/base-component';
import {
    // Indexed,
    IProps,
} from '@/types';
import messagerTemplate from './messager.hbs?raw';
import { IconAttach, IconBlueArrowRight, IconDots } from '@/assets/icons';
import { EModalType } from '../..';
import Button from '@/components/Button';
import Bubble from '@/components/Bubble';
import ContextMenu from '@/components/ContextMenu';

import './messager.pcss';
import MessagesAPI from '@/api/messages/messages.api';
// import { WSTransportEvents } from '@/services/wsTransport';
import { IMessage } from '@/api/messages/types';

export interface IMessagerProps extends IProps {
    isCurrentChat: boolean;
    messages: Array<{
        groupName: string;
        bubbles: Bubble[];
    }>;
    chatHeader: ChatHeader;
    chatFooter: ChatFooter;
    socket: MessagesAPI | null;
}

export default class Messager extends Block {
    private _socket: MessagesAPI | null = null;

    constructor(props = {}) {
        super('section', {
            settings: {
                isSimple: true,
            },
            ...props,
        });
    }

    init() {
        const currentChat = window.store.getState()?.currentChat ?? null;
        return {
            isCurrentChat: !!currentChat,
            chatHeader: new ChatHeader({
                ...this.initUserContextMenu(),
                currentChat,
            }),
            chatFooter: new ChatFooter({
                ...this.initAttachContextMenu(),
                buttonSubmit: new Button('button', {
                    settings: {
                        isSimple: true,
                    },
                    type: 'button',
                    id: 'button-send-message',
                    class: 'button--icon button-send-message disabled',
                    text: IconBlueArrowRight,
                    disabled: true,
                    '@click': (evt: Event) => this.onSendMessage(evt),
                }),
                '@submit': (evt: Event) => this.onSendMessage(evt),
            }),
        };
    }

    initAttachContextMenu() {
        return {
            attachContextMenu: new ContextMenu({
                settings: {
                    isSimple: true,
                },
                Activator: new Button('button', {
                    settings: {
                        isSimple: true,
                    },
                    id: 'attach-context-menu-activator',
                    class: 'button--icon',
                    text: IconAttach,
                    '@click': () => this.onOpenAttachContextMenu(),
                }),
                isShowMenu: false,
                position: ['top', 'left'],
                menuList: [
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-video',
                        class: 'button--tertary flex',
                        text: 'Фото/Видео',
                        '@click': (evt: MouseEvent) => this.onOpenModal(evt, EModalType.attachMedia),
                    }),
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-file',
                        class: 'button--tertary',
                        text: 'Файл',
                        '@click': (evt: MouseEvent) => this.onOpenModal(evt, EModalType.attachFile),
                    }),
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-location',
                        class: 'button--tertary',
                        text: 'Локация',
                        '@click': (evt: MouseEvent) => this.onOpenModal(evt, EModalType.attachLocation),
                    }),
                ],
            }),
        };
    }

    initUserContextMenu() {
        return {
            userContextMenu: new ContextMenu({
                settings: {
                    isSimple: true,
                },
                Activator: new Button('button', {
                    settings: {
                        isSimple: true,
                    },
                    id: 'user-context-menu-activator',
                    class: 'button--icon',
                    text: IconDots,
                    '@click': () => this.onOpenUserContextMenu(),
                }),
                isShowMenu: false,
                position: ['bottom', 'right'],
                menuList: [
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-add-user',
                        class: 'button--tertary',
                        text: 'Добавить пользователя',
                        '@click': (evt: MouseEvent) => this.onOpenModal(evt, EModalType.addUser),
                    }),
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-remove-user',
                        class: 'button--tertary',
                        text: 'Удалить пользователя',
                        '@click': (evt: MouseEvent) => this.onOpenModal(evt, EModalType.removeUser),
                    }),
                    new Button('button', {
                        settings: {
                            isSimple: true,
                        },
                        id: 'context-menu-remove-user',
                        class: 'button--tertary',
                        text: 'Удалить чат',
                        '@click': (evt: MouseEvent) => this.onOpenModal(evt, EModalType.removeChat),
                    }),
                ],
            }),
        };
    }

    onOpenUserContextMenu() {
        const chatHeader = this.getChildren().chatHeader as ChatHeader;
        const userContextMenu = chatHeader.getChildren().userContextMenu as ContextMenu;
        userContextMenu.show();

        this.setProps({ chatHeader: chatHeader });
    }

    onOpenAttachContextMenu() {
        const chatFooter = this.getChildren().chatFooter as ChatFooter;
        const attachContextMenu = chatFooter.getChildren().attachContextMenu as ContextMenu;
        attachContextMenu.show();

        this.setProps({ chatFooter: chatFooter });
    }

    onOpenModal(evt: MouseEvent, type: EModalType) {
        evt.stopPropagation();
        const modal = {
            type,
        };
        window.store.setState({ modal });
    }

    onSendMessage(evt: Event) {
        evt.preventDefault();
        const chatFooter = this.getChildren().chatFooter as ChatFooter;
        const value = chatFooter.getSendValue();

        if (!this._socket) {
            return;
        }

        this._socket.sendMessage(value);
    }

    updateMessages(messages: IMessage[], isRerender = true) {
        console.log(' *********** Messanger updateMessages **********', messages);

        this.setProps({ messages: messages }, isRerender);
    }

    // async updateSocket(newProps: IMessagerProps) {
    //     console.log(' ********* messenger updateSocket newProps', newProps);

    //     if (this._socket?.wssTransport) {
    //         console.log(' ************* update socket STOP ****************');
    //         await this._socket?.disconnectFromChat();
    //         this._socket = null;
    //         return;
    //     }

    //     if (newProps.isCurrentChat && newProps?.socket?.wssTransport) {
    //         this._socket = newProps?.socket;
    //         const wssTransport = this._socket.wssTransport!;

    //         console.log('****** ================ upd Messanger 2222222 new socket ============== ********');
    //         wssTransport.on(WSTransportEvents.Message, (data: Indexed[]) => {
    //             console.log('****** ================ upd Messanger 33333 new message ============== ********');

    //             window.store.addMessages(data);
    //         });

    //         this._socket.connectToChat().then(
    //             () => {
    //                 if (this._socket) {
    //                     this._socket.getMessages();
    //                 }
    //             },
    //             () => {
    //                 console.log(' ============================= socket error ================');
    //             },
    //         );
    //     }
    // }

    hasUpdated(_: IMessagerProps, newProps: IMessagerProps): boolean {
        console.log('$$$$$$$$$$$$ Messager hasUpdated newProos ************', newProps);

        // this.updateSocket(newProps);
        if (newProps.messages) {
            console.log('$$$$$$$$$$$$ Messager hasUpdated newProos messages ************', newProps);
            return true;
        }

        return true;
    }

    render() {
        return this.compile(messagerTemplate);
    }
}
