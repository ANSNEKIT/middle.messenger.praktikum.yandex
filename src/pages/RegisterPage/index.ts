import AuthTemplate from '@/components/Auth/auth.hbs?raw';
import { Block } from '@/services/base-component';
import { registerPageProps } from '@/constants';

export default class RegisterPage extends Block {
    constructor(props = {}) {
        super('div', {
            ...props,
            ...registerPageProps,
        });
    }

    render() {
        return this.compile(AuthTemplate);
    }
}
