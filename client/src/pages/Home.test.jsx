import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  it('renders logo', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Entangle');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/favicon.png');
  });

  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Connect/);
    expect(heading).toHaveTextContent(/Verify/);
    expect(heading).toHaveTextContent(/Invest/);
  });

  it('renders login and sign up links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/select-type');
  });

  it('renders Get Started button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
  });
});
