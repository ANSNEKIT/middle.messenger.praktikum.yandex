import { Block } from '@/services/base-component';
import chatFooterTemplate from './chat-footer.hbs?raw';
import { IProps } from '@/types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ContextMenu from '@/components/ContextMenu';

import './chat-footer.pcss';

export interface IChatFooterProps extends IProps {
    attachContextMenu: ContextMenu;
    buttonSubmit: Button;
}

export default class ChatFooter extends Block<IChatFooterProps> {
    constructor(props: IChatFooterProps) {
        super('form', {
            attrs: {
                class: 'chat-footer',
            },
            settings: {
                isSimple: true,
            },
            inputSendMessage: new Input('div', {
                attrs: {
                    class: 'chat-footer__input input',
                },
                id: 'input-message',
                inputClass: 'input__send-input',
                type: 'text',
                name: 'message',
                required: true,
            }),
            ...props,
        });
    }

    getSendValue() {
        const input = this.getChildren().inputSendMessage as Input;
        return input.getValue();
    }

    render() {
        return this.compile(chatFooterTemplate);
    }
}
