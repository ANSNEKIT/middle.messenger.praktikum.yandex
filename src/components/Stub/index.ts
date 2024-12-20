import { Block } from '@/services/base-component';
import stubTemplate from './stub.hbs?raw';

export default class Stub extends Block {
    render() {
        return this.compile(stubTemplate);
    }
}
