import { describe, expect, it } from '@jest/globals';
import { isEqual } from '.';

describe('isEqual', () => {
    it('Идентичные строки равны', () => {
        const str1 = 'my_string';
        const str2 = 'my_string';
        const result = isEqual(str1, str2);

        expect(result).toBe(true);
    });

    it('Не идентичные строки не равны', () => {
        const str1 = 'one';
        const str2 = 'ONE';
        const result = isEqual(str1, str2);

        expect(result).toBe(false);
    });
});
