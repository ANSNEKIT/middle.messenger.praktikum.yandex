import { setInputValidationState, validate } from '@/utils';
import Input from '@/components/Input';
import { ErrorText, InputRegExp, TInputName } from '@/constants/validate';
import { IProps, RequiredKeys } from '@/types';
import { validateWithMessage } from '.';
import { Block } from '@/services/base-component';
import { ERouter } from '@/constants/router';

/*
TODO Внутри компонента Input появились методы getValue, getName, validate, setError
Использовать их 
*/
export const prepareSubmitForm = (form: HTMLFormElement, inputs: Input[]): Record<string, string | File> | null => {
    const formData = new FormData(form);
    const rules = getFormRules(formData);
    setFormErrors(formData, rules, inputs);

    return validate(rules) ? Object.fromEntries(formData) : null;
};

/*
TODO Внутри компонента Input появились методы getValue, getName, validate, setError
Использовать их 
*/
const getFormRules = (formData: FormData) => {
    const rules: Record<string, string | true> = {};

    for (const [key, value] of formData.entries()) {
        rules[key] = validateWithMessage(value, InputRegExp[key as TInputName], ErrorText[key as TInputName]);
    }

    return rules;
};

/*
TODO Внутри компонента Input появились методы getValue, getName, validate, setError
Использовать их 
*/
const setFormErrors = (formData: FormData, rules: Record<string, string | true> = {}, inputs: Input[]): void => {
    Object.entries(rules).forEach(([key, value]) => {
        const errText = typeof value === 'string' ? ErrorText[key as TInputName] : '';
        const inputComponent = inputs.find((input) => input.getName() === key);

        if (!inputComponent) {
            return;
        }

        const inputValue = (formData.get(key) as string) || '';
        setInputValidationState(inputComponent, inputValue, errText);
    });
};

/*
TODO Внутри компонента Input появились методы getValue, getName, validate, setError
Использовать их 
*/
export const onblur = (evt: MouseEvent, inputs: Input[]) => {
    if ((evt.target as HTMLElement).tagName === 'INPUT') {
        const target = evt.target as HTMLInputElement;
        const { name, value } = target as { name: TInputName; value: string };
        const validateState = validateWithMessage(value, InputRegExp[name], ErrorText[name]);

        const errorText = validateState === true ? '' : validateState;
        const inputComponent = inputs.find((input) => input.getProps().name === name);

        if (inputComponent) {
            setInputValidationState(inputComponent, value, errorText);
        }
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
