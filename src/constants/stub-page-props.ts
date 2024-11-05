import PageTitle from "@/components/PageTitle";

export const notFoundPageProps = {
    attrs: {
        class: 'page page-center',
    },
    pageTitle: new PageTitle('h1', {
        title: '404 страна не найдена',
    }),
};

export const serverErrorsPageProps = {
    attrs: {
        class: 'page page-center',
    },
    pageTitle: new PageTitle('h1', {
        title: '500 ошибка',
    }),
};
