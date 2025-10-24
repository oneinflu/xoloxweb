import { useState, useEffect } from 'react';
import { ImportExportRecord, ImportOptions, ExportOptions } from '../types';

export const useImportExport = () => {
  const [importHistory, setImportHistory] = useState<ImportExportRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setImportHistory([
      {
        id: '1',
        type: 'import',
        fileName: 'leads_batch_1.csv',
        status: 'completed',
        recordsProcessed: 150,
        totalRecords: 150,
        createdAt: '2024-01-15T10:30:00Z',
        completedAt: '2024-01-15T10:32:00Z'
      },
      {
        id: '2',
        type: 'export',
        fileName: 'all_leads_export.csv',
        status: 'completed',
        recordsProcessed: 500,
        totalRecords: 500,
        createdAt: '2024-01-14T14:20:00Z',
        completedAt: '2024-01-14T14:21:00Z',
        downloadUrl: '/downloads/all_leads_export.csv'
      },
      {
        id: '3',
        type: 'import',
        fileName: 'leads_batch_2.csv',
        status: 'failed',
        recordsProcessed: 25,
        totalRecords: 100,
        createdAt: '2024-01-13T09:15:00Z',
        errorMessage: 'Invalid email format in row 26'
      },
      {
        id: '4',
        type: 'import',
        fileName: 'leads_batch_3.csv',
        status: 'processing',
        recordsProcessed: 75,
        totalRecords: 200,
        createdAt: '2024-01-12T16:45:00Z'
      }
    ]);
  }, []);

  const handleImport = async (options: ImportOptions): Promise<void> => {
    setIsLoading(true);
    
    // Create new import record
    const newRecord: ImportExportRecord = {
      id: Date.now().toString(),
      type: 'import',
      fileName: options.file.name,
      status: 'processing',
      recordsProcessed: 0,
      totalRecords: 100, // This would come from file analysis
      createdAt: new Date().toISOString()
    };

    setImportHistory(prev => [newRecord, ...prev]);

    try {
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update record as completed
      setImportHistory(prev => 
        prev.map(record => 
          record.id === newRecord.id 
            ? { 
                ...record, 
                status: 'completed' as const,
                recordsProcessed: record.totalRecords,
                completedAt: new Date().toISOString()
              }
            : record
        )
      );
    } catch (error) {
      // Update record as failed
      setImportHistory(prev => 
        prev.map(record => 
          record.id === newRecord.id 
            ? { 
                ...record, 
                status: 'failed' as const,
                errorMessage: 'Import failed due to server error'
              }
            : record
        )
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (options: ExportOptions): Promise<void> => {
    setIsLoading(true);
    
    // Create new export record
    const newRecord: ImportExportRecord = {
      id: Date.now().toString(),
      type: 'export',
      fileName: `leads_export_${new Date().toISOString().split('T')[0]}.${options.format}`,
      status: 'processing',
      recordsProcessed: 0,
      totalRecords: 500, // This would come from database query
      createdAt: new Date().toISOString()
    };

    setImportHistory(prev => [newRecord, ...prev]);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update record as completed
      setImportHistory(prev => 
        prev.map(record => 
          record.id === newRecord.id 
            ? { 
                ...record, 
                status: 'completed' as const,
                recordsProcessed: record.totalRecords,
                completedAt: new Date().toISOString(),
                downloadUrl: `/downloads/${record.fileName}`
              }
            : record
        )
      );
    } catch (error) {
      // Update record as failed
      setImportHistory(prev => 
        prev.map(record => 
          record.id === newRecord.id 
            ? { 
                ...record, 
                status: 'failed' as const,
                errorMessage: 'Export failed due to server error'
              }
            : record
        )
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshHistory = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return {
    importHistory,
    isLoading,
    handleImport,
    handleExport,
    refreshHistory
  };
};