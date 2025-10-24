import React, { useState } from 'react';
import { ApiKey } from '../../shared/types/apiKey';
import { CopyIcon, EyeIcon, EyeCloseIcon, PencilIcon } from '../../../../icons';
import { Trash } from 'lucide-react';

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (apiKey: ApiKey) => void;
  onToggleStatus: (apiKey: ApiKey) => void;
}

const ApiKeyCard: React.FC<ApiKeyCardProps> = ({
  apiKey,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy API key:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const maskedKey = `${apiKey.key.substring(0, 8)}${'*'.repeat(24)}${apiKey.key.substring(-4)}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {apiKey.name}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                apiKey.status
              )}`}
            >
              {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
            </span>
          </div>
          {apiKey.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {apiKey.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(apiKey)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Edit API Key"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(apiKey)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete API Key"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* API Key Display */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          API Key
        </label>
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
          <code className="flex-1 text-sm font-mono text-gray-900 dark:text-gray-100">
            {showKey ? apiKey.key : maskedKey}
          </code>
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title={showKey ? 'Hide API Key' : 'Show API Key'}
          >
            {showKey ? (
              <EyeCloseIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleCopyKey}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Copy API Key"
          >
            <CopyIcon className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            API key copied to clipboard!
          </p>
        )}
      </div>

      {/* Permissions */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Permissions
        </label>
        <div className="flex flex-wrap gap-2">
          {apiKey.permissions.map((permission, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
            >
              {permission.resource}: {permission.actions.join(', ')}
            </span>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-medium">Created:</span> {formatDate(apiKey.createdAt)}
        </div>
        <div>
          <span className="font-medium">Usage:</span> {apiKey.usageCount.toLocaleString()} requests
        </div>
        {apiKey.lastUsed && (
          <div>
            <span className="font-medium">Last Used:</span> {formatDate(apiKey.lastUsed)}
          </div>
        )}
        {apiKey.expiresAt && (
          <div>
            <span className="font-medium">Expires:</span> {formatDate(apiKey.expiresAt)}
          </div>
        )}
      </div>

      {/* Rate Limit */}
      {apiKey.rateLimit && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Rate Limit:</span> {apiKey.rateLimit.requests} requests per {apiKey.rateLimit.period}
          </div>
        </div>
      )}

      {/* Status Toggle */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onToggleStatus(apiKey)}
          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
            apiKey.status === 'active'
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
          }`}
        >
          {apiKey.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyCard;