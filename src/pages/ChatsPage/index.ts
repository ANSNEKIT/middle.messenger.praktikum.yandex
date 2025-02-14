import chatsPageTemplate from './chats.hbs?raw';
import { Block } from '@/services/base-component';
import { IProps } from '@/types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { AsideChats, ChatFooter, ChatHeader } from '@/pages/ChatsPage/modules';
import { withRouter } from '@/utils/events';
import * as serviceChats from '@/services/apiServices/chats';
import * as serviceUser from '@/services/apiServices/user';
import Modal from '@/components/Modal';
import { EStoreEvents, IStore } from '@/services/Store';
import Messager from './modules/Messager';
import MessagesApi from '@/api/messages/messages.api';
import { IChatDTO } from '@/api/chats/chats.model';
import { useChatPage } from './composables/chat-page';
import isEqualData from '@/utils/isEqualData';
import { IMessage } from '@/api/messages/types';

import './chats.pcss';

export enum EModalType {
    createChat = 'createChat',
    addUser = 'addUser',
    removeUser = 'removeUser',
    loadMedia = 'loadMedia',
    loadFile = 'loadFile',
    loadLocation = 'loadLocation',
    attachMedia = 'attachMedia',
    attachFile = 'attachFile',
    attachLocation = 'attachLocation',
}

interface IChatPageProps extends IProps {
    asideChats: AsideChats;
    messager: Messager;
}

// eslint-disable-next-line prettier/prettier
const { initModalProps, getModalCreateChatProps, getModalAddUserProps, getModalAttachMediaFileProps, getModalRemoveUserProps } =
    useChatPage();

class ChatsPage extends Block<IChatPageProps> {
    private _socket: MessagesApi | null = null;

    constructor(props = {} as IChatPageProps) {
        super('div', {
            attrs: {
                class: 'chats-page',
            },
            ...props,
        });
    }

    init() {
        return {
            asideChats: new AsideChats({
                addChat: new Button('button', {
                    settings: {
                        isSimple: true,
                    },
                    id: 'button-create-chat',
                    class: 'button--primary aside-chats__add-chat-btn',
                    text: 'Создать чат',
                    '@click': () => this.onOpenModal(EModalType.createChat),
                }),
                chats: [],
            }),
            messager: new Messager({}),
            ...initModalProps(),
        };
    }

    async onModalSend(modalType: EModalType) {
        const modal = this.getChildren().modal as Modal<EModalType>;
        const input = this.getChildren().modal.getChildren().body as Input;
        const isValid = input?.validate();

        if (!Input || !isValid) {
            return;
        }

        const value = input.getValue();

        if (modalType === EModalType.createChat) {
            await this.controllerCreateChat(value);
        } else if (modalType === EModalType.addUser) {
            await this.controllerUserToChat(value, 'add');
        } else if (modalType === EModalType.removeUser) {
            await this.controllerUserToChat(value, 'remove');
        } else if (modalType === EModalType.attachMedia) {
            console.log('emulate fetch load photo/video file');
        }
        //TODO дописать методы для прикрепления файла и стикеров

        modal.hide();
        input.clear();
    }

    onOpenModal(type: EModalType) {
        let props;

        if (type === EModalType.createChat) {
            props = getModalCreateChatProps({
                '@click': () => this.onModalSend(EModalType.createChat),
            });
        } else if (type === EModalType.addUser) {
            props = getModalAddUserProps({
                '@click': () => this.onModalSend(EModalType.addUser),
            });
        } else if (type === EModalType.removeUser) {
            props = getModalRemoveUserProps({
                '@click': () => this.onModalSend(EModalType.attachMedia),
            });
        } else if (type === EModalType.attachMedia) {
            props = getModalAttachMediaFileProps({
                '@click': () => this.onModalSend(EModalType.attachMedia),
            });
        }

        if (!props) {
            return;
        }

        const newModal = initModalProps(props).modal;
        newModal.show();
        this.setProps({ modal: newModal });
    }

