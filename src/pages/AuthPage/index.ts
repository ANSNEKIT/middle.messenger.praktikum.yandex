import AuthPageTemplate from './auth.hbs?raw';
import { Block } from '@/services/base-component';

export default class AuthPage extends Block {
    render() {
        return this.compile(AuthPageTemplate);
    }
}
