export enum EPages {
    mainPage = 'mainPage',
    loginPage = 'loginPage',
}

export type TPageValues = keyof Record<EPages, string>;