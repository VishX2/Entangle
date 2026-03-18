import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AdminLogin from './AdminLogin';
import authReducer from '../store/authSlice';

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { user: null, token: null, isLoading: false, error: null, registerLoading: false, registerError: null } },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
}

describe('AdminLogin', () => {
  it('renders login form', () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByPlaceholderText(/admin@entangle/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/secure password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders Entangle branding', () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByText('Entangle')).toBeInTheDocument();
  });

  it('renders sign up link', () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/register');
  });
});
