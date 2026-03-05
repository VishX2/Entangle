import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin, registerUser } from './adminApi';

const loadUser = () => {
  try {
    const u = localStorage.getItem('entangle_admin_user');
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadUser(),
    token: localStorage.getItem('entangle_admin_token'),
    isLoading: false,
    error: null,
    registerLoading: false,
    registerError: null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
      if (payload.token) localStorage.setItem('entangle_admin_token', payload.token);
      if (payload.user) localStorage.setItem('entangle_admin_user', JSON.stringify(payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('entangle_admin_token');
      localStorage.removeItem('entangle_admin_user');
    },
    clearError: (state) => {
      state.error = null;
    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.error = null;
        if (payload.token) localStorage.setItem('entangle_admin_token', payload.token);
        if (payload.user) localStorage.setItem('entangle_admin_user', JSON.stringify(payload.user));
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Login failed';
      })
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

export const { setCredentials, logout, setLoading, setError, clearError, clearRegisterError } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectRegisterLoading = (state) => state.auth.registerLoading;
export const selectRegisterError = (state) => state.auth.registerError;
export const selectIsAdmin = (state) => Number(state.auth.user?.role_id) === 1;
