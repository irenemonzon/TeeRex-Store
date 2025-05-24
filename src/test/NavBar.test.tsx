import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/NavBar';

describe('Navbar', () => {
  it('Cart link should be navigable by href="/cart" and be an anchor tag', () => {
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
