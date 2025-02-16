import { EventBus } from './event-bus';
import { IUserDTO } from '@/api/user/user.model';
import * as ChatDTO from '@/api/chats/chats.model';
import { EModalType } from '@/pages/ChatsPage';
import MessagesAPI from '@/api/messages/messages.api';
import { IMessage, IMessageDTO, IMessageOld } from '@/api/messages/types';
import cloneDeep from '@/utils/cloneDeep';
import { isObject, isArray } from '@/types/guards';
import { formatDate, formatTime, isToday, isYesterday } from '@/utils/date';
import { LOCAL } from '@/utils/store';

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
    oldMessages: IMessage[];
    message: IMessage | null;
    messages: IMessage[];
    contentCount: number;
    hasSendMessageDidabled: boolean;
}

export default class Store extends EventBus {
    private _state = {};
    static __instanse: Store | null = null;

    constructor(initState?: Partial<IStore>) {
        if (Store.__instanse) {
            return Store.__instanse;
        }

        super();

        if (!initState) {
            const LS_Store = LOCAL.getItem('store');
            if (LS_Store) {
                this.setState(LS_Store);
            } else {
                this.setState(this._getDefaultState());
            }
        } else {
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
            message: null,
            messages: [],
            contentCount: 0,
            hasSendMessageDidabled: true,
        } as IStore;
    }

    clearState() {
        const prevState = cloneDeep(this._state);
        this._state = this._getDefaultState();
        LOCAL.removeItem('store');
        this.emit(EStoreEvents.Updated, prevState, this._state);
    }

    setState<T extends IStore>(nextState = {}) {
        const prevState = cloneDeep(this._state);
        this._state = { ...prevState, ...nextState } as Partial<T>;
        LOCAL.setItem('store', this._state);
        this.emit(EStoreEvents.Updated, prevState, nextState);
    }

    getState<T extends IStore = IStore>() {
        return this._state as T;
    }

    setCurrentChat(chatId: string | null) {
        const currentChat = this.getState().chats.find((el) => String(el.id) === String(chatId)) ?? null;
        if (currentChat) {
            const newCurrentChat = cloneDeep(currentChat);
            const currentSocket = this.getState().currentSocket;
            if (currentSocket?.connectToChat) {
                currentSocket?.disconnectFromChat();
            }
            this.setState({ currentChat: newCurrentChat });
        } else if (chatId === null) {
            this.clearCurrentChat();
        }
    }

    clearCurrentChat() {
        this.setState({
            currentChat: null,
            currentSocket: null,
            token: null,
            oldMessages: [],
            message: null,
            messages: [],
            contentCount: 0,
        });
    }

    addMessages(data: IMessageOld[] | IMessageDTO | unknown) {
        const { authUser, contentCount = 0 } = this.getState();

        if (isArray(data)) {
            const content = contentCount < 20 ? 0 : contentCount + data.length + 1;
            const formattedMessages = (data as IMessageOld[])
                .map((msg) => ({
                    ...msg,
                    id: msg.id.toString(),
                    typeMessage: String(msg.user_id) === String(authUser?.id) ? 'me' : 'incomer',
                    localTime: formatTime(msg.time),
                    date: formatDate(msg.time),
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
                localTime: formatTime(msgDto.time),
                date: formatDate(msgDto.time),
                isMe: String(msgDto.user_id) === String(authUser?.id),
            } as IMessage;

            this.setState({ message, contentCount: contentCount + 1 });
        }

        this._setMessages();
    }

    private _setMessages() {
        const { oldMessages = [], message } = this.getState();

        const dateMap = new Map();
        oldMessages.forEach((msg, i) => {
            dateMap.set(msg.date, i);
        });

        const obj = Object.fromEntries(dateMap.entries());
        const days = Object.keys(obj).map((day) => {
            let localDay = day;
            const bubblesForDay = oldMessages.filter((msg) => msg.date === day);
            const isFormatedDate = true;

            if (isToday(day, isFormatedDate)) {
                localDay = 'Сегодня';
                if (message && bubblesForDay[0]?.id !== message.id) {
                    bubblesForDay.push(message);
                }
            } else if (isYesterday(day, isFormatedDate)) {
                localDay = 'Вчера';
            }

            return {
                day: localDay,
                bubbles: bubblesForDay,
            };
        });

        this.setState({ messages: days });
    }
}
