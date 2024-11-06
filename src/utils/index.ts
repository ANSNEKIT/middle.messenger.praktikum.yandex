import { ErrorText, InputRegExp } from "@/constants/validate";

export const uppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const validateWithMessage = (value: string | File, regexp: RegExp, errText: string) => {
    if (typeof value === 'string') {
        const isValid = regexp.test(value);
        return isValid ? isValid : errText;
    }

    return true;
};

export const validateInput = (name: keyof typeof InputRegExp, value: string) => {
    const inpRegExp = InputRegExp[name];
    return validateWithMessage(value, inpRegExp, ErrorText[name]);
};

export const validate = (rules: Record<string, string | true>) => {
    return Object.values(rules).every((formItemValidation) => formItemValidation === true);
};
