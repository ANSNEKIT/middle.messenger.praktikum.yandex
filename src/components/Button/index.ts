import { Block } from '@/services/base-component';
import './button.pcss';
import buttonTeplate from './button.hbs?raw';

export default class Button extends Block {
    render() {
        return this.compile(buttonTeplate);
    }
}
