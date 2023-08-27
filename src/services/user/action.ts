import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { setUser, setAuthChecked } from './slice';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    try {
      const res = await api.getUserData();
      dispatch(setUser(res.user));
      console.log('Res -> ', res);
      return res;
    } catch (err) {
      console.log('Err -> ', err);
      throw err;
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: {email: string, password: string }, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.signInUser(data.email, data.password);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
      return res.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: {email: string, password: string, name: string}, {dispatch}) => {
    const res = await api.postRegistration(data.name, data.email, data.password);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, {dispatch}) => {
    console.log('я здесь ', localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken')) {
      console.log('теперь я здесь');
      try {
        const res = await dispatch(getUser());
        console.log('RES -> ', res);
      } catch (err) {
        console.log('checkUserAuth catch');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null));
      } 
      console.log('Auth will be checked');
      dispatch(setAuthChecked(true));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, {dispatch}) => {
    try {
      await api.signOutUser();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
);

export const uptadeUserData = createAsyncThunk(
  'user/update',
  async (data: {password: string, name: string, email: string}, {dispatch}) => {
    const res = await api.patchUserData(data.password, data.name, data.email);
    dispatch(setUser({
      email: res.user.email,
      name: res.user.name
    }));
  }
);