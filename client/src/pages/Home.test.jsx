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
    const logos = screen.getAllByAltText('Entangle Logo');
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0]).toHaveAttribute('src', '/logo.png');
  });

  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Connecting Startups & Investors with/i);
    expect(heading).toHaveTextContent(/AI Intelligence/i);
  });

  it('renders login and sign up links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Startup Login/i })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: /Investor Login/i })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: /Entrepreneur Login/i })).toHaveAttribute('href', '/login');
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
