/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { CreateApiKeyData, ApiKeyPermission } from '../../shared/types/apiKey';
import { CloseIcon } from '../../../../icons';

interface CreateApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateApiKeyData) => void;
}

const CreateApiKeyModal: React.FC<CreateApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CreateApiKeyData>({
    name: '',
    description: '',
    permissions: [],
    expiresAt: '',
    rateLimit: {
      requests: 1000,
      period: 'hour' as const,
    },
  });

  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: string[];
  }>({});

  const availableResources = [
    'users',
    'leads',
    'templates',
    'workflows',
    'campaigns',
    'analytics',
    'integrations',
  ];

  const availableActions = ['read', 'write', 'delete'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const permissions: ApiKeyPermission[] = Object.entries(selectedPermissions)
      .filter(([_, actions]) => actions.length > 0)
      .map(([resource, actions]) => ({
        resource,
        actions: actions as ('read' | 'write' | 'delete')[],
      }));

    onSubmit({
      ...formData,
      permissions,
    });

    // Reset form
    setFormData({
      name: '',
      description: '',
      permissions: [],
      expiresAt: '',
      rateLimit: {
        requests: 1000,
        period: 'hour',
      },
    });
    setSelectedPermissions({});
  };

  const handlePermissionChange = (resource: string, action: string, checked: boolean) => {
    setSelectedPermissions(prev => {
      const current = prev[resource] || [];
      if (checked) {
        return {
          ...prev,
          [resource]: [...current, action],
        };
      } else {
        return {
          ...prev,
          [resource]: current.filter(a => a !== action),
        };
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New API Key
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter API key name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter description (optional)"
              />
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Permissions
              </label>
              <div className="space-y-4">
                {availableResources.map(resource => (
                  <div key={resource} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 capitalize">
                      {resource}
                    </h4>
                    <div className="flex gap-4">
                      {availableActions.map(action => (
                        <label key={action} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedPermissions[resource]?.includes(action) || false}
                            onChange={(e) => handlePermissionChange(resource, action, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {action}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiration Date (Optional)
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Rate Limiting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Rate Limiting
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Requests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.rateLimit?.requests || 1000}
                    onChange={(e) => setFormData({
                      ...formData,
                      rateLimit: {
                        ...formData.rateLimit!,
                        requests: parseInt(e.target.value),
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Period
                  </label>
                  <select
                    value={formData.rateLimit?.period || 'hour'}
                    onChange={(e) => setFormData({
                      ...formData,
                      rateLimit: {
                        ...formData.rateLimit!,
                        period: e.target.value as 'minute' | 'hour' | 'day',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="minute">Per Minute</option>
                    <option value="hour">Per Hour</option>
                    <option value="day">Per Day</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApiKeyModal;