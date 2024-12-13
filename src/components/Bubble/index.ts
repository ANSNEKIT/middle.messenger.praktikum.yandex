import { Block } from '@/services/base-component';
import bubbleTemplate from './bubble.hbs?raw';
import './bubble.pcss';

export default class Bubble extends Block {
    render() {
        return this.compile(bubbleTemplate);
    }
}
