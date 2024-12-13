import { Block } from '@/services/base-component';
import avatarTemplate from './avatar.hbs?raw';
import './avatar.pcss';

export default class Avatar extends Block {
    render() {
        return this.compile(avatarTemplate);
    }
}
