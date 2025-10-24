
import { useState } from 'react';
import { Calendar } from 'react-feather';

interface DateRange {
  start: Date;
  end: Date;
  timezone: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export default function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (newRange: DateRange) => {
    onChange(newRange);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
      >
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          {value.start.toLocaleDateString()} - {value.end.toLocaleDateString()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <button
              onClick={() => handleDateChange({
                start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                end: new Date(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
              })}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Last 7 days
            </button>
            <button
              onClick={() => handleDateChange({
                start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                end: new Date(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
              })}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Last 30 days
            </button>
            <button
              onClick={() => handleDateChange({
                start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                end: new Date(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
              })}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Last 90 days
            </button>
          </div>
        </div>
      )}
    </div>
  );
}