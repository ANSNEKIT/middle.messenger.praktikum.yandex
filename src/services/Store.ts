import { EventBus } from './event-bus';
import { IUserDTO } from '@/api/user/user.model';
import * as ChatDTO from '@/api/chats/chats.model';
import { EModalType } from '@/pages/ChatsPage';

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
}

export default class Store extends EventBus {
    private _state = {};
    static __instanse: Store | null = null;

    constructor(defaultState = {}) {
        if (Store.__instanse) {
            return Store.__instanse;
        }

        super();

        this._state = defaultState;
        this.setState(defaultState);

        Store.__instanse = this;
    }

    setState<T extends IStore>(nextState = {}) {
        const prevState = structuredClone(this._state);

        this._state = { ...prevState, ...nextState } as Partial<T>;

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
