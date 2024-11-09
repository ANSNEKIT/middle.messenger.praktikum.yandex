import { TCallback, TChildren, TEvents, TIterableObject, TMeta, TProps } from '@/types';
import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '@/types';
import { EventBus } from './event-bus';

export class BaseComponent {
    private _element: HTMLElement | null;
    private _meta: TMeta;
    private _props: TProps;
    private _children: TChildren;
    private _events: TEvents;
    private _lists: Record<string, BaseComponent[]>;
    private _id: string;
    private _eventBus: EventBus;
    private _setUpdate = false;

    constructor(tagName = 'div', propsAndChilds: TProps = {}) {
        const { props, children, lists, events } = this.getPropsAndChildren(propsAndChilds);
        this._eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };
        this._element = null;
        this._id = uuidv4();
        this._props = this._makeProxy({ ...props, __id: this._id });
        this._children = this._makeProxy(children);
        this._lists = lists;
        this._events = events;
        this.registerEvents();
        this._eventBus.emit(Event.INIT);
    }

    public registerEvents() {
        this._eventBus.on(Event.INIT, this.onInit.bind(this));
        this._eventBus.on(Event.RENDER, this._onRender.bind(this));
        this._eventBus.on(Event.MOUNTED, this._onMounted.bind(this));
        this._eventBus.on(Event.UPDATED, this._onUpdated.bind(this));
    }

    public onInit() {
        this._element = this.createDocumentElement(this._meta?.tagName);
        this._eventBus.emit(Event.RENDER);
    }

    public createDocumentElement(tag = 'div') {
        const $element = document.createElement(tag);

        if (this._props.settings?.withInternalId) {
            $element.setAttribute('data-id', this._id);
        }

        return $element;
    }

    public getPropsAndChildren(propsWithChilds: TProps) {
        const props: TProps = {};
        const children: TChildren = {};
        const lists: Record<string, BaseComponent[]> = {};
        const events: TEvents = {};

        Object.keys(propsWithChilds).forEach((key) => {
            if (propsWithChilds[key] instanceof BaseComponent) {
                children[key] = propsWithChilds[key];
            } else if (Array.isArray(propsWithChilds[key]) && propsWithChilds[key].every((child) => child instanceof BaseComponent)) {
                lists[key] = propsWithChilds[key];
            } else if (key.charAt(0) === '@') {
                events[key] = propsWithChilds[key] as TCallback;
            } else {
                props[key] = propsWithChilds[key];
            }
        });

        return { props, children, lists, events };
    }

    private _onRender() {
        const block = this.render();
        this.removeEvents();

        if (this._element) {
            this._element.innerHTML = '';
            if (block) {
                if (this._props?.settings?.isSimple) {
                    this._element.append(block);
                    this._element = (this._element.firstElementChild as HTMLElement) || null;
                } else {
                    this._element.append(block);
                }
            }
        }
        
        this.addAttribute();
        this.addEvents();
    }

    private _onMounted() {
        this.mounted();
        Object.values(this._children).forEach((child) => child.dispatchOnMounted());
    }

    public mounted() {}

    public dispatchOnMounted() {
        this._eventBus.emit(Event.MOUNTED);

        if (Object.keys(this._children).length) {
            this._eventBus.emit(Event.RENDER);
        }
    }

    private _onUpdated(oldProps: TProps, newProps: TProps) {
        const isRerender = this.hasUpdated(oldProps, newProps);
        console.log('_onUpdated', isRerender);

        if (isRerender) {
            this._eventBus.emit(Event.RENDER);
        }
    }

    public hasUpdated(oldProps: TProps, newProps: TProps) {
        console.log('hasUpdate old', oldProps);
        console.log('hasUpdate new', newProps);

        return true;
    }

    public render(): DocumentFragment | undefined {
        return;
    }

    public setProps(newProps: TProps) {
        if (!newProps) {
            return;
        }

        this._setUpdate = false;
        const oldProps = {...this._props};
        const { props = {}, children = {}, lists = {} } = this.getPropsAndChildren(newProps);

        if (Object.values(props).length) {
            Object.assign(this._props, props);
        }

        if (Object.values(children).length) {
            Object.assign(this._children, children);
        }

        if (Object.values(lists).length) {
            Object.assign(this._lists, lists);
        }

        if (this._setUpdate) {
            this._eventBus.emit(Event.UPDATED, oldProps, this._props);
            this._setUpdate = false;
        }
    }

    public addEvents() {
        Object.entries(this._events).forEach((event) => {
            const [key, cb] = event as [string, TCallback];
            const eventName = key.slice(1);
            this._events[eventName] = cb;

            if (this._element) {
                if (eventName === 'blur') {
                    this._element.addEventListener(eventName, cb, true);
                } else {
                    this._element.addEventListener(eventName, cb);
                }
            }
        });
    }

    public removeEvents() {
        Object.keys(this._events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, this._events[eventName]);
        });
    }

    public addAttribute() {
        const attrs = (this._props?.attrs as object) ?? {};

        Object.entries(attrs as object).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value);
            }
        });
    }

    public compile(template: string, props?: TProps): DocumentFragment {
        let propsAndStubs = {} as TProps;

        if (!props) {
            propsAndStubs = this._props;
        } else {
            Object.keys(props).forEach((key) => {
                if (props[key] instanceof BaseComponent) {
                    propsAndStubs[key] = props[key];
                } else {
                    propsAndStubs[key] = structuredClone(props[key]);
                }
            });
        }

        Object.entries(this._children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this._lists).forEach(([key, listItem]) => {
            propsAndStubs[key] = listItem.map((listChild) => {
                return `<div data-id="list-id-${listChild._id}"></div>`;
            });
        });

        const fragment = this.createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this._children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent() || '');
            }
        });

        Object.values(this._lists).forEach((list) => {
            list.forEach((listChild) => {
                const stub = fragment.content.querySelector(`[data-id="list-id-${listChild._id}"]`);
                if (stub) {
                    stub.replaceWith(listChild.getContent() || '');
                }
            });
        });

        return fragment.content;
    }

    private _makeProxy<T extends TIterableObject>(props: T) {
        const proxyOptions = {
            get(target: T, prop: string): unknown {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: T, prop: string, value: unknown): boolean => {
                if (prop.startsWith('_')) {
                    throw new Error('Нет прав');
                } else {
                    if (target[prop] !== value) {
                        // @ts-expect-error ругается на T
                        target[prop] = value;
                        this._setUpdate = true;
                    }

                    return true;
                }
            },
            deleteProperty(target: T, prop: string): boolean {
                if (prop.startsWith('_')) {
                    throw new Error('Нет прав');
                } else {
                    delete target[prop];
                    return true;
                }
            },
        };

        return new Proxy(props, proxyOptions);
    }

    public getContent() {
        return this._element;
    }

    public getProps() {
        return this._props;
    }

    public hide() {
        const componentHtml = this.getContent();
        if (!componentHtml) {
            return;
        }
        componentHtml.style.display = 'none';
    }

    public show() {
        const componentHtml = this.getContent();
        if (!componentHtml) {
            return;
        }
        componentHtml.style.display = 'block';
    }
}
