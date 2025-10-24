import React, { useState, useCallback } from 'react';
import { X, Upload, FileText, AlertTriangle } from 'lucide-react';
import { ImportOptions, ImportPreview } from '../types';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (options: ImportOptions) => Promise<void>;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [step, setStep] = useState<'upload' | 'preview' | 'options' | 'importing'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [options, setOptions] = useState<Partial<ImportOptions>>({
    skipDuplicates: true,
    updateExisting: false,
    mapping: {}
  });
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      // Mock preview generation
      setPreview({
        headers: ['Name', 'Email', 'Phone', 'Company', 'Status'],
        sampleData: [
          ['John Doe', 'john@example.com', '+1234567890', 'Acme Corp', 'New'],
          ['Jane Smith', 'jane@example.com', '+0987654321', 'Tech Inc', 'Contacted']
        ],
        totalRows: 150,
        validationErrors: []
      });
      setStep('preview');
    } else {
      alert('Please select a CSV file');
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setStep('importing');
    try {
      await onImport({
        file,
        skipDuplicates: options.skipDuplicates || true,
        updateExisting: options.updateExisting || false,
        mapping: options.mapping || {}
      });
      onClose();
      resetModal();
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  const resetModal = () => {
    setStep('upload');
    setFile(null);
    setPreview(null);
    setOptions({
      skipDuplicates: true,
      updateExisting: false,
      mapping: {}
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 99999999 }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Import Leads</h2>
          <button
            onClick={() => { onClose(); resetModal(); }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'upload' && (
            <div className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop your CSV file here
                </h3>
                <p className="text-gray-600 mb-4">
                  or click to browse and select a file
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• First row should contain column headers</li>
                  <li>• Required fields: Name, Email</li>
                  <li>• Optional fields: Phone, Company, Status, Notes</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
            </div>
          )}

          {step === 'preview' && preview && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Preview Import Data</h3>
                <div className="text-sm text-gray-600">
                  {preview.totalRows} rows found
                </div>
              </div>

              {preview.validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <h4 className="font-medium text-red-900">Validation Errors Found</h4>
                  </div>
                  <div className="text-sm text-red-800">
                    {preview.validationErrors.length} errors need to be fixed before importing
                  </div>
                </div>
              )}

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {preview.headers.map((header, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.sampleData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 'importing' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Importing Leads...</h3>
              <p className="text-gray-600">Please wait while we process your file</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {step === 'preview' && (
              <>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={options.skipDuplicates}
                    onChange={(e) => setOptions(prev => ({ ...prev, skipDuplicates: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Skip duplicates</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={options.updateExisting}
                    onChange={(e) => setOptions(prev => ({ ...prev, updateExisting: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Update existing</span>
                </label>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {step !== 'importing' && (
              <button
                onClick={() => { onClose(); resetModal(); }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            
            {step === 'preview' && (
              <button
                onClick={handleImport}
                disabled={preview?.validationErrors && preview.validationErrors.length > 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Import {preview?.totalRows} Leads
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};