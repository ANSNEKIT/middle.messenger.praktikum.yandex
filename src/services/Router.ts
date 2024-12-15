import Route from './Route';
import { Block } from './base-component';
import { IRouter, IRoute } from '@/types/router';

export default class Router implements IRouter {
    static __instance: Router | null = null;
    public __instance: Router | null = null;
    private _rootQuery = '';
    private _currentRoute: IRoute | null = null;
    public routes: IRoute[] = [];
    public history: History | null = null;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._currentRoute = null;
        this.history = window.history;
        this._rootQuery = rootQuery;
        this.__instance = this;
    }

    use(path: string, block: typeof Block) {
        const route = new Route(path, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((evt: Event) => {
            const curTarget = evt.currentTarget as Window;
            this._onRoute(curTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathName: string) {
        const route = this.routes.find((r) => r.match(pathName));
        if (!route) {
            return;
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathName: string) {
        this.history!.pushState({}, '', pathName);
        this._onRoute(pathName);
    }

    back() {
        this.history!.back();
    }

    next() {
        this.history!.forward();
    }

    getRoute(pathName: string) {
        const route = this.routes.find((r) => r.match(pathName));
        if (!route) {
            return this.routes.find((r) => r.match('*')) as IRoute;
        }
        return route;
    }
}
