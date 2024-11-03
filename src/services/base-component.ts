import { TCallback, TChildren, TEvents, TIterableObject, TMeta, TProps } from '@/types';
import Handlebars from 'handlebars';
import {v4 as uuidv4} from 'uuid';
import { Event } from '@/types';
import { EventBus } from './event-bus';


export class BaseComponent {
    private _element: HTMLElement | null;
    private _meta: TMeta;
    private _props: TProps;
    private _children: TChildren;
    private _events: TEvents;
    private _id: string;
    private _eventBus: EventBus;


    constructor(tagName = 'div', propsAndChilds: TProps = {}) {
        const { props, children } = this.getPropsAndChildren(propsAndChilds);
        this._eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };
        this._element = null;
        this._id = uuidv4();
        this._props = this._makeProxy({...props, __id: this._id});
        this._children = this._makeProxy(children);
        this._events = {};
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

        Object.keys(propsWithChilds).forEach((key) => {
            if (propsWithChilds[key] instanceof BaseComponent) {
                children[key] = propsWithChilds[key];
            } else {
                props[key] = propsWithChilds[key];
            }
        });

        return { props, children };
    }

    private _onRender() {
        const block = this.render();
        this.removeEvents();
        if (this._element) {
            this._element.innerHTML = '';
            if (block) {
                if (Object.keys(this._children).length === 0) {
                    this._element.append(block);
                    console.log(111, this._element);
                    
                    this._element = this._element.firstElementChild as HTMLElement || null;
                    console.log(222, this._element);
                    
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

    public mounted() {
        
    }

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
            console.log('isRerender old', oldProps);
            console.log('isRerender new', newProps);

            this._eventBus.emit(Event.RENDER);
        }
    }

    public hasUpdated(oldProps: TProps, newProps: TProps) {        
        return Object.keys(oldProps).some((oldKey) => oldProps[oldKey] !== newProps[oldKey]);
        // return false;
    }


    public render(): DocumentFragment | undefined {
        return;
    }

    public setProps(newProps: TProps) {
        if (!newProps) {
            return;
        }

        const {props = {}, children = {}} = this.getPropsAndChildren(newProps);        

        if (Object.values(props).length) {
            Object.assign(this._props, props);            
        }

        if (Object.values(children).length) {
            Object.assign(this._children, children);
        }
        
    }


    public addEvents() {
        Object.entries(this._props)
            .filter(([key, _]) => key.charAt(0) === '@')
            .forEach((event) => {
                const [key, cb] = event as [string, TCallback];
                const eventName = key.slice(1);
                this._events[eventName] = cb;

                if (this._element) {                    
                    this._element.addEventListener(eventName, cb);
                }
            });
    }

    public removeEvents() {
        Object.keys(this._events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, this._events[eventName]);
        });
    }

    public addAttribute() {
        const attrs = this._props?.attrs as object ?? {};

        Object.entries(attrs as object).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value);
            }
        });        
    }

    public compile(template: string, props?: Record<string, unknown>): DocumentFragment {
        const propsAndStubs = !props ? this._props : structuredClone(props); 
        
        Object.entries(this._children).forEach(([key, child]) => {
            console.log('compile child', key);
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        const fragment = this.createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs); 
        
        console.log('===compile=== ', template);
        

        Object.values(this._children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent() || '');
            }
        });

        return fragment.content;
    }

    

    private _makeProxy<T extends TIterableObject>(props: T) {
        const proxyOptions = {
            get(target: T, prop: string): unknown {
                const value = target[prop];
                return (typeof value === 'function') ? value.bind(target) : value;
            },
        
            set: (target: T, prop: string, value: unknown): boolean => {
                if (prop.startsWith('_')) {
                    throw new Error("Нет прав");
                } else {
                    const oldTarget = {...target};

                    // @ts-expect-error ругается на T
                    target[prop] = value;
                    console.log('-makeProxy set');
                    

                    this._eventBus.emit(Event.UPDATED, oldTarget, target);
        
                    return true;
                }
            },
        
            deleteProperty(target: T, prop: string): boolean {
                if (prop.startsWith('_')) {
                    throw new Error("Нет прав");
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
