import Router from './Router';
import { Block } from './base-component';

const mockBack = jest.fn(() => window.history.back());
const mockNext = jest.fn(() => window.history.back());
const mockGo = jest.fn((pathName: string) => window.history.pushState({ name: pathName }, '', pathName));
const mockUse = jest.fn().mockReturnThis();

jest.mock('./Router', () => {
    return jest.fn().mockImplementation(() => {
        return {
            back: mockBack,
            next: mockNext,
            go: mockGo,
            use: mockUse,
        };
    });
});

beforeEach(() => {
    router = new Router('#app');
});

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

let router: Router;

describe('Router', () => {
    it('Навигация вперед используя history api', () => {
        router.next();

        expect(mockNext).toHaveBeenCalled();
    });

    it('Навигация назад используя history api', () => {
        router.back();

        expect(mockBack).toHaveBeenCalled();
    });

    it('Переход к определенному роуту', () => {
        router.go('/messanger');
        router.go('/settings');

        expect(window.history.length).toBe(3);
        expect(window.location.pathname).toBe('/settings');
    });

    it('Метод use возвращает текущий инстанс роутера', () => {
        const pathname = '/settings';
        const block = 'SettingsPage' as unknown as typeof Block;

        const result = router.use(pathname, block);

        expect(result).toBe(router);
    });
});
