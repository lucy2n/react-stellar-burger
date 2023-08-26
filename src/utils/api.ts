import { apiUrl } from './constants';
import { IResponse, ICustomHeaders, IError, IOptions, IUserResponse, IOrdersResponse } from '../types/api';

export const checkResponse = async <T extends Response>(res: T): Promise<T> => {
    return res.ok ? res.json() : Promise.reject(res.status);
};

export const request = async <T extends Response, U extends RequestInit>(url: string, options: U | object = {}): Promise<T> => {
    const res = (await fetch(url, options) as T);
    return await checkResponse<T>(res);
};

export const refreshToken = async () => {
    return await request<IResponse, IOptions>(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });
};

export const fetchWithRefresh = async <T extends IResponse> (url: string, options: IOptions): Promise<T> => {
    try {
        return await request<T, IOptions>(url, options);
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

export const resetPassword = async (password: string, token: string) => {
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
    return await request(`${apiUrl}/password-reset/reset`, settings);
};

export const forgotPassword = async (email: string) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'email': email })
    };
    return await request(`${apiUrl}/password-reset`, settings);
};

//Функции для userReducer
const signInUser = async (email: string, password: string) => {
    return await request<IUserResponse, IOptions>(`${apiUrl}/auth/login`, {
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

const signOutUser = async () => {
    return await request(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    });
};

const postRegistration = async (name: string, email: string, password: string) => {
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
    return await request<IUserResponse, IOptions>(`${apiUrl}/auth/register`, settings);
};

const getUserData = async () => {
    return await fetchWithRefresh<IUserResponse>(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        } as ICustomHeaders,
    });
};

const patchUserData = async (password: string, name: string, email: string) => {
    return await fetchWithRefresh<IUserResponse>(`${apiUrl}/auth/user`, {
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

const getOrder = async (orderNumber: string) => {
    return await request<IOrdersResponse, IOptions>(`${apiUrl}/orders/${orderNumber}`);
};

export const api = {
    signInUser,
    signOutUser,
    postRegistration,
    getUserData,
    patchUserData,
    getOrder
};