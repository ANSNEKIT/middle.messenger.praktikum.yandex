import profilePageTemplate from './profile.hbs?raw';
import { Block } from '@/services/base-component';
import './profile.pcss';
import { withRouter } from '@/utils/events';
import { IProps, RequiredKeys } from '@/types';
import Avatar from '@/components/Avatar';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import { ERouter } from '@/constants/router';
import { IStore } from '@/types/window';

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
                    userName: '-',
                    fields: [
                        {
                            name: 'Почта',
                            value: '-',
                        },
                        {
                            name: 'Логин',
                            value: '-',
                        },
                        {
                            name: 'Имя',
                            value: '-',
                        },
                        {
                            name: 'Фамилия',
                            value: '-',
                        },
                        {
                            name: 'Имя в чате',
                            value: '-',
                        },
                        {
                            name: 'Телефон',
                            value: '-',
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

    mounted() {
        setTimeout(async () => {
            const { authUser } = window.store.getState<IStore>();

            if (!authUser) {
                return;
            }

            const newProfile = {
                profile: {
                    userName: `${authUser.first_name} ${authUser.second_name}`,
                    fields: [
                        {
                            name: 'Почта',
                            value: authUser.email,
                        },
                        {
                            name: 'Логин',
                            value: authUser.login,
                        },
                        {
                            name: 'Имя',
                            value: authUser.first_name,
                        },
                        {
                            name: 'Фамилия',
                            value: authUser.second_name,
                        },
                        {
                            name: 'Имя в чате',
                            value: authUser.display_name,
                        },
                        {
                            name: 'Телефон',
                            value: authUser.phone,
                        },
                    ],
                },
            };

            this.setProps(newProfile);
        }, 0);
    }
}

export default withRouter(ProfilePage as typeof Block);
