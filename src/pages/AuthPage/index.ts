import AuthPageTemplate from './auth.hbs?raw';
import { BaseComponent } from '@/services/base-component';


export default class AuthPage extends BaseComponent {
    render() {
        console.log('render AuthPage');
        return this.compile(AuthPageTemplate);
    }
}
