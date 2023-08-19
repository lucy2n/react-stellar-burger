import { api } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { TUser } from '../../types/user';

export const setAuthChecked = createAction<boolean>('user/setAuthChecked');
export const setUser = createAction<TUser | null>('user/setUser');


export const getUser = () => {
  return (dispatch: AppDispatch) => {
    return api.getUserData().then((res) => {
      dispatch(setUser(res.user));
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
  };
};

export const login = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    return api.signInUser(email, password).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const registerUser = (email: string, password: string, name: string) => {
    return (dispatch: AppDispatch) => {
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
    return (dispatch: AppDispatch) => {
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
  return (dispatch: AppDispatch) => {
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

export const uptadeUserData = (password: string, name: string, email: string) => {
  return (dispatch: AppDispatch) => {
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