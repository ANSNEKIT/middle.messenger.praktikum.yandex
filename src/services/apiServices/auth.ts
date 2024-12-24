import AuthApi from '@/api/auth';
import { IAPIError } from '@/api/auth.model';
// import { IAPIError } from '@/api/auth.model';
import { IUserLogin, IUserRegistration } from '@/api/types';
import { ERouter } from '@/constants/router';

const authApi = new AuthApi();

export const login = async (loginForm: IUserLogin): Promise<void> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.login(loginForm);
        console.log('services login response', xhr.response);
        if (xhr.status === 200) {
            window.router.go(ERouter.MESSENGER);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
        const xhr = await (responsError as Promise<XMLHttpRequest>);
        window.store.setState({ authError: (xhr.response as IAPIError).response });
        if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
            return;
        }
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const register = async (registerForm: IUserRegistration): Promise<void> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.registration(registerForm);
        console.log('services register response', xhr.response);
        if (xhr.status === 200) {
            window.router.go(ERouter.LOGIN);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
        const xhr = await (responsError as Promise<XMLHttpRequest>);
        window.store.setState({ authError: (xhr.response as IAPIError).response });
        if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
            return;
        }
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const me = async () => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.me();
        console.log('services me response', xhr.response);
        if (xhr.status === 200) {
            window.router.go(ERouter.MESSENGER);
            window.store.setState({ authUser: xhr.response });
        }
    } catch (responsError: unknown) {
        console.error(responsError);
        const xhr = await (responsError as Promise<XMLHttpRequest>);
        window.store.setState({ authError: (xhr.response as IAPIError).response });
        if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
            return;
        }
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const logout = async () => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.logout();
        console.log('services logout response', xhr.response);
        if (xhr.status === 200) {
            window.router.go(ERouter.LOGIN);
            window.store.setState({ authUser: null });
        }
    } catch (responsError: unknown) {
        console.error(responsError);
        const xhr = await (responsError as Promise<XMLHttpRequest>);
        window.store.setState({ authError: (xhr.response as IAPIError).response });
        if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
            return;
        }
    } finally {
        window.store.setState({ isLoading: false });
    }
};
