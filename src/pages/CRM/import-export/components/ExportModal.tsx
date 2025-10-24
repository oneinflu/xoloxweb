import React, { useState } from 'react';
import { X, Download, Calendar, Filter } from 'lucide-react';
import { ExportOptions } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => Promise<void>;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport
}) => {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    includeFields: ['name', 'email', 'phone', 'company', 'status'],
    filters: {}
  });
  const [isExporting, setIsExporting] = useState(false);

  const availableFields = [
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'company', label: 'Company' },
    { key: 'status', label: 'Status' },
    { key: 'pipeline', label: 'Pipeline' },
    { key: 'stage', label: 'Stage' },
    { key: 'value', label: 'Deal Value' },
    { key: 'source', label: 'Lead Source' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'createdAt', label: 'Created Date' },
    { key: 'updatedAt', label: 'Last Updated' },
    { key: 'notes', label: 'Notes' }
  ];

  const handleFieldToggle = (fieldKey: string) => {
    setOptions(prev => ({
      ...prev,
      includeFields: prev.includeFields.includes(fieldKey)
        ? prev.includeFields.filter(f => f !== fieldKey)
        : [...prev.includeFields, fieldKey]
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(options);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 99999999 }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Leads</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
            <div className="flex space-x-4">
              {[
                { key: 'csv', label: 'CSV', description: 'Comma-separated values' },
                { key: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' }
              ].map((format) => (
                <label key={format.key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={format.key}
                    checked={options.format === format.key}
                    onChange={(e) => setOptions(prev => ({ ...prev, format: e.target.value as 'csv' | 'xlsx' }))}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{format.label}</div>
                    <div className="text-xs text-gray-500">{format.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Field Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Include Fields</label>
            <div className="grid grid-cols-2 gap-3">
              {availableFields.map((field) => (
                <label key={field.key} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeFields.includes(field.key)}
                    onChange={() => handleFieldToggle(field.key)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Calendar className="h-4 w-4 inline mr-1" />
              Date Range (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={options.filters.dateRange?.start || ''}
                  onChange={(e) => setOptions(prev => ({
                    ...prev,
                    filters: {
                      ...prev.filters,
                      dateRange: {
                        ...prev.filters.dateRange,
                        start: e.target.value,
                        end: prev.filters.dateRange?.end || ''
                      }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={options.filters.dateRange?.end || ''}
                  onChange={(e) => setOptions(prev => ({
                    ...prev,
                    filters: {
                      ...prev.filters,
                      dateRange: {
                        ...prev.filters.dateRange,
                        start: prev.filters.dateRange?.start || '',
                        end: e.target.value
                      }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Filter className="h-4 w-4 inline mr-1" />
              Status Filter (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map((status) => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.filters.status?.includes(status) || false}
                    onChange={(e) => {
                      const currentStatuses = options.filters.status || [];
                      setOptions(prev => ({
                        ...prev,
                        filters: {
                          ...prev.filters,
                          status: e.target.checked
                            ? [...currentStatuses, status]
                            : currentStatuses.filter(s => s !== status)
                        }
                      }));
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {options.includeFields.length} fields selected
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              onClick={handleExport}
              disabled={isExporting || options.includeFields.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Export Leads</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};