import { BaseComponent } from "@/services/base-component";
import linkTemplate from './link.hbs?raw';
import "./link.pcss";


export default class Link extends BaseComponent {
    render() {
        console.log('render Link');
        return this.compile(linkTemplate);
    }
}
