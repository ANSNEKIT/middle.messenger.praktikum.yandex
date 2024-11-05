import profileEditPageTemplate from './profile-edit.hbs?raw';
import { BaseComponent } from '@/services/base-component';
import './profile-edit.pcss';


export default class ProfileEditPage extends BaseComponent {
    render() {
        console.log('render ProfileEditPage');
        return this.compile(profileEditPageTemplate);
    }
}
