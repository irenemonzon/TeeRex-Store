import { render, screen } from '@testing-library/react';
import Filters from '../components/Filters';
import { useFilterStore } from '../store/filterStore';

describe('Filters', () => {
  it('should render filter labels exactly as specified', () => {
    const filters = useFilterStore.getState().filters;

    render(<Filters filters={filters} onFilterChange={() => {}} />);

    expect(screen.getByText(/color/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/price/i)).toBeInTheDocument();
    expect(screen.getByText(/type/i)).toBeInTheDocument();
  });
});