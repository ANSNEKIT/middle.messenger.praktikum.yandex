import { BASE_URL } from '@/constants/constants';
import { HTTPTransport } from './httpTransport';

let http: HTTPTransport;
let spyRequest: jest.SpyInstance;

enum METHOD {
    GET = 'GET',
}

const open = jest.fn();
const onload = jest.fn((x) => x);
const onerror = jest.fn();
const send = jest.fn((x) => x);
const setRequestHeader = jest.fn((header: string, value) => ({ [header]: value }));

// @ts-expect-error mock part of xmlhttprequest
global.XMLHttpRequest = jest.fn().mockImplementation(function () {
    return {
        open,
        send,
        onerror,
        onload,
        setRequestHeader,
    };
});

beforeEach(() => {
    http = new HTTPTransport('/mock');
    spyRequest = jest.spyOn(http, 'request');
});

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

describe('HTTPTransport', () => {
    test('request должен установить url запроса', () => {
        http.request('/test', { method: METHOD.GET });

        expect(open.mock.calls[0][1]).toBe('/test');
    });

    describe('Проверка CRUD методов', () => {
        test('get: Добавляет query params в запрос', () => {
            http.get('/test', { data: { a: 1, b: 2 } });

            expect(open).toHaveBeenCalledWith('GET', BASE_URL + '/mock/test?a=1&b=2');
        });

        test('post: установил xhr headers', () => {
            http.post('', { headers: { 'Content-Type': 'application/json' } });

            expect(setRequestHeader).toHaveLastReturnedWith({ 'Content-Type': 'application/json' });
        });

        test('put: установил xhr timeout', () => {
            http.put('', { withCredentials: true, timeout: 500 });

            expect(spyRequest.mock.calls[0][1].timeout).toBe(500);
        });

        test('delete: отправлен запрос', () => {
            http.delete('/test');

            expect(open).toHaveBeenCalledWith('DELETE', BASE_URL + '/mock/test');
        });
    });
});
