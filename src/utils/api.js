import { apiUrl } from './constants';

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


export const request = (url, options) => {
    return fetch(url, options).then(checkResponse);
};


export const refreshToken = () => {
    return fetch(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken(); 
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const resetPassword = (password, token) => {
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

export const forgotPassword = (email) => {
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
const signInUser = (email, password) => {
    return request(`${apiUrl}/auth/login`, {
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

const postRegistration = (name, email, password) => {
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
    return request(`${apiUrl}/auth/register`, settings);
};

const getUserData = () => {
    return fetchWithRefresh(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
    });
};

const patchUserData = (password, name, email) => {
    return fetchWithRefresh(`${apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            'password': password,
            'name': name,
            'email': email
        })
    });
};

const getOrder = (orderNumber) => {
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