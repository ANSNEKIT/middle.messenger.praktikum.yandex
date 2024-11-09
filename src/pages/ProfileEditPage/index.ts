import profileEditPageTemplate from './profile-edit.hbs?raw';
import { BaseComponent } from '@/services/base-component';
import './profile-edit.pcss';


export default class ProfileEditPage extends BaseComponent {
    render() {
        return this.compile(profileEditPageTemplate);
    }
}
