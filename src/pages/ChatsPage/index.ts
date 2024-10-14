import Handlebars from 'handlebars';
import ChatsPage from './chats.hbs?raw';
import './chats.pcss';

const chatsPageTemplate = Handlebars.compile(ChatsPage);
const chatsPageData = {
    profile: {
        href: '#profile',
        dataPage: 'profilePage',
        name: 'Профиль',
    }
}


export {
    chatsPageTemplate as template,
    chatsPageData as data,
}
