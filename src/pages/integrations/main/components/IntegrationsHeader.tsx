import React from 'react';
import { Search, Plus, Store, AlertCircle } from 'lucide-react';
import { FilterChip, UserPermission } from '../types/integration';

interface IntegrationsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilterChip: FilterChip;
  onFilterChipChange: (chip: FilterChip) => void;
  onCreateIntegration: () => void;
  onOpenCatalog: () => void;
  userPermission: UserPermission;
  stats: {
    total: number;
    installed: number;
    unconfigured: number;
    errors: number;
  };
}

const IntegrationsHeader: React.FC<IntegrationsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeFilterChip,
  onFilterChipChange,
  onCreateIntegration,
  onOpenCatalog,
  userPermission,
  stats
}) => {
  const filterChips: { id: FilterChip; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: stats.total },
    { id: 'installed', label: 'Installed', count: stats.installed },
    { id: 'unconfigured', label: 'Unconfigured', count: stats.unconfigured },
    { id: 'errors', label: 'Errors', count: stats.errors },
  ];

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4">
        {/* Page Title and Breadcrumb */}
        <div className="mb-4">
          <nav className="text-sm text-gray-500 mb-2">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Integrations</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
              <p className="text-gray-600 mt-1">
                Manage your integrations and connect with external services
              </p>
            </div>
            
            {/* User Permission Indicator */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{userPermission.role.replace('-', ' ').toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Side - Search and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            {/* Global Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search connectors, docs, integrations..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {filterChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => onFilterChipChange(chip.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeFilterChip === chip.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {chip.label}
                  <span className="ml-1 text-xs">({chip.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCatalog}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Marketplace</span>
            </button>

            <div className="relative">
              <button
                onClick={onCreateIntegration}
                disabled={!userPermission.canCreate}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  userPermission.canCreate
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title={!userPermission.canCreate ? 'Contact super admin' : ''}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Integration</span>
              </button>
              
              {!userPermission.canCreate && (
                <div className="absolute -top-2 -right-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsHeader;