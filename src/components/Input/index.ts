import { BaseComponent } from '@/services/base-component';
import inputTemplate from './input.hbs?raw';
import './input.pcss';

export default class Input extends BaseComponent {
    render() {        
        return this.compile(inputTemplate);
    }
};
