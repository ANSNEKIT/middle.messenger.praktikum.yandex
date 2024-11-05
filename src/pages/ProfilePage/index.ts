import profilePageTemplate from './profile.hbs?raw';
import { BaseComponent } from '@/services/base-component';
import './profile.pcss';


export default class ProfilePage extends BaseComponent {
    render() {
        console.log('render ProfilePage');
        return this.compile(profilePageTemplate);
    }
}
