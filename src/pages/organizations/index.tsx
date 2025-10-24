import  { useState } from 'react';
import { OrganizationsHeader } from './components/OrganizationsHeader';
import { OrganizationsFilters } from './components/OrganizationsFilters';
import OrganizationsList from './components/OrganizationsList';
import { useOrganizations } from './hooks/useOrganizations';
import { OrganizationFilters } from './types/organization';

export default function OrganizationsPage() {
  const [filters, setFilters] = useState<OrganizationFilters>({
    search: '',
    status: [],
    industry: [],
    size: [],
    plan: [],
    registrationDateRange: {},
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const {
    organizations,
    loading,
    stats,
    approveOrganization,
    rejectOrganization,
    suspendOrganization,
    activateOrganization,
    handleBulkAction,
    refreshData,
    exportData
  } = useOrganizations();

  const handleApprove = (id: string) => {
    approveOrganization(id);
  };

  const handleReject = (id: string) => {
    rejectOrganization(id);
  };

  const handleSuspend = (id: string) => {
    suspendOrganization(id);
  };

  const handleActivate = (id: string) => {
    activateOrganization(id);
  };

  const handleViewDetails = (id: string) => {
    console.log('View details for organization:', id);
    // Navigate to organization details page
  };

  const handleBulkActionLocal = (action: string, ids: string[]) => {
    handleBulkAction(action, ids);
  };

  const handleRefresh = () => {
    refreshData();
  };

  const handleExport = () => {
    exportData();
  };

  const handleFilterChange = (newFilters: Partial<OrganizationFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };console.log('Export organizations');
    // Implement export functionality
return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <OrganizationsHeader
          stats={stats}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />
        
        <div className="mt-6">
          <OrganizationsFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="mt-6">
          <OrganizationsList
            organizations={organizations}
            filters={filters}
            loading={loading}
            onApprove={handleApprove}
            onReject={handleReject}
            onSuspend={handleSuspend}
            onActivate={handleActivate}
            onViewDetails={handleViewDetails}
            onBulkAction={handleBulkActionLocal}
          />
        </div>
      </div>
    </div>
  ); 
};

  
