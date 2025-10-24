import { Calendar, Upload, RefreshCw } from 'react-feather';

interface QuickActionsProps {
  onSync: () => void;
}

export default function QuickActions({ onSync }: QuickActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        title="Schedule Report"
      >
        <Calendar className="w-4 h-4" />
      </button>
      <button
        className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        title="Upload CSV"
      >
        <Upload className="w-4 h-4" />
      </button>
      <button
        onClick={onSync}
        className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        title="Sync Data"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
}