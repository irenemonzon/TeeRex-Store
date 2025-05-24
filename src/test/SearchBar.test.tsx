import { render, screen, } from '@testing-library/react';
import SearchBar from '../components/SearchBar';


describe('SearchBar', () => {


  it('renders button when placeholder is search ', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

});
