import profilePageTemplate from './profile.hbs?raw';
import { Block } from '@/services/base-component';
import './profile.pcss';
import { withRouter } from '@/utils/events';
import { IProps, RequiredKeys } from '@/types';
import Avatar from '@/components/Avatar';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import { ERouter } from '@/constants/router';

import './profile.pcss';

class ProfilePage extends Block {
    constructor(props = {} as RequiredKeys<IProps, 'router'>) {
        super('div', {
            ...props,
            ...{
                attrs: {
                    class: 'page page-center justify-center profile',
                },
                pageTitle: new PageTitle('h1', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'profile__title',
                    title: 'Профиль',
                }),
                avatar: new Avatar('div', {
                    settings: {
                        isSimple: true,
                    },
                    class: 'profile__avatar',
                    image: '',
                }),
                profile: {
                    userName: 'Артемий Лебедев',
                    fields: [
                        {
                            name: 'Почта',
                            value: 't@t.ru',
                        },
                        {
                            name: 'Логин',
                            value: 'asdf',
                        },
                        {
                            name: 'Имя',
                            value: 'Артемий',
                        },
                        {
                            name: 'Фамилия',
                            value: 'Лебедев',
                        },
                        {
                            name: 'Имя в чате',
                            value: 'art',
                        },
                        {
                            name: 'Телефон',
                            value: '+7999',
                        },
                    ],
                },
                editLink: new Link('a', {
                    settings: {
                        isSimple: true,
                    },
                    href: '#',
                    linkName: 'Редактировать профиль',
                    '@click': () => props.router.go(ERouter.PROFILE_EDIT),
                }),
            },
        });
    }
    render() {
        return this.compile(profilePageTemplate);
    }
}

export default withRouter(ProfilePage as typeof Block);
