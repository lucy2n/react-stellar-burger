import { api } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';
import { TUser } from '../../types/user';
import { AppThunk } from '../../hooks/hooks';
import { IUserResponse } from '../../types/api';
import { AppDispatch } from '../store';

export const setAuthChecked = createAction<boolean>('user/setAuthChecked');
export const setUser = createAction<TUser | null>('user/setUser');

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  api.getUserData()
  .then((res) => {
    if(res !== undefined) {
      dispatch(setUser(res.user));
      return res;
    }
  })
  .catch(err => {
    console.log(`Error: ${err.message}`);
    return err;
  });
};

export const login: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  api.signInUser(email, password).then((res) => {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  });
};

export const registerUser: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
  api.postRegistration(name, email, password).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
};

export const checkUserAuth: AppThunk = () => (dispatch: AppDispatch) => {
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


export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  return api.signOutUser().then(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(setUser(null));
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
};

export const uptadeUserData = (password: string, name: string, email: string) => (dispatch: AppDispatch) => {
  return api.patchUserData(password, name, email).then((res) => {
    if(res !== undefined ) {
      dispatch(setUser({
        email: res.user.email,
        name: res.user.name
      }));
    }
    return res;
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
 };