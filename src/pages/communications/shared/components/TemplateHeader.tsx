import { useState } from 'react';
import { Search, Filter, Plus, Zap, MoreVertical, Download, Upload, FileText } from 'react-feather';
import { TemplateFilters } from '../types/template';

interface TemplateHeaderProps {
  title: string;
  breadcrumb: string[];
  filters: TemplateFilters;
  onFiltersChange: (filters: TemplateFilters) => void;
  onCreateTemplate: () => void;
  onAIGenerate: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onViewLogs?: () => void;
}

export default function TemplateHeader({
  title,
  breadcrumb,
  filters,
  onFiltersChange,
  onCreateTemplate,
  onAIGenerate,
  onImport,
  onExport,
  onViewLogs
}: TemplateHeaderProps) {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="px-6 py-4">
        {/* Title and Breadcrumb */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            {breadcrumb.map((item, index) => (
              <span key={index}>
                {index > 0 && <span className="mx-2">/</span>}
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Side - Search and Filters */}
          <div className="flex items-center gap-3 flex-1">
            {/* Global Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, subject, tags..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.search || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Filters Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-20">
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        value={filters.type || ''}
                        onChange={(e) => onFiltersChange({ ...filters, type: e.target.value || undefined })}
                      >
                        <option value="">All Types</option>
                        <option value="welcome">Welcome</option>
                        <option value="promotional">Promotional</option>
                        <option value="transactional">Transactional</option>
                        <option value="newsletter">Newsletter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Usage
                      </label>
                      <select
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        value={filters.usage || ''}
                        onChange={(e) => onFiltersChange({ ...filters, usage: e.target.value || undefined })}
                      >
                        <option value="">All Usage</option>
                        <option value="high">High (100+)</option>
                        <option value="medium">Medium (10-99)</option>
                        <option value="low">Low (1-9)</option>
                        <option value="unused">Unused (0)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        value={filters.status || ''}
                        onChange={(e) => onFiltersChange({ ...filters, status: e.target.value || undefined })}
                      >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          onFiltersChange({});
                          setShowFilters(false);
                        }}
                        className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex items-center gap-3">
            {/* AI Generate Button */}
            <button
              onClick={onAIGenerate}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              AI Generate
            </button>

            {/* Create Template Button */}
            <button
              onClick={onCreateTemplate}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </button>

            {/* Quick Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="flex items-center px-3 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showQuickActions && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-20">
                  <div className="py-2">
                    {onImport && (
                      <button
                        onClick={() => {
                          onImport();
                          setShowQuickActions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-3" />
                        Import Templates
                      </button>
                    )}
                    {onExport && (
                      <button
                        onClick={() => {
                          onExport();
                          setShowQuickActions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Download className="w-4 h-4 mr-3" />
                        Export Templates
                      </button>
                    )}
                    {onViewLogs && (
                      <button
                        onClick={() => {
                          onViewLogs();
                          setShowQuickActions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-3" />
                        View Logs
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.type && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                Type: {filters.type}
                <button
                  onClick={() => onFiltersChange({ ...filters, type: undefined })}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  ×
                </button>
              </span>
            )}
            {filters.usage && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                Usage: {filters.usage}
                <button
                  onClick={() => onFiltersChange({ ...filters, usage: undefined })}
                  className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                >
                  ×
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                Status: {filters.status}
                <button
                  onClick={() => onFiltersChange({ ...filters, status: undefined })}
                  className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}