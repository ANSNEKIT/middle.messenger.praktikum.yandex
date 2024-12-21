import { setInputValidationState, validate } from '@/utils';
import Input from '@/components/Input';
import { ErrorText, InputRegExp, TInputName } from '@/constants/validate';
import { IProps, LoginFormInputs, RequiredKeys } from '@/types';
import { validateWithMessage } from '.';
import { Block } from '@/services/base-component';
import { ERouter } from '@/constants/router';

export const onSubmit = (evt: MouseEvent, inputs: Input[]) => {
    evt.preventDefault();

    const target = evt.target as HTMLElement;
    const $form = document.getElementById('form') as HTMLFormElement | null;
    if ($form) {
        const formData = new FormData($form, target);
        const formEntries = Object.fromEntries(formData) as Record<LoginFormInputs, string | File>;
        const rules: Record<string, string | true> = {};

        for (const [key, value] of formData.entries()) {
            rules[key] = validateWithMessage(value, InputRegExp[key as TInputName], ErrorText[key as TInputName]);
        }

        const isValid = validate(rules);

        Object.entries(rules).forEach(([key, value]) => {
            const errText = typeof value === 'string' ? ErrorText[key as TInputName] : '';
            const inputComponent = inputs.find((input) => input.getProps().name === key);

            if (inputComponent) {
                const inputValue = typeof formData.get(key) === 'string' ? (formData.get(key) as string) : '';
                setInputValidationState(inputComponent, inputValue, errText);
            }
        });

        if (isValid) {
            console.log('submitForm', formEntries);
        }
    }
};

export const onblur = (evt: MouseEvent, inputs: Input[]) => {
    if ((evt.target as HTMLElement).tagName === 'INPUT') {
        const target = evt.target as HTMLInputElement;
        const targetName = target.name as TInputName;
        const targetValue = target.value;
        const validateState = validateWithMessage(targetValue, InputRegExp[targetName], ErrorText[targetName]);
        const errorText = validateState === true ? '' : validateState;
        const inputComponent = inputs.find((input) => input.getProps().name === targetName);

        if (inputComponent) {
            setInputValidationState(inputComponent, targetValue, errorText);
        }
    }
};

const validateInput = (input: Input) => {
    if (input instanceof Input) {
        const inputValue = (input.getProps()?.value as string) ?? '';
        const validateState = validateWithMessage(inputValue, InputRegExp.message, ErrorText.message);
        const errorText = validateState === true ? '' : validateState;
        setInputValidationState(input, inputValue, errorText);

        return typeof validateState === 'string' ? '' : inputValue;
    }
    return '';
};

export const onSendMessage = (evt: MouseEvent, input: Input) => {
    evt.preventDefault();

    const inputValue = validateInput(input);

    if (inputValue) {
        console.log('sendMessage', inputValue);
    }
};

export const onLinkClick = (evt: Event, props: RequiredKeys<IProps, 'router'>) => {
    evt.preventDefault();
    props.router.go(ERouter.LOGIN);
};

export const withRouter = <Cls extends typeof Block>(SomeBlock: Cls) => {
    // @ts-expect-error is ok typeClass
    return class extends SomeBlock {
        constructor(props: IProps) {
            // @ts-expect-error props extended
            super({ ...props, router: window.router });
        }
    };
};
