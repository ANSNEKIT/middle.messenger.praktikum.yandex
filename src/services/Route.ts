import { Block } from './base-component';
import { isEqual } from '@/utils';
import { IRouteQuery, IRoute } from '@/types/router';

export default class Route implements IRoute {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _block: Block | null;
    private _props: IRouteQuery;

    constructor(pathname: string, view: typeof Block, props: IRouteQuery) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    private _renderDom(query: string, block: Block) {
        const root = document.querySelector(query);
        if (root) {
            root.innerHTML = '';
            root.append(block.getContent() ?? '');
        }
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            return;
        }

        this._block.show();
        this._renderDom(this._props.rootQuery, this._block);
        this._block.mounted();
    }
}
