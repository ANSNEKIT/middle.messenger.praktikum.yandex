import { Block } from '@/services/base-component';
import { notFoundPageProps } from '@/constants';
import stubTemplate from '@/components/Stub/stub.hbs?raw';

export default class NotFoundPage extends Block {
    constructor(props = {}) {
        super('div', {
            ...props,
            ...notFoundPageProps,
        });
    }

    render() {
        return this.compile(stubTemplate);
    }
}
