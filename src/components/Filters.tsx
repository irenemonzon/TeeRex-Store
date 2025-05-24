import type { FilterValues } from "../types";


interface FiltersProps {
  filters: FilterValues;
  onFilterChange: (type: keyof FilterValues, value: string) => void;
}

const filterOptions = {
  color: ['Red', 'Blue', 'Green'],
  gender: ['Men', 'Women'],
  price: ['0-250', '251-450', '450+'],
  type: ['Polo', 'Hoodie', 'Basic'],
};

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  return (
    <div className="w-full md:w-64 ">
      {(Object.entries(filterOptions) as [keyof FilterValues, string[]][]).map(([category, options]) => (
        <div key={category} className="mb-6">
          <h4 className="font-bold capitalize mb-3 text-gray-800">{category}</h4>
          {options.map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`${category}-${option}`}
                checked={filters[category]?.includes(option)}
                onChange={() => onFilterChange(category, option)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label 
                htmlFor={`${category}-${option}`}
                className="ml-2 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filters;