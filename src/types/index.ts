import { BaseComponent } from "@/services/base-component";


export enum Events {
    CLICK = 'click',
}

export type EventKeys = keyof Events;

export type EventHandler<K extends EventKeys> = (event: Events[K]) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCallback = (...args: any[]) => void
export type TCallbackEmpty = () => void;

export enum EPages {
    loginPage = 'loginPage',
    registerPage = 'registerPage',
    chatsPage = 'chatsPage',
    profilePage = 'profilePage',
    profileEditPage = 'profileEditPage',
    notFoundPage = 'notFoundPage',
    serverErrorPage = 'serverErrorPage',
}

export enum Event {
    INIT = 'init',
    MOUNTED = 'mounted',
    UPDATED = 'updated',
    RENDER = 'render',
}

export type TProps = {
    [key: string]: unknown
    settings?: {
        withInternalId?: boolean
    }
    attrs?: object
}

export type TIterableObject = {
    [index: string]: unknown
}

export type TChildren = Record<string, BaseComponent>;

export type TMeta = {
    tagName: string
    props: TProps
}

export type TEvents = Record<string, TCallback>;
