import defaultLayoutTemplate from './default.hbs?raw';
import { BaseComponent } from '@/services/base-component';
import './default-layout.pcss';


export default class LayoutDefault extends BaseComponent {
    render() {
        console.log('render LayoutDefault');
        return this.compile(defaultLayoutTemplate);
    }
}
