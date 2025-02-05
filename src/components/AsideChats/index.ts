import { Block } from '@/services/base-component';
import asideChatsTemplate from './aside-chat.hbs?raw';
import Link from '../Link';
import AvatarMini from '../AvatarMini';
import Chat from '../Chat';
import { IProps } from '@/types';

import './aside-chat.pcss';

export interface IAsideChatsProps extends IProps {
    currentChatId?: string;
    profileLink: Link;
    avatarMini: AvatarMini;
    chats: Chat[];
}

export default class AsideChats extends Block<IAsideChatsProps> {
    public asideChatList: Chat[] = [];

    constructor(props: IAsideChatsProps) {
        super('div', {
            settings: {
                isSimple: true,
            },
            currentChatId: '-1',
            ...props,
            '@click': (evt: MouseEvent) => this.onSelectChat(evt),
        });

        this.asideChatList = props.chats;
    }

    selectChat(chat: HTMLElement, currentChatId: string) {
        const $chatList = document.querySelector('.aside__chats');
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

    onSelectChat(evt: MouseEvent) {
        // const router = this.getProps().router;
        evt.preventDefault();
        const target = evt.target as HTMLElement | null;
        const chat = target?.closest('.aside-chats__chat') as HTMLElement | null;

        if (!chat) {
            return;
        }

        const chatId = chat.getAttribute('id') || '';
        this.selectChat(chat, chatId);
        this.setProps({ currentChatId: chatId });

        // if (!router) {
        //     return;
        // }
        // router.go(`${ERouter.MESSENGER}/${chatId}`, true);
    }

    hasUpdated(oldProps: IAsideChatsProps, newProps: IAsideChatsProps) {
        if (oldProps['currentChatId'] !== newProps['currentChatId']) {
            return false;
        }
        return true;
    }

    render() {
        return this.compile(asideChatsTemplate);
    }
}
