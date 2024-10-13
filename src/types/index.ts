export enum EPages {
    loginPage = 'loginPage',
    registerPage = 'registerPage',
    chatsPage = 'chatsPage',
    notFoundPage = 'notFoundPage',
    serverErrorPage = 'serverErrorPage',
}

export type TPageValues = keyof Record<EPages, string>;
