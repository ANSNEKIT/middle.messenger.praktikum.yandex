import { IRequestResult } from '@/types';
// import { IAPIError, UserDTO, UserRegisterDTO } from './auth/auth.model';
// import { IUserDTO } from './user/user.model';

export interface IAuthApi {
    login(data: IUserLogin): Promise<IRequestResult>;
    registration(data: IUserRegistration): Promise<IRequestResult>;
    me(): Promise<IRequestResult>;
    logout(): Promise<IRequestResult>;
}

export interface IUserApi {
    putProfile(data: IProfileData): Promise<IRequestResult>;
    putAvatar(data: IUserAvatar): Promise<IRequestResult>;
    putPassword(data: IUserChangePassword): Promise<IRequestResult>;
    postSearch(data: IUserSearch): Promise<IRequestResult>;
}

export interface IUserRegistration extends FormData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface IUserLogin extends FormData {
    login: string;
    password: string;
}

export interface IUserSearch {
    login: string;
}

export interface IProfileData extends FormData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IUserAvatar extends FormData {
    avatar: File;
}

export interface IUserChangePassword extends FormData {
    oldPassword: string;
    newPassword: string;
}
