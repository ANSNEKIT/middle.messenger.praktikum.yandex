import { Indexed } from '@/types';
import { isObjectOrArray } from '@/types/guards';

function isEqualData(a: Indexed | unknown[] | string | number | boolean, b: Indexed | unknown[] | string | number | boolean): boolean {
    if (typeof a !== typeof b) {
        return false;
    }

    if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
        return a === b;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    const uniqKeys = new Set([...aKeys, ...bKeys]);
    if (!(aKeys.length === uniqKeys.size && bKeys.length === uniqKeys.size)) {
        return false;
    }

    for (const [key, aValue] of Object.entries(a)) {
        const bValue = b[key as keyof typeof b];

        if (isObjectOrArray(aValue) && isObjectOrArray(bValue)) {
            if (!isEqualData(aValue, bValue)) {
                return false;
            }
        } else if (aValue !== bValue) {
            return false;
        }
    }
    return true;
}

export default isEqualData;
