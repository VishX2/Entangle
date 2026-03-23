import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin, registerUser } from './adminApi';
import config from '../config';

const loadUser = () => {
  try {
    const u = localStorage.getItem(config.userKey);
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};

// Create authentication slice
const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: loadUser(),
    token: localStorage.getItem(config.tokenKey),
    isLoading: false,
    error: null,
    registerLoading: false,
    registerError: null,
  },

  // Reducers for synchronous state updates
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
    clearRegisterError: (state) => {
      state.registerError = null;
    },
    setUser: (state, { payload }) => {
      if (payload && state.user) {
        state.user = { ...state.user, ...payload };
        try {
          localStorage.setItem(config.userKey, JSON.stringify(state.user));
        } catch (_) {}
      }
    },
  },

  // Handle async API calls (login & registration)
  extraReducers: (builder) => {
    builder

      // ===Admin Login===
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.error = null;
        if (payload.token) localStorage.setItem(config.tokenKey, payload.token);
        if (payload.user) localStorage.setItem(config.userKey, JSON.stringify(payload.user));
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Login failed';
      })

      // ===User Registration===
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.registerLoading = false;
        state.registerError = payload || 'Registration failed';
      });
  },
});

// Export reducer actions
export const { setCredentials, logout, setUser, setLoading, setError, clearError, clearRegisterError } = authSlice.actions;
export default authSlice.reducer;

// Selectors to access authentication state
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectRegisterLoading = (state) => state.auth.registerLoading;
export const selectRegisterError = (state) => state.auth.registerError;
export const selectIsAdmin = (state) => Number(state.auth.user?.role_id) === 1;
