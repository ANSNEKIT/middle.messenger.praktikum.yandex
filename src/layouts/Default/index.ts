import defaultLayoutTemplate from './default.hbs?raw';
import { BaseComponent } from '@/services/base-component';
import './default-layout.pcss';


export default class LayoutDefault extends BaseComponent {
    render() {
        return this.compile(defaultLayoutTemplate);
    }
}
