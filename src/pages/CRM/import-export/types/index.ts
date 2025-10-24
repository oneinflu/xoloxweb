/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ImportExportRecord {
  id: string;
  type: 'import' | 'export';
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  recordsProcessed: number;
  totalRecords: number;
  createdAt: string;
  completedAt?: string;
  errorMessage?: string;
  downloadUrl?: string;
}

export interface ImportOptions {
  file: File;
  skipDuplicates: boolean;
  updateExisting: boolean;
  mapping: Record<string, string>;
}

export interface ExportOptions {
  format: 'csv' | 'xlsx';
  includeFields: string[];
  filters: {
    dateRange?: {
      start: string;
      end: string;
    };
    status?: string[];
    pipeline?: string[];
    stage?: string[];
  };
}

export interface ImportValidationError {
  row: number;
  field: string;
  message: string;
  value: any;
}

export interface ImportPreview {
  headers: string[];
  sampleData: any[][];
  totalRows: number;
  validationErrors: ImportValidationError[];
}