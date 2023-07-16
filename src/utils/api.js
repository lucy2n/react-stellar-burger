import { apiUrl } from "./constants"

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
    return fetch(`${apiUrl}/ingredients`)
    .then(checkReponse)
}

export const refreshToken = () => {
    return fetch(`${apiUrl}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkReponse);
};

const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); 
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkReponse(res);
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
            "password": password,
            "token": token
        })
    };
    return fetch(`${apiUrl}/password-reset/reset`, settings)
    .then(checkReponse)
    .catch(err => {
        console.log(`Error: ${err}`)
    })
} 

export const forgotPassword = (email) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email })
    };
    return fetch(`${apiUrl}/password-reset`, settings)
    .then(checkReponse)
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

//Функции для userReducer
const signInUser = (email, password) => {
    return fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                "password": password,
                "email": email
            })
    }).then(checkReponse)
}

const signOutUser = () => {
    return fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    }).then(checkReponse)
}

const postRegistration = (name, email, password) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                "password": password,
                "name": name,
                "email": email
            })
    };
    return fetch(`${apiUrl}/auth/register`, settings)
    .then(checkReponse)
} 

const getUserData = () => {
    return fetchWithRefresh(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
    })
}

const patchUserData = (password, name, email) => {
    return fetchWithRefresh(`${apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            "password": password,
            "name": name,
            "email": email
        })
    })
}

export const api = {
    signInUser,
    signOutUser,
    postRegistration,
    getUserData,
    patchUserData
}