import { IAPIError, UserDTO, UserRegisterDTO } from './auth.model';

export interface IAuthApi {
    login(data: IUserLogin): Promise<void | IAPIError>;
    registration(data: IUserRegistration): Promise<UserRegisterDTO | IAPIError>;
    me(): Promise<UserDTO | IAPIError>;
    logout(): Promise<void | IAPIError>;
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
