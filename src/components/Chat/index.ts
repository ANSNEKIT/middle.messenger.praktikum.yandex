import { BaseComponent } from '@/services/base-component';
import chatTemplate from './chat.hbs?raw';
import './chat.pcss';


export default class Chat extends BaseComponent {
    render() {        
        return this.compile(chatTemplate);
    }
}
