import { Block } from '@/services/base-component';
import AuthTemplate from '@/components/Auth/auth.hbs?raw';
import { loginPageProps } from '@/constants';

export default class LoginPage extends Block {
    constructor(props = {}) {
        super('div', {
            ...props,
            ...loginPageProps,
        });
    }

    render() {
        return this.compile(AuthTemplate);
    }
}
