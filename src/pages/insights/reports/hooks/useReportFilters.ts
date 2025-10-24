import { useState, useCallback } from 'react';

interface GlobalFilter {
  type: string;
  value: string;
}

export function useReportFilters() {
  const [filters, setFilters] = useState<GlobalFilter[]>([]);

  const addFilter = useCallback((filter: GlobalFilter) => {
    setFilters(prev => [...prev, filter]);
  }, []);

  const removeFilter = useCallback((index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  return {
    filters,
    addFilter,
    removeFilter,
    clearFilters
  };
}