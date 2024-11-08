import { BaseComponent } from '@/services/base-component';
import inputTemplate from './input.hbs?raw';
import './input.pcss';
import { TProps } from '@/types';

export default class Input extends BaseComponent {
    render() {        
        return this.compile(inputTemplate);
    }

    hasUpdated(oldProps: TProps, newProps: TProps): boolean {        
        return oldProps['error'] !== newProps['error'];
    }
};
