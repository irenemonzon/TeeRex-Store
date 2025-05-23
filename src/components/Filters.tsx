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
    <div className="w-64 p-4 border rounded shadow-sm">
      {(Object.entries(filterOptions) as [keyof FilterValues, string[]][]).map(([category, options]) => (
        <div key={category} className="mb-4">
          <h4 className="font-bold capitalize mb-2">{category}</h4>
          {options.map((option) => (
            <div key={option} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={`${category}-${option}`}
                checked={filters[category]?.includes(option)}
                onChange={() => onFilterChange(category, option)}
                className="mr-2"
              />
              <label htmlFor={`${category}-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filters;