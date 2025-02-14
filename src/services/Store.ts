import { EventBus } from './event-bus';
import { IUserDTO } from '@/api/user/user.model';
import * as ChatDTO from '@/api/chats/chats.model';
import { EModalType } from '@/pages/ChatsPage';
import MessagesAPI from '@/api/messages/messages.api';
import { IMessage, IMessageDTO, IMessageOld } from '@/api/messages/types';
import cloneDeep from '@/utils/cloneDeep';
import { isObject, isArray } from '@/types/guards';
import { formatTime } from '@/utils/date';

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
    oldMessages: IMessageOld[];
    currentMessages: IMessage[];
    message: IMessage | null;
    messages: IMessage[];
    contentCount: number;
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
            token: null,
            modal: null,
            currentChat: null,
            currentSocket: null,
            oldMessages: [],
            currentMessages: [],
            message: null,
            messages: [],
            contentCount: 0,
        } as IStore;
    }

    clearState() {
        this._state = this._getDefaultState();
    }

    setState<T extends IStore>(nextState = {}) {
        const prevState = cloneDeep(this._state);
        this._state = { ...prevState, ...nextState } as Partial<T>;
        this.emit(EStoreEvents.Updated, prevState, nextState);
    }

    getState<T extends IStore = IStore>() {
        return cloneDeep(this._state as T);
    }

    setCurrentChat(chatId: string | null) {
        const currentChat = this.getState().chats.find((el) => String(el.id) === String(chatId)) ?? null;
        if (currentChat) {
            this.setState({ currentChat });
        } else if (chatId === null) {
            this.setState({ currentChat: null });
        }
    }

    clearCurrentChat() {
        this.setState<IStore>({
            currentChat: null,
            currentSocket: null,
            token: null,
            oldMessages: [],
            currentMessages: [],
            message: null,
            messages: [],
            contentCount: 0,
        });
    }

    addMessages(data: IMessageOld[] | IMessageDTO | unknown) {
        if (!data || (isArray(data) && data.length === 0)) {
            return;
        }

        const { authUser, contentCount = 0, currentMessages = [] } = this.getState();

        if (isArray(data)) {
            const content = contentCount < 20 ? 0 : contentCount + data.length + 1;
            const formattedMessages = (data as IMessageOld[])
                .map((msg) => ({
                    ...msg,
                    id: msg.id.toString(),
                    typeMessage: String(msg.user_id) === String(authUser?.id) ? 'me' : 'incomer',
                    time: formatTime(msg.time),
                    isMe: String(msg.user_id) === String(authUser?.id),
                }))
                .reverse() as IMessage[];

            this.setState({ oldMessages: formattedMessages, contentCount: content });
        }

        if (isObject(data) && data.type === 'message') {
            const msgDto = data as unknown as IMessageDTO;
            const message = {
                ...msgDto,
                typeMessage: data.user_id === String(authUser?.id) ? 'me' : 'incomer',
                time: formatTime(msgDto.time),
                isMe: String(data.user_id) === String(authUser?.id),
            } as IMessage;

            this.setState({ currentMessages: [...currentMessages, message], message, contentCount: contentCount + 1 });
        }

        this._setMessages();
    }

    private _setMessages() {
        const { oldMessages = [], currentMessages = [] } = this.getState();

        const prev = {
            day: 'Ранее',
            bubbles: oldMessages,
        };

        const current = {
            day: 'Сегодня',
            bubbles: currentMessages,
        };

        this.setState({ messages: [prev, current] });
    }
}
