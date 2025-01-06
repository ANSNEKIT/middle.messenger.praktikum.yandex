import AuthApi from '@/api/auth/auth.api';
import { IUserLogin, IUserRegistration } from '@/api/types';
import { ERouter } from '@/constants/router';

const authApi = new AuthApi();

export const login = async (loginForm: IUserLogin): Promise<void> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.login(loginForm);
        if (xhr.ok) {
            window.store.setState({ authUser: loginForm.login });
            window.router.go(ERouter.MESSENGER);
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const register = async (registerForm: IUserRegistration): Promise<void> => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.registration(registerForm);

        if (xhr.ok) {
            window.router.go(ERouter.LOGIN);
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const me = async () => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.me();
        if (xhr.ok) {
            window.router.go(ERouter.MESSENGER);
            window.store.setState({ authUser: xhr.json() });
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const logout = async () => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await authApi.logout();
        if (xhr.ok) {
            window.router.go(ERouter.LOGIN);
            window.store.setState({ authUser: null });
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};
