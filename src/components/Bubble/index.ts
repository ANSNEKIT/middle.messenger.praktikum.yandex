import { BaseComponent } from '@/services/base-component';
import bubbleTemplate from './bubble.hbs?raw';
import './bubble.pcss';

export default class Bubble extends BaseComponent {
    render() {
        return this.compile(bubbleTemplate);
    }
}
