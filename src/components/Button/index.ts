import { BaseComponent } from "@/services/base-component";
import "./button.pcss";
import buttonTeplate from './button.hbs?raw';

export default class Button extends BaseComponent {
    render() {
        console.log('render Button');
        return this.compile(buttonTeplate);
    }
}
