import { BaseComponent } from '@/services/base-component';
import stubPageTemplate from './stub.hbs?raw';

export default class StubPage extends BaseComponent {
    render() {
        return this.compile(stubPageTemplate);
    }
}
