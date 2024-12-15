import { Block } from '@/services/base-component';
import Router from '@/services/Router';

export interface IRoute {
    navigate(path: string): void;
    render(): void;
    match(path: string): boolean;
    leave(): void;
}

export interface IRouter {
    use(path: string, block: typeof Block): Router;
    go(pathName: string): void;
    back(): void;
    next(): void;
    getRoute(pathName: string): IRoute;
}

export interface IRouteQuery {
    rootQuery: string;
}

export type TPathCallbackVoid = (pathName: string) => void;
