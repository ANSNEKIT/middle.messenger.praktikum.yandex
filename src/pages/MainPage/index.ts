import Handlebars from 'handlebars';
import MainPage from './main.hbs?raw';
import "./main-page.pcss";


const mainPageTemplate = Handlebars.compile(MainPage);
const mainPageData = {
    title: 'Список страниц',
    pages: [
        {
            href: '#login',
            dataPage: 'loginPage',
            name: 'Вход',
        },
        {
            href: '#register',
            dataPage: 'registerPage',
            name: 'Регистрация',
        },
    ]
}

export {
    mainPageTemplate as template,
    mainPageData as data,
}
