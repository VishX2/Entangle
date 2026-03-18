import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

export const loginUser = createAsyncThunk('auth/login', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', body);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', body);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/reset-password', body);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});
