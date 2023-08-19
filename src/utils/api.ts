import { apiUrl } from './constants';
import { IResponse, ICustomHeaders, IError, IOptions, IUserResponse } from '../types/api';

export const checkResponse = <T extends Response>(res: T): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = <T extends Response, U extends RequestInit>(url: string, options: U | object = {}): Promise<T> => {
    return (fetch(url, options).then(checkResponse) as Promise<T>);
};

export const refreshToken = async () => {
    return request<IResponse, IOptions>(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });
};

export const fetchWithRefresh = async<T extends IResponse> (url: string, options: IOptions): Promise<T> => {
    try {
        return request<T, IOptions>(url, options);
    } catch (err) {
        if ((err as IError).message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return await request<T, IOptions>(url, options);
        } else {
            return Promise.reject(err);
        }
    }
};

export const resetPassword = (password: string, token: string) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            'password': password,
            'token': token
        })
    };
    return request(`${apiUrl}/password-reset/reset`, settings);
    
};

export const forgotPassword = (email: string) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'email': email })
    };
    return request(`${apiUrl}/password-reset`, settings);
};

//Функции для userReducer
const signInUser = (email: string, password: string) => {
    return request<IUserResponse, IOptions>(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                'password': password,
                'email': email
            })
    });
};

const signOutUser = () => {
    return request(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    });
};

const postRegistration = (name: string, email: string, password: string) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                'password': password,
                'name': name,
                'email': email
            })
    };
    return request<IUserResponse, IOptions>(`${apiUrl}/auth/register`, settings);
};

const getUserData = () => {
    return fetchWithRefresh<IUserResponse>(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        } as ICustomHeaders,
    });
};

const patchUserData = (password: string, name: string, email: string) => {
    return fetchWithRefresh<IUserResponse>(`${apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        } as ICustomHeaders,
        body: JSON.stringify({
            'password': password,
            'name': name,
            'email': email
        })
    });
};

const getOrder = (orderNumber: number) => {
    return request(`${apiUrl}/orders/${orderNumber}`);
};

export const api = {
    signInUser,
    signOutUser,
    postRegistration,
    getUserData,
    patchUserData,
    getOrder
};