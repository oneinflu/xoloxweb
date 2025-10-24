/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ApiKey, ApiKeyFilters, CreateApiKeyData } from '../shared/types/apiKey';
import ApiKeyHeader from './components/ApiKeyHeader';
import ApiKeyCard from './components/ApiKeyCard';
import CreateApiKeyModal from './components/CreateApiKeyModal';

// Mock data for API keys
const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'xolox_prod_1234567890abcdef1234567890abcdef12345678',
    description: 'Main production API key for web application',
    permissions: [
      { resource: 'users', actions: ['read', 'write'] },
      { resource: 'leads', actions: ['read', 'write', 'delete'] },
      { resource: 'templates', actions: ['read'] },
    ],
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    lastUsed: '2024-01-20T14:30:00Z',
    createdBy: 'John Doe',
    usageCount: 15420,
    rateLimit: {
      requests: 5000,
      period: 'hour',
    },
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'xolox_dev_abcdef1234567890abcdef1234567890abcdef12',
    description: 'Development environment API key',
    permissions: [
      { resource: 'users', actions: ['read'] },
      { resource: 'templates', actions: ['read', 'write'] },
    ],
    status: 'active',
    createdAt: '2024-01-10T09:00:00Z',
    lastUsed: '2024-01-19T16:45:00Z',
    createdBy: 'Jane Smith',
    usageCount: 2340,
    rateLimit: {
      requests: 1000,
      period: 'hour',
    },
  },
  {
    id: '3',
    name: 'Analytics Integration',
    key: 'xolox_analytics_fedcba0987654321fedcba0987654321fedcba09',
    description: 'API key for analytics dashboard integration',
    permissions: [
      { resource: 'analytics', actions: ['read'] },
      { resource: 'campaigns', actions: ['read'] },
    ],
    status: 'inactive',
    createdAt: '2024-01-05T11:30:00Z',
    createdBy: 'Mike Johnson',
    usageCount: 890,
    expiresAt: '2024-12-31T23:59:59Z',
  },
  {
    id: '4',
    name: 'Mobile App Key',
    key: 'xolox_mobile_567890abcdef1234567890abcdef1234567890ab',
    description: 'API key for mobile application',
    permissions: [
      { resource: 'users', actions: ['read', 'write'] },
      { resource: 'workflows', actions: ['read'] },
    ],
    status: 'expired',
    createdAt: '2023-12-01T08:00:00Z',
    lastUsed: '2023-12-31T23:59:59Z',
    expiresAt: '2023-12-31T23:59:59Z',
    createdBy: 'Sarah Wilson',
    usageCount: 45670,
    rateLimit: {
      requests: 2000,
      period: 'hour',
    },
  },
];

const ApiKeysPage: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [filteredKeys, setFilteredKeys] = useState<ApiKey[]>(mockApiKeys);
  const [filters, setFilters] = useState<ApiKeyFilters>({
    search: '',
    status: 'all',
    permission: '',
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter API keys based on current filters
  useEffect(() => {
    let filtered = apiKeys;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (key) =>
          key.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          key.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
          key.createdBy.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter((key) => key.status === filters.status);
    }

    // Permission filter
    if (filters.permission) {
      filtered = filtered.filter((key) =>
        key.permissions.some((perm) => perm.resource === filters.permission)
      );
    }

    setFilteredKeys(filtered);
  }, [apiKeys, filters]);

  const handleCreateApiKey = (data: CreateApiKeyData) => {
    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      ...data,
      key: `xolox_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: 'Current User',
      usageCount: 0,
    };

    setApiKeys([newApiKey, ...apiKeys]);
    setIsCreateModalOpen(false);
  };

  const handleEditApiKey = (apiKey: ApiKey) => {
    // TODO: Implement edit functionality
    console.log('Edit API key:', apiKey);
  };

  const handleDeleteApiKey = (apiKey: ApiKey) => {
    if (window.confirm(`Are you sure you want to delete "${apiKey.name}"?`)) {
      setApiKeys(apiKeys.filter((key) => key.id !== apiKey.id));
    }
  };

  const handleToggleStatus = (apiKey: ApiKey) => {
    const newStatus = apiKey.status === 'active' ? 'inactive' : 'active';
    setApiKeys(
      apiKeys.map((key) =>
        key.id === apiKey.id ? { ...key, status: newStatus } : key
      )
    );
  };

  const handleRefresh = () => {
    // TODO: Implement refresh functionality
    console.log('Refreshing API keys...');
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting API keys...');
  };

  const activeKeysCount = apiKeys.filter((key) => key.status === 'active').length;

  return (
    <div className="p-6">
      <ApiKeyHeader
        onCreateApiKey={() => setIsCreateModalOpen(true)}
        onRefresh={handleRefresh}
        onExport={handleExport}
        totalKeys={apiKeys.length}
        activeKeys={activeKeysCount}
      />

      {/* Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search API keys..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Permission
            </label>
            <select
              value={filters.permission}
              onChange={(e) => setFilters({ ...filters, permission: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Permissions</option>
              <option value="users">Users</option>
              <option value="leads">Leads</option>
              <option value="templates">Templates</option>
              <option value="workflows">Workflows</option>
              <option value="campaigns">Campaigns</option>
              <option value="analytics">Analytics</option>
              <option value="integrations">Integrations</option>
            </select>
          </div>
        </div>
      </div>

      {/* API Keys Grid */}
      {filteredKeys.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No API keys found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filters.search || filters.status !== 'all' || filters.permission
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by creating your first API key.'}
          </p>
          {!filters.search && filters.status === 'all' && !filters.permission && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create API Key
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredKeys.map((apiKey) => (
            <ApiKeyCard
              key={apiKey.id}
              apiKey={apiKey}
              onEdit={handleEditApiKey}
              onDelete={handleDeleteApiKey}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Create API Key Modal */}
      <CreateApiKeyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateApiKey}
      />
    </div>
  );
};

export default ApiKeysPage;