import React from 'react';
import { RefreshCw, Download, Upload, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { ImportExportRecord } from '../types';

interface ImportHistoryProps {
  history: ImportExportRecord[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const ImportHistory: React.FC<ImportHistoryProps> = ({
  history,
  isLoading,
  onRefresh
}) => {
  const getStatusIcon = (status: ImportExportRecord['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'processing':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: ImportExportRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getProgressPercentage = (record: ImportExportRecord) => {
    if (record.totalRecords === 0) return 0;
    return Math.round((record.recordsProcessed / record.totalRecords) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Import/Export History</h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No History Found</h3>
          <p className="text-gray-600">Your import and export history will appear here</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {record.type === 'import' ? (
                          <Upload className="h-5 w-5 text-blue-600 mr-2" />
                        ) : (
                          <Download className="h-5 w-5 text-green-600 mr-2" />
                        )}
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {record.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.fileName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(record.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      {record.errorMessage && (
                        <div className="text-xs text-red-600 mt-1">{record.errorMessage}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {record.recordsProcessed} / {record.totalRecords}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(record)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getProgressPercentage(record)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(record.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {record.status === 'completed' && record.downloadUrl && record.type === 'export' && (
                        <a
                          href={record.downloadUrl}
                          download
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                      )}
                      {record.status === 'failed' && (
                        <button className="text-red-600 hover:text-red-900">
                          View Error
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};