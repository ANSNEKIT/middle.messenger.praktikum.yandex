import { BaseComponent } from '@/services/base-component';
import avatarMiniTemplate from './avatar-mini.hbs?raw';
import './avatar-mini.pcss';

export default class AvatarMini extends BaseComponent {
    render() {
        return this.compile(avatarMiniTemplate);
    }
}
