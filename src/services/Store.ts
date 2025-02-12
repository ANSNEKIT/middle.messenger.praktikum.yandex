import { EventBus } from './event-bus';
import { IUserDTO } from '@/api/user/user.model';
import * as ChatDTO from '@/api/chats/chats.model';
import { EModalType } from '@/pages/ChatsPage';
import MessagesAPI from '@/api/messages/messages.api';
import { IMessage, IMessageOld } from '@/api/messages/types';

export enum EStoreEvents {
    Updated = 'updated',
}

export type TModal = {
    type: EModalType;
};

export interface IStore {
    isLoading: boolean;
    authUser: IUserDTO | null;
    authError: string | null;
    chats: ChatDTO.IChatDTO[];
    currentChat: ChatDTO.IChatDTO | null;
    token: string | null;
    modal: TModal | null;
    currentSocket: MessagesAPI | null;
    messages: IMessageOld[];
    currentMessages: IMessage[];
}

export default class Store extends EventBus {
    private _state = {};
    static __instanse: Store | null = null;

    constructor(initState = {}) {
        if (Store.__instanse) {
            return Store.__instanse;
        }

        super();

        if (!initState) {
            this._state = this._getDefaultState();
        } else {
            this._state = initState;
            this.setState(initState);
        }

        Store.__instanse = this;
    }

    private _getDefaultState() {
        return {
            isLoading: false,
            authUser: null,
            authError: null,
            chats: [],
            currentChat: null,
            token: null,
            modal: null,
            currentSocket: null,
            messages: [],
            currentMessages: [],
        };
    }

    clearState() {
        this._state = this._getDefaultState();
    }

    setState<T extends IStore>(nextState = {}) {
        const prevState = JSON.stringify(this._state);

        this._state = { ...JSON.parse(prevState), ...nextState } as Partial<T>;

        this.emit(EStoreEvents.Updated, prevState, nextState);
    }

    getState<T extends IStore>() {
        return this._state as T;
    }

    setCurrentChat(chatId: string | null) {
        const currentChat = this.getState().chats.find((el) => String(el.id) === String(chatId)) ?? null;
        if (currentChat) {
            this.setState({ currentChat });
        } else if (chatId === null) {
            this.setState({ currentChat: null });
        }
    }
}
