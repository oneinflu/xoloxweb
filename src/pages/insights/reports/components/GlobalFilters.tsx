import { useState } from 'react';
import { Filter, X } from 'react-feather';

interface GlobalFilter {
  type: string;
  value: string;
}

interface GlobalFiltersProps {
  filters: GlobalFilter[];
  onChange: (filters: GlobalFilter[]) => void;
  className?: string;
}

export default function GlobalFilters({ filters, onChange, className }: GlobalFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  

  const removeFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    onChange(newFilters);
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Filter className="w-4 h-4 mr-1" />
          Add Filter
        </button>

        {filters.map((filter, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            {filter.type}: {filter.value}
            <button
              onClick={() => removeFilter(index)}
              className="ml-1 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Add filter selection dropdown implementation */}
    </div>
  );
}