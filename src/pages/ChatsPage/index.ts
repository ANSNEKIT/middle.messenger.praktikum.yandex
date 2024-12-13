import chatsPageTemplate from './chats.hbs?raw';
import './chats.pcss';
import { Block } from '@/services/base-component';

export default class ChatsPage extends Block {
    render() {
        return this.compile(chatsPageTemplate);
    }
}