    async loadChats() {
        const chatList = await serviceChats.getChats();
        this.updateChats(chatList);
    }

    updateChats(chatList: IChatDTO[], isRerender = true) {
        const asideChats = this.getChildren().asideChats as AsideChats;
        asideChats.updateChats(chatList);
        this.setProps({ asideChats: asideChats }, isRerender);
    }

    updateMessages(messages: IMessage[], isRerender = true) {
        const messager = this.getChildren().messager as Messager;
        messager.updateChats(messages);
        this.setProps({ messager }, isRerender);
    }

    async controllerCreateChat(value: string) {
        const form = {
            title: value,
        };
        await serviceChats.addChat(form);
        await this.loadChats();
    }

    async controllerUserToChat(value: string, type: 'add' | 'remove') {
        const { currentChat = null, currentSocket } = window.store.getState();
        const users = await serviceUser.search({ login: value });

        if (!Array.isArray(users) || users.length === 0 || !currentChat) {
            return;
        }

        const chatId = currentChat.id;
        const chatUserId = users[0].id;
        const userform = {
            users: [chatUserId],
            chatId: Number(chatId),
        };
        if (type === 'add') {
            await serviceChats.addUser(userform);
        } else {
            const chatUsersForm = {
                id: Number(chatId),
            };
            const chatDeleteForm = {
                chatId: Number(chatId),
            };

            await serviceChats.deleteUser(userform);
            const chatUsers = await serviceChats.getChatUsers(chatUsersForm);

            if (chatUsers.length === 1 && currentSocket) {
                await serviceChats.deleteChat(chatDeleteForm);
                await currentSocket.disconnectFromChat();
                window.store.setState({ currentChat: null, currentSocket: null });
                await this.loadChats();
            }
        }
    }

    async chatController(currentChat: IChatDTO) {
        const { authUser } = window.store.getState();
        const token = await serviceChats.getChatToken(currentChat.id);
        const chatUsers = await serviceChats.getChatUsers({ id: currentChat.id });

        if (!token || !authUser || chatUsers.length < 2) {
            return;
        }

        this._socket = new MessagesApi();
        await this._socket.getWSSTransport(authUser.id, currentChat.id, token);
        window.store.setState({ currentSocket: this._socket });
    }

    updateCurrentChat(_: IChatDTO | null, currentChat: IChatDTO, isRerender = true) {
        const messager = this.getChildren().messager as Messager;
        const chatHeader = messager.getChildren().chatHeader as ChatHeader;
        chatHeader.updateChat(currentChat);
        messager.setProps({
            isCurrentChat: true,
            chatHeader,
            socket: this._socket,
        });
        this.setProps({ messager: messager }, isRerender);
    }

    updateSendInput(isRerender = true) {
        const messager = this.getChildren().messager as Messager;
        const chatFooter = messager.getChildren().chatFooter as ChatFooter;
        chatFooter.clearSend();

        this.setProps({ messager: messager }, isRerender);
    }

    render() {
        return this.compile(chatsPageTemplate);
    }

    mounted() {
        this.loadChats();

        window.store.on(EStoreEvents.Updated, async (oldState: IStore, nextState: IStore) => {
            const { modal = null, currentChat = null, messages = [], message = null } = nextState;

            if (modal?.type && oldState.modal?.type !== modal?.type) {
                this.onOpenModal(modal.type);
            }

            if (currentChat && oldState?.currentChat?.id !== currentChat.id) {
                await this.chatController(currentChat);
                this.updateCurrentChat(oldState?.currentChat, currentChat);
            }

            if (messages.length && !isEqualData(oldState.messages, messages)) {
                this.updateMessages(nextState.messages);
            }
            if (message && oldState?.message?.id !== message.id) {
                this.updateSendInput();
            }
        });
    }
}

export default withRouter(ChatsPage as typeof Block);
