import AuthPageTemplate from './auth.hbs?raw';
import { BaseComponent } from '@/services/base-component';


export default class AuthPage extends BaseComponent {
    render() {
        return this.compile(AuthPageTemplate);
    }
}
