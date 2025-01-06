import { IRequestResult } from '@/types';
import { queryStringify } from '@/utils';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type TMethodKeys = keyof typeof METHOD;
type TMethodValues = (typeof METHOD)[TMethodKeys];

interface IOptions {
    method?: TMethodValues;
    headers?: Record<string, string>;
    data?: XMLHttpRequestBodyInit;
    timeout?: number;
}

const parseXHRResult = (xhr: XMLHttpRequest): IRequestResult => {
    return {
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: xhr.responseText,
        json: <T>() => JSON.parse(xhr.responseText) as T,
    };
};

const errorResponse = (xhr: XMLHttpRequest, message: string | null = null): IRequestResult => {
    return {
        ok: false,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: message || xhr.statusText,
        json: <T>() => JSON.parse(message || xhr.statusText) as T,
    };
};

export class HTTPTransport {
    private _apiUrl = '';

    constructor(baseUrl: string) {
        this._apiUrl = `https://ya-praktikum.tech/api/v2${baseUrl}`;
    }

    get(url: string, options: IOptions = {}): Promise<IRequestResult> {
        return this.request(`${this._apiUrl}${url}`, { ...options, method: METHOD.GET }, options.timeout);
    }

    post(url: string, options: IOptions = {}): Promise<IRequestResult> {
        return this.request(`${this._apiUrl}${url}`, { ...options, method: METHOD.POST }, options.timeout);
    }

    put(url: string, options: IOptions = {}): Promise<IRequestResult> {
        return this.request(`${this._apiUrl}${url}`, { ...options, method: METHOD.PUT }, options.timeout);
    }

    delete(url: string, options: IOptions = {}): Promise<IRequestResult> {
        return this.request(`${this._apiUrl}${url}`, { ...options, method: METHOD.DELETE }, options.timeout);
    }

    request(url: string, options: IOptions = {}, timeout = 5000): Promise<IRequestResult> {
        const { headers = {}, method, data } = options;
        const apiUrl = this._apiUrl;

        return new Promise<IRequestResult>(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, isGet && !!data ? `${apiUrl}${url}${queryStringify(data)}` : url);

            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(parseXHRResult(xhr));
            };

            xhr.onabort = () => {
                resolve(errorResponse(xhr, 'Запрос отменен'));
            };
            xhr.onerror = () => {
                resolve(errorResponse(xhr, 'Ошибка запроса'));
            };

            xhr.timeout = timeout;
            xhr.ontimeout = () => {
                resolve(errorResponse(xhr, 'Превышено время выполнения запроса'));
            };

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
