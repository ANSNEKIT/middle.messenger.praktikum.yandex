// import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
// import { ERouter } from './router';
// import { onLinkClick } from '@/utils/events';

// export const notFoundPageProps = {
//     settings: {
//         isSimple: true,
//     },
//     pageTitle: new PageTitle('h1', {
//         settings: {
//             isSimple: true,
//         },
//         title: '404 страна не найдена',
//     }),
//     GoHome: new Link('a', {
//         settings: {
//             isSimple: true,
//         },
//         href: ERouter.LOGIN,
//         linkName: 'Назад',
//         '@click': (evt: Event) => onLinkClick(evt, this),
//     }),
// };

export const serverErrorsPageProps = {
    settings: {
        isSimple: true,
    },
    pageTitle: new PageTitle('h1', {
        settings: {
            isSimple: true,
        },
        title: '500 ошибка',
    }),
};
