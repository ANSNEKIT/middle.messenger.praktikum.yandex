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

export class HTTPTransport {
    get = (url: string, options: IOptions = {}) => {
        return this.request(url, { ...options, method: METHOD.GET }, options.timeout);
    };

    post = (url: string, options: IOptions = {}) => {
        return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
    };

    put = (url: string, options: IOptions = {}) => {
        return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
    };

    delete = (url: string, options: IOptions = {}) => {
        return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
    };

    request = (url: string, options: IOptions = {}, timeout = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
