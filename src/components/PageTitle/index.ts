import { BaseComponent } from '@/services/base-component';
import pateTitleTemplate from './page-title.hbs?raw';
import './page-title.pcss';

export default class PageTitle extends BaseComponent {
    render() {
        console.log('render PageTitle');
        return this.compile(pateTitleTemplate);
    }
}
