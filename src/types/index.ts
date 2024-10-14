export enum EPages {
    loginPage = 'loginPage',
    registerPage = 'registerPage',
    chatsPage = 'chatsPage',
    profilePage = 'profilePage',
    profileEditPage = 'profileEditPage',
    notFoundPage = 'notFoundPage',
    serverErrorPage = 'serverErrorPage',
}

export type TPageValues = keyof Record<EPages, string>;
