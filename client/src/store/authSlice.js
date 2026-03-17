import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authApi';
import config from '../config';

const loadUser = () => {
  try {
    const u = localStorage.getItem(config.userKey);
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadUser(),
    token: localStorage.getItem(config.tokenKey),
    isLoading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
      if (payload.token) localStorage.setItem(config.tokenKey, payload.token);
      if (payload.user) localStorage.setItem(config.userKey, JSON.stringify(payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem(config.tokenKey);
      localStorage.removeItem(config.userKey);
    },
    clearError: (state) => {
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.error = null;
        if (payload.token) localStorage.setItem(config.tokenKey, payload.token);
        if (payload.user) localStorage.setItem(config.userKey, JSON.stringify(payload.user));
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.error = null;
        if (payload.token) localStorage.setItem(config.tokenKey, payload.token);
        if (payload.user) localStorage.setItem(config.userKey, JSON.stringify(payload.user));
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Registration failed';
      });
  },
});

export const { setCredentials, logout, clearError, setError } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => !!state.auth.token;
