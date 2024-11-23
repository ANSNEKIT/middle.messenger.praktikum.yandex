import chatsPageTemplate from './chats.hbs?raw';
import './chats.pcss';
import { BaseComponent } from '@/services/base-component';

export default class ChatsPage extends BaseComponent {
    render() {
        return this.compile(chatsPageTemplate);
    }
}
