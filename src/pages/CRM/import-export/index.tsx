/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Upload, Download, FileText, History, AlertCircle, CheckCircle } from 'lucide-react';
import { ImportModal } from './components/ImportModal';
import { ExportModal } from './components/ExportModal';
import { ImportHistory } from './components/ImportHistory';
import { useImportExport } from './hooks/useImportExport';

const ImportExportPage: React.FC = () => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'history'>('import');
  
  const { 
    importHistory, 
    isLoading, 
    handleImport, 
    handleExport,
    refreshHistory 
  } = useImportExport();

  const stats = [
    {
      title: 'Total Imports',
      value: importHistory.filter(h => h.type === 'import').length,
      icon: Upload,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Total Exports',
      value: importHistory.filter(h => h.type === 'export').length,
      icon: Download,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Success Rate',
      value: `${Math.round((importHistory.filter(h => h.status === 'completed').length / importHistory.length) * 100) || 0}%`,
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Failed Operations',
      value: importHistory.filter(h => h.status === 'failed').length,
      icon: AlertCircle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Import & Export</h1>
        <p className="text-gray-600">Manage your lead data imports and exports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'import', label: 'Import Leads', icon: Upload },
              { key: 'export', label: 'Export Leads', icon: Download },
              { key: 'history', label: 'History', icon: History }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'import' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Import Leads</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Upload a CSV file to import leads into your CRM. Make sure your file follows the required format.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Import Leads
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <FileText className="h-5 w-5 mr-2" />
                    Download Template
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Export Leads</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Export your leads data to CSV format. You can filter and customize the export based on your needs.
                </p>
                <button
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Export Leads
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <ImportHistory 
              history={importHistory} 
              isLoading={isLoading}
              onRefresh={refreshHistory}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default ImportExportPage;