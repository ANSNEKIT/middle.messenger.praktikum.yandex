import { EStoreEvents } from '@/types/store';
import { EventBus } from './event-bus';

export default class Store extends EventBus {
    private _state = {};
    static __instanse: Store | null = null;

    constructor(defaultState = {}) {
        if (Store.__instanse) {
            return Store.__instanse;
        }

        super();

        this._state = defaultState;
        this.setState(defaultState);

        Store.__instanse = this;
    }

    setState(nextState = {}) {
        const prevState = structuredClone(this._state);

        this._state = { ...prevState, ...nextState };

        this.emit(EStoreEvents.Updated, prevState, nextState);
    }
}
