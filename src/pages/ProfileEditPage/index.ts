import profileEditPageTemplate from './profile-edit.hbs?raw';
import { Block } from '@/services/base-component';
import './profile-edit.pcss';

export default class ProfileEditPage extends Block {
    render() {
        return this.compile(profileEditPageTemplate);
    }
}
