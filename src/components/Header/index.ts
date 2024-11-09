import { BaseComponent } from '@/services/base-component';
import HeaderTemplate from './header.hbs?raw';
import './header.pcss';


export default class Header extends BaseComponent {
    render() {        
        return this.compile(HeaderTemplate);
    }
}
