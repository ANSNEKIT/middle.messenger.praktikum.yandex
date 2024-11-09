import PageTitle from "@/components/PageTitle";

export const notFoundPageProps = {
    attrs: {
        class: 'page page-center justify-center',
    },
    pageTitle: new PageTitle('h1', {
        settings: {
            isSimple: true,
        },
        title: '404 страна не найдена',
    }),
};

export const serverErrorsPageProps = {
    attrs: {
        class: 'page page-center justify-center',
    },
    pageTitle: new PageTitle('h1', {
        settings: {
            isSimple: true,
        },
        title: '500 ошибка',
    }),
};
