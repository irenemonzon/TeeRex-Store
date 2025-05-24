import type { KeyboardEvent } from 'react';
import { useFilterStore } from '../store/filterStore';

const SearchBar = () => {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const setSearchSubmitted = useFilterStore((state) => state.setSearchSubmitted);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      setSearchSubmitted(trimmed);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const trimmed = searchQuery.trim();
    if (e.key === 'Enter' && trimmed) {
      setSearchSubmitted(trimmed);
    }
  };

    const handleChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === '') {
      setSearchSubmitted('');
    }
  };

  return (
    <div className="w-full max-w-xl flex gap-2">
      <input
        type="text"
        value={searchQuery}
        placeholder="Search products by name, color, or type (e.g. green polo)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div>
        <button
          onClick={handleSearch}
          className="search-button-container px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          disabled={!searchQuery.trim()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar; 