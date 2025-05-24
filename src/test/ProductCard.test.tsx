import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Green Polo',
    price: 299,
    currency: 'INR',
    imageURL: 'https://example.com/image.jpg',
    color: 'Green',
    gender: 'Men',
    type: 'Polo',
    quantity: 10,
  };

  it('should render product image, name, and price', () => {
    render(<ProductCard product={mockProduct} />);

    
    expect(screen.getByText(/green polo/i)).toBeInTheDocument();

   expect(screen.getByText(/₹\s?299/i)).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /green polo/i });
    expect(image).toHaveAttribute('src', mockProduct.imageURL);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });
});
