import { IProfileData, IUserAvatar, IUserChangePassword, IUserSearch } from '@/api/types';
import UserApi from '@/api/user/user.api';
import { IUserDTO } from '@/api/user/user.model';
import { ERouter } from '@/constants/router';

const userApi = new UserApi();

export const editProfile = async (form: IProfileData) => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await userApi.putProfile(form);
        if (xhr.ok) {
            window.router.go(ERouter.SETTINGS);
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const changeAvatar = async (form: IUserAvatar) => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await userApi.putAvatar(form);
        const newData = xhr.json<IUserDTO>();
        if (xhr.ok) {
            console.log('changeAvatar newData', newData);
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const changePassword = async (form: IUserChangePassword) => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await userApi.putPassword(form);
        if (xhr.ok) {
            console.log('changePassword');
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};

export const search = async (form: IUserSearch) => {
    window.store.setState({ isLoading: true });
    try {
        const xhr = await userApi.postSearch(form);
        const findedUsers = xhr.json<IUserDTO[]>();
        if (xhr.ok) {
            console.log('search 200 OK', findedUsers);
        } else if (xhr.status >= 500) {
            window.router.go(ERouter.SERVER_ERROR);
        }
    } catch (responsError: unknown) {
        console.error(responsError);
    } finally {
        window.store.setState({ isLoading: false });
    }
};
