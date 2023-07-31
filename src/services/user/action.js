import { api } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';

export const setAuthChecked = createAction('user/setAuthChecked');
export const setUser = createAction('user/setUser');


export const getUser = () => {
  return (dispatch) => {
    return api.getUserData().then((res) => {
      dispatch(setUser(res.user));
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return api.signInUser(email, password).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const registerUser = (email, password, name) => {
    return (dispatch) => {
        return api.postRegistration(name, email, password).then((res) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(setUser(res.user));
            dispatch(setAuthChecked(true));
        })
        .catch(err => {
          console.log(`Error: ${err}`);
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('refreshToken');
                  dispatch(setUser(null));
               })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = () => {
  return (dispatch) => {
    return api.signOutUser().then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
  };
};

export const uptadeUserData = (password, name, email) => {
  return (dispatch) => {
    return api.patchUserData(password, name, email).then((res) => {
      dispatch(setUser({
        email: res.user.email,
        name: res.user.name
      }));
      return res;
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
  };
};