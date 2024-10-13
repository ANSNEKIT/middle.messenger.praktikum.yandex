import Handlebars from 'handlebars';
import ChatsPage from './chats.hbs?raw';
import './chats.pcss';

const chatsPageTemplate = Handlebars.compile(ChatsPage);
const chatsPageData = {

}


export {
    chatsPageTemplate as template,
    chatsPageData as data,
}
