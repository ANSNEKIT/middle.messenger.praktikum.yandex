import profilePageTemplate from './profile.hbs?raw';
import { Block } from '@/services/base-component';
import './profile.pcss';
import { profilePageProps } from '@/constants';

export default class ProfilePage extends Block {
    constructor(props = {}) {
        super('div', {
            ...props,
            ...profilePageProps,
        });
    }
    render() {
        return this.compile(profilePageTemplate);
    }
}
