import { describe, it, expect, vi, beforeEach } from 'vitest';
import authReducer, { setCredentials, logout, clearError } from './authSlice';

describe('authSlice', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it('has correct initial state shape', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('token');
    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('error');
  });

  it('setCredentials updates user and token', () => {
    const initialState = { user: null, token: null, isLoading: false, error: null };
    const action = setCredentials({
      user: { id: 1, email: 'test@test.com' },
      token: 'jwt-token-123',
    });
    const state = authReducer(initialState, action);
    expect(state.user).toEqual({ id: 1, email: 'test@test.com' });
    expect(state.token).toBe('jwt-token-123');
    expect(state.error).toBeNull();
  });

  it('logout clears user and token', () => {
    const initialState = {
      user: { id: 1 },
      token: 'jwt',
      isLoading: false,
      error: null,
    };
    const state = authReducer(initialState, logout());
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.error).toBeNull();
  });

  it('clearError sets error to null', () => {
    const initialState = { user: null, token: null, isLoading: false, error: 'Some error' };
    const state = authReducer(initialState, clearError());
    expect(state.error).toBeNull();
  });
});
