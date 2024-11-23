import { BaseComponent } from '@/services/base-component';
import AuthFormHbs from './auth-form.hbs?raw';
import './auth-form.pcss';

export default class AuthForm extends BaseComponent {
    render() {
        return this.compile(AuthFormHbs);
    }
}
