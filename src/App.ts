import Handlebars from 'handlebars';
import * as Pages from './pages/index';
import { EPages, TPageValues } from './types';
import { uppercase } from './utils';


export default class App {
    $rootEl: HTMLElement | null;
    state: {
        currentPage: EPages;
    };

    constructor() {
        this.state = {
            currentPage: EPages.mainPage,
        };
        this.$rootEl = document.getElementById('app');
    }

    render() {
        if (!this.$rootEl) {
            return;
        }

        this.setTeplatePage(this.state.currentPage, this.$rootEl);
        this.attachEventListeners();
    }

    attachEventListeners() {
        const pageLinks = document.querySelectorAll('.page-link');
        pageLinks.forEach((link) => {
            link.addEventListener('click', (evt) => {                
                evt.preventDefault();
                const evtTarget = evt.target as HTMLLinkElement;
                const pageName = evtTarget?.dataset?.page as TPageValues;

                if (!pageName) {
                    return;
                }

                this.changePage(pageName);

                // history.pushState({}, `${pageName}`, ROUTE_NAMES[pageName]);
            });
        });
    }

    changePage(page: EPages) {
        this.state.currentPage = EPages[page];
        this.render();
    }

    setTeplatePage(page: EPages, rootEl: HTMLElement) {
        let template;
        const formatePageName = uppercase(page);
        // @ts-ignore
        template = Handlebars.compile(Pages[formatePageName]);
        rootEl.innerHTML = template({});
    }

}
