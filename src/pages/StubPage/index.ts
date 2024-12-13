import { Block } from '@/services/base-component';
import stubPageTemplate from './stub.hbs?raw';

export default class StubPage extends Block {
    render() {
        return this.compile(stubPageTemplate);
    }
}
