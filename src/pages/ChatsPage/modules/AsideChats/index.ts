import { Block } from '@/services/base-component';
import asideChatsTemplate from './aside-chat.hbs?raw';
import { IProps } from '@/types';
import { Chat } from '@/pages/ChatsPage/modules';
import Button from '@/components/Button';
import Link from '@/components/Link';
import AvatarMini from '@/components/AvatarMini';
import { ERouter } from '@/constants/router';
import { EStoreEvents, IStore } from '@/services/Store';
import { IChatDTO } from '@/api/chats/chats.model';
import { firstCharUpper } from '@/utils';

import './aside-chat.pcss';

interface IAsideChatsProps extends IAsideChatsPropsExternal {
    addChat: Button;
    profileLink: Link;
    avatarMini: AvatarMini;
}

export interface IAsideChatsPropsExternal extends IProps {
    addChat: Button;
}

export default class AsideChats extends Block<IAsideChatsProps> {
    constructor(props: IAsideChatsPropsExternal) {
        super('div', {
            settings: {
                isSimple: true,
            },
            profileLink: new Link('a', {
                settings: {
                    isSimple: true,
                },
                href: '#',
                linkName: 'Профиль',
                '@click': () => window.router?.go(ERouter.SETTINGS),
            }),
            avatarMini: new AvatarMini('div', {
                settings: {
                    isSimple: true,
                },
                class: 'aside-chats__header-avatar',
            }),
            currentChatId: '-1',
            chats: [],
            ...props,
            '@click': (evt: MouseEvent) => this.onChatSelect(evt),
        });
    }

    private _selectChat(chat: HTMLElement, currentChatId: string) {
        const $chatList = document.querySelector('.aside-chats__list');

        if ($chatList?.children) {
            for (const $chat of $chatList.children) {
                const id = $chat.getAttribute('id') || '';
                if (id !== String(currentChatId)) {
                    $chat.classList.remove('select');
                }
            }
        }

        if (chat) {
            chat.classList.add('select');
        }
    }

    onChatSelect(evt: MouseEvent) {
        evt.preventDefault();
        const target = evt.target as HTMLElement | null;
        const chat = target?.closest('.aside-chats__chat') as HTMLElement | null;

        if (!chat) {
            return;
        }

        const chatId = chat.getAttribute('id') || '';
        this._selectChat(chat, chatId);
        this.setProps({ currentChatId: chatId });
        window.store.setCurrentChat(chatId);

        // router.go(`${ERouter.MESSENGER}/${chatId}`, true);
    }

    initChatsProps(chat: IChatDTO) {
        return {
            attrs: {
                id: chat.id,
                class: 'aside-chats__chat chat',
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
        };
    }

    adapterChatsPropsToChatsComponent(chats: IChatDTO[]): Chat[] {
        return chats.map((chat) => {
            const props = this.initChatsProps(chat);
            return new Chat(props);
        });
    }

    hasUpdated(oldProps: IAsideChatsProps, newProps: IAsideChatsProps) {
        if (oldProps['currentChatId'] !== newProps['currentChatId']) {
            return false;
        }

        return true;
    }

    mounted() {
        window.store.on(EStoreEvents.Updated, (_: IStore, nextState: IStore) => {
            const { chats } = nextState;

            if (Array.isArray(chats) && chats.length > 0) {
                const ChatComponents = this.adapterChatsPropsToChatsComponent(chats);
                this.setProps({ chats: ChatComponents });
            }
        });
    }

    render() {
        this.mounted();

        return this.compile(asideChatsTemplate);
    }
}
