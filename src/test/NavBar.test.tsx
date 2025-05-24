import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/NavBar';

describe('Navbar', () => {
  it('renders the cart link as an anchor tag with href="/cart"', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(cartLink.tagName).toBe('A');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});
