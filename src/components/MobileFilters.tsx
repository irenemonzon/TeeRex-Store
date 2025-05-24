import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import type { FilterValues } from '../types';
import Filters from './Filters';

interface MobileFiltersProps {
  filters: FilterValues;
  onFilterChange: (type: keyof FilterValues, value: string) => void;
}

const MobileFilters = ({ filters, onFilterChange }: MobileFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Filter size={20} />
        <span>Filters</span>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute left-0 top-0 h-full w-52 bg-white shadow-lg z-50 animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <Filters filters={filters} onFilterChange={onFilterChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilters; 