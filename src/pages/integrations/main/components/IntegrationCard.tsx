import React, { useState } from 'react';
import { 
  Settings, 
  Play, 
  FileText, 
  HelpCircle, 
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Power,
  Copy,
  Trash2,
 
  
} from 'lucide-react';
import { Integration, Environment } from '../types/integration';

interface IntegrationCardProps {
  integration: Integration;
  onConfigure: (id: string) => void;
  onTest: (id: string) => void;
  onViewLogs: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
  onViewUsage: (id: string) => void;
  onEnvironmentChange: (id: string, environment: Environment) => void;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onConfigure,
  onTest,
  onViewLogs,
  onToggleStatus,
  onDuplicate,
  onRemove,
  onViewUsage,
  onEnvironmentChange,
  isSelected,
  onSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled': return 'bg-green-100 text-green-800 border-green-200';
      case 'disabled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'unconfigured': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  

 
  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Main Row */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center  space-x-6 sm:space-x-4">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(integration.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
          />

          {/* Icon + Name */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <img 
                src={integration.icon} 
                alt={integration.name}
                className="w-5 h-5 sm:w-6 sm:h-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/icons/default-integration.svg';
                }}
              />
            </div>
            <div className="min-w-65 flex-1">
              <button
                onClick={() => onConfigure(integration.id)}
                className="text-left w-full"
              >
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm sm:text-base truncate">
                  {integration.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {integration.description}
                </p>
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="hidden sm:block flex-shrink-0 w-20">
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {integration.category.replace('-', ' ')}
            </span>
          </div>

          {/* Environment */}
          <div className="hidden md:block flex-shrink-0 w-20">
            <select
              value={integration.environment}
              onChange={(e) => onEnvironmentChange(integration.id, e.target.value as Environment)}
              className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="test">Test</option>
              <option value="production">Production</option>
            </select>
          </div>

          {/* Status */}
          <div className="hidden lg:block flex-shrink-0 w-20">
            <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(integration.status)}`}>
              {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
            </span>
          </div>

          {/* Owner */}
          <div className="hidden xl:block text-xs sm:text-sm text-gray-600 min-w-0 flex-shrink-0 w-24">
            <div className="truncate">{integration.addedBy}</div>
          </div>

          {/* Last Activity */}
          <div className="hidden xl:block text-xs sm:text-sm text-gray-600 min-w-0 flex-shrink-0 w-24">
            <div className="truncate">{integration.lastActivity}</div>
          </div>

          {/* Usage */}
          <div className="hidden xl:block flex-shrink-0 w-20">
            <button
              onClick={() => onViewUsage(integration.id)}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {integration.usageCount} workflows
            </button>
          </div>

          {/* Quick Actions (on hover) */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-20">
            <button
              onClick={() => onConfigure(integration.id)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
              title="Configure"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => onTest(integration.id)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
              title="Test"
            >
              <Play className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewLogs(integration.id)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
              title="Logs"
            >
              <FileText className="w-4 h-4" />
            </button>
            {integration.documentation && (
              <a
                href={integration.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
                title="Documentation"
              >
                <HelpCircle className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onConfigure(integration.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configure</span>
                  </button>
                  <button
                    onClick={() => {
                      onTest(integration.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Play className="w-4 h-4" />
                    <span>Test Connection</span>
                  </button>
                  <button
                    onClick={() => {
                      onViewLogs(integration.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Logs</span>
                  </button>
                  <button
                    onClick={() => {
                      onToggleStatus(integration.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Power className="w-4 h-4" />
                    <span>{integration.status === 'enabled' ? 'Disable' : 'Enable'}</span>
                  </button>
                  <button
                    onClick={() => {
                      onDuplicate(integration.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Duplicate</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      onRemove(integration.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Expand/Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Row */}
      {isExpanded && integration.configurationSummary && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {integration.configurationSummary.endpoint && (
              <div>
                <span className="font-medium text-gray-700">Endpoint:</span>
                <div className="text-gray-600 truncate">{integration.configurationSummary.endpoint}</div>
              </div>
            )}
            {integration.configurationSummary.lastTestResult && (
              <div>
                <span className="font-medium text-gray-700">Last Test:</span>
                <div className="text-gray-600">{integration.configurationSummary.lastTestResult}</div>
              </div>
            )}
            {integration.configurationSummary.credentials && (
              <div>
                <span className="font-medium text-gray-700">Credentials:</span>
                <div className="text-gray-600">{integration.configurationSummary.credentials}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationCard;