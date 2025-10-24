/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ChevronDown, Grid, List, ArrowUpDown } from 'lucide-react';
import { Integration, IntegrationFilters, Environment } from '../types/integration';
import IntegrationCard from './IntegrationCard';

interface IntegrationsListProps {
  integrations: Integration[];
  filters: IntegrationFilters;
  onFiltersChange: (filters: Partial<IntegrationFilters>) => void;
  onConfigure: (id: string) => void;
  onTest: (id: string) => void;
  onViewLogs: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
  onViewUsage: (id: string) => void;
  onEnvironmentChange: (id: string, environment: Environment) => void;
  onBulkAction: (action: string, ids: string[]) => void;
}

const IntegrationsList: React.FC<IntegrationsListProps> = ({
  integrations,
  filters,
  onFiltersChange,
  onConfigure,
  onTest,
  onViewLogs,
  onToggleStatus,
  onDuplicate,
  onRemove,
  onViewUsage,
  onEnvironmentChange,
  onBulkAction
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(integrations.map(i => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedIntegrations = [...integrations].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Integration];
    let bValue: any = b[sortBy as keyof Integration];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <div className="bg-white">
      {/* Filters and Controls */}
      <div className="border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left Side - Additional Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={filters.status || ''}
                onChange={(e) => onFiltersChange({ status: e.target.value as any || undefined })}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
              >
                <option value="">All Status</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
                <option value="unconfigured">Unconfigured</option>
                <option value="error">Error</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Environment Filter */}
            <div className="relative">
              <select
                value={filters.environment || ''}
                onChange={(e) => onFiltersChange({ environment: e.target.value as Environment || undefined })}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
              >
                <option value="">All Environments</option>
                <option value="test">Test</option>
                <option value="production">Production</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="lastActivity-desc">Recently Active</option>
                <option value="lastActivity-asc">Least Active</option>
                <option value="usageCount-desc">Most Used</option>
                <option value="usageCount-asc">Least Used</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Right Side - Bulk Actions and View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedIds.length} selected
                </span>
                <div className="relative">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        onBulkAction(e.target.value, selectedIds);
                        setSelectedIds([]);
                        e.target.value = '';
                      }
                    }}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Bulk Actions</option>
                    <option value="enable">Enable</option>
                    <option value="disable">Disable</option>
                    <option value="test">Test</option>
                    <option value="duplicate">Duplicate</option>
                    <option value="remove">Remove</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header (List View Only) */}
      {viewMode === 'list' && (
        <div className="border-b border-gray-200 px-3 sm:px-4 py-3 bg-gray-50">
          <div className="flex items-center space-x-3 sm:space-x-4 text-sm font-medium text-gray-700">
            <div className="w-4 flex-shrink-0">
              <input
                type="checkbox"
                checked={selectedIds.length === integrations.length && integrations.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="w-98 min-w-0 flex-shrink-0">
              <button
                onClick={() => handleSort('name')}
                className="flex items-center space-x-1 hover:text-gray-900"
              >
                <span>Integration</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="hidden sm:block flex-shrink-0 w-20">Category</div>
            <div className="hidden md:block flex-shrink-0 w-20">Environment</div>
            <div className="hidden lg:block flex-shrink-0 w-20">Status</div>
            <div className="hidden xl:block flex-shrink-0 w-24">Owner</div>
            <div className="hidden xl:block flex-shrink-0 w-24">Last Activity</div>
            <div className="hidden xl:block flex-shrink-0 w-20">Usage</div>
            <div className="flex-shrink-0 w-20">Actions</div>
          </div>
        </div>
      )}

      {/* Integrations List/Grid */}
      <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-2'}`}>
        {sortedIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConfigure={onConfigure}
            onTest={onTest}
            onViewLogs={onViewLogs}
            onToggleStatus={onToggleStatus}
            onDuplicate={onDuplicate}
            onRemove={onRemove}
            onViewUsage={onViewUsage}
            onEnvironmentChange={onEnvironmentChange}
            isSelected={selectedIds.includes(integration.id)}
            onSelect={handleSelectItem}
          />
        ))}
      </div>

      {/* Empty State */}
      {integrations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Grid className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
          <p className="text-gray-600 mb-4">
            {filters.search || filters.category !== 'all' || filters.filterChip !== 'all'
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by adding your first integration.'}
          </p>
        </div>
      )}
    </div>
    </div>

  );
};

export default IntegrationsList;