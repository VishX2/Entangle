import { describe, it, expect, vi, beforeEach } from 'vitest';
import authReducer, { setCredentials, logout, clearError } from './authSlice';

describe('authSlice (admin)', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  // Test initial state structure
  it('has correct initial state shape', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('token');
    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('error');
  });

  // Test setting credentials (login success)
  it('setCredentials updates user and token', () => {
    const initialState = { user: null, token: null, isLoading: false, error: null, registerLoading: false, registerError: null };
    const action = setCredentials({
      user: { id: 1, email: 'admin@test.com' },
      token: 'admin-jwt-token',
    });
    const state = authReducer(initialState, action);

    // Check if user and token are updated correctly
    expect(state.user).toEqual({ id: 1, email: 'admin@test.com' });
    expect(state.token).toBe('admin-jwt-token');

    expect(state.error).toBeNull();
  });

  // Test logout functionality
  it('logout clears user and token', () => {
    const initialState = {
      user: { id: 1 },
      token: 'jwt',
      isLoading: false,
      error: null,
      registerLoading: false,
      registerError: null,
    };
    const state = authReducer(initialState, logout());

    // Ensure user and token are removed
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.error).toBeNull();
  });

  // Test clearing error state
  it('clearError sets error to null', () => {
    const initialState = { user: null, token: null, isLoading: false, error: 'Login failed', registerLoading: false, registerError: null };
    const state = authReducer(initialState, clearError());
    expect(state.error).toBeNull();
  });
});
