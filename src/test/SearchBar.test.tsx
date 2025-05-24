import { fireEvent, render, screen, } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { useFilterStore } from '../store/filterStore';


describe('SearchBar', () => {


   beforeEach(() => {
    useFilterStore.setState({
      searchQuery: '',
      searchSubmitted: ''
    });
  });

  it('Search box plaholder text should have search and classname ', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button.className).toMatch(/search-button-container/);
  });

  it('submits the search when pressing Enter', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'green polo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const { searchSubmitted } = useFilterStore.getState();
    expect(searchSubmitted).toBe('green polo');
  });

});
