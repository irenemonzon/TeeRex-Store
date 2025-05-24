import { create } from 'zustand';
import type { FilterValues } from '../types';

interface FilterStore {
  filters: FilterValues;
  searchQuery: string;
  searchSubmitted: string;
  setFilters: (filters: FilterValues) => void;
  setSearchQuery: (query: string) => void;
  setSearchSubmitted: (query: string) => void;
  resetFilters: () => void;
}

const initialFilters: FilterValues = {
  color: [],
  gender: [],
  price: [],
  type: [],
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: initialFilters,
  searchQuery: '',
  searchSubmitted: '',
  setFilters: (filters) => set({ filters }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchSubmitted: (query) => set({ searchSubmitted: query }),
  resetFilters: () => set(
    { 
        filters: initialFilters, 
        searchQuery: '' ,
        searchSubmitted:''
    }
),
}));
