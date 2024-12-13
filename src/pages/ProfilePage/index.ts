import profilePageTemplate from './profile.hbs?raw';
import { Block } from '@/services/base-component';
import './profile.pcss';

export default class ProfilePage extends Block {
    render() {
        return this.compile(profilePageTemplate);
    }
}
