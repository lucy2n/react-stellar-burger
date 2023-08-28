import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { setUser, setAuthChecked } from './slice';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    const res = await api.getUserData();
    dispatch(setUser(res.user));
    return res;
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
    if (localStorage.getItem('accessToken')) {
      try {
        await dispatch(getUser());
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null));
      } 
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