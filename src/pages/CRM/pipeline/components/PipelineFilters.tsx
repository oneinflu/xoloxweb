import React from 'react';
import { 
  Search, 
  X, 
  ChevronDown,
  Users,
  ArrowUpDown,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { PipelineFilters, SortOption } from '../types/pipeline';

interface PipelineFiltersProps {
  filters: PipelineFilters;
  sortBy: SortOption;
  autoRefresh: boolean;
  onFiltersChange: (filters: Partial<PipelineFilters>) => void;
  onSortChange: (sort: SortOption) => void;
  onAutoRefreshToggle: () => void;
  onClearFilters: () => void;
  onShowAdvancedFilters: () => void;
}

export const PipelineFiltersComponent: React.FC<PipelineFiltersProps> = ({
  filters,
  sortBy,
  autoRefresh,
  onFiltersChange,
  onSortChange,
  onAutoRefreshToggle,
  onClearFilters,
  onShowAdvancedFilters
}) => {
  const hasActiveFilters = filters.search || 
    filters.stages.length > 0 || 
    filters.owners.length > 0 || 
    filters.sources.length > 0 || 
    filters.tags.length > 0;

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'score', label: 'Lead Score' },
    { value: 'value', label: 'Deal Value' },
    { value: 'updated', label: 'Last Updated' },
    { value: 'created', label: 'Date Added' },
    { value: 'name', label: 'Name' }
  ];

  const segments = [
    { id: 'all', name: 'All Leads' },
    { id: 'my-leads', name: 'My Leads' },
    { id: 'high-intent', name: 'High Intent Leads' },
    { id: 'hot-leads', name: 'Hot Leads' },
    { id: 'overdue', name: 'Overdue Follow-ups' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between space-x-4">
        {/* Left Side - Search and Filters */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads by name, email, phone..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Segment Selector */}
          <div className="relative">
            <select 
              value={filters.segment || 'all'}
              onChange={(e) => onFiltersChange({ segment: e.target.value })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {segments.map(segment => (
                <option key={segment.id} value={segment.id}>
                  {segment.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              {filters.stages.length > 0 && (
                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <span>Stages: {filters.stages.length}</span>
                  <button
                    onClick={() => onFiltersChange({ stages: [] })}
                    className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.owners.length > 0 && (
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>Owners: {filters.owners.length}</span>
                  <button
                    onClick={() => onFiltersChange({ owners: [] })}
                    className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {filters.tags.length > 0 && (
                <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  <span>Tags: {filters.tags.length}</span>
                  <button
                    onClick={() => onFiltersChange({ tags: [] })}
                    className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              <button
                onClick={onClearFilters}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Bulk Actions */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Bulk Actions</option>
              <option value="assign">Assign Owner</option>
              <option value="stage">Change Stage</option>
              <option value="tag">Add Tag</option>
              <option value="email">Send Email</option>
              <option value="delete">Delete</option>
            </select>
            <Users className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Auto Refresh Toggle */}
          <button
            onClick={onAutoRefreshToggle}
            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900"
          >
            {autoRefresh ? (
              <ToggleRight className="h-5 w-5 text-blue-600" />
            ) : (
              <ToggleLeft className="h-5 w-5 text-gray-400" />
            )}
            <span>Auto-refresh</span>
          </button>

          {/* Advanced Filters Button */}
          <button
            onClick={onShowAdvancedFilters}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Advanced Filters
          </button>
        </div>
      </div>
    </div>
  );
};