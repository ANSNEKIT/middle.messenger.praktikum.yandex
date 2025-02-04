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
        super('div', props);

        this._initClickEvent();
    }

    private _initClickEvent() {
        window.addEventListener('click', this._onClickWindow.bind(this));
    }

    private _onClickWindow(evt: MouseEvent) {
        const target = evt.target as HTMLElement | null;
        const isClickOnModal = target?.classList.contains('modal-container');

        if (isClickOnModal) {
            this.hide();
        }
    }

    show() {
        const $modal = this.getContent();

        if ($modal) {
            $modal.classList.add('show');
        }
    }

    hide() {
        const $modal = this.getContent();

        if ($modal) {
            $modal?.classList.remove('show');
        }
    }

    render() {
        return this.compile(modalTemplate);
    }
}
