import { Block } from '@/services/base-component';
import modalTemplate from './modal.hbs?raw';

import './modal.pcss';
import { IProps } from '@/types';

interface IModalProps extends IProps {
    title: string;
    isShow?: boolean;
    body?: Block;
    submitBtn?: Block;
    cancelBtn?: Block;
    isShowCancel?: boolean;
}

export default class Modal extends Block<IModalProps> {
    constructor(props: IModalProps) {
        super('div', {
            ...props,
        });
    }

    public show() {
        this.setProps({ isShow: true });
    }

    public hide() {
        this.setProps({ isShow: false });
    }

    public togle() {
        this.setProps({ isShow: !this.getProps().isShow });
    }

    render() {
        return this.compile(modalTemplate);
    }
}
