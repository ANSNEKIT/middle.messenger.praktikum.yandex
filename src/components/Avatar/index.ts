import { BaseComponent } from '@/services/base-component';
import avatarTemplate from './avatar.hbs?raw';
import './avatar.pcss';


export default class Avatar extends BaseComponent {
    render() {        
        return this.compile(avatarTemplate);
    }
}
