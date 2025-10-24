import React, { useState } from 'react';
import IntegrationsHeader from './components/IntegrationsHeader';
import CategoryNav from './components/CategoryNav';
import IntegrationsList from './components/IntegrationsList';
import { useIntegrations } from './hooks/useIntegrations';

const IntegrationsPage: React.FC = () => {
  const {
    integrations,
    categories,
    filters,
    catalogSearchQuery,
    stats,
    userPermission,
    loading,
    updateFilters,
    setCatalogSearchQuery,
    configureIntegration,
    testIntegration,
    viewLogs,
    toggleIntegrationStatus,
    duplicateIntegration,
    removeIntegration,
    viewUsage,
    changeEnvironment,
    handleBulkAction
  } = useIntegrations();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);

  const handleCreateIntegration = () => {
    setShowCreateModal(true);
  };

  const handleOpenCatalog = () => {
    setShowCatalogModal(true);
  };

  const handleRequestConnector = () => {
    console.log('Request connector');
    // In real app, open request form modal
  };

  const handleUploadConnector = () => {
    console.log('Upload connector');
    // In real app, open file upload modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <IntegrationsHeader
          searchQuery={filters.search}
          onSearchChange={(search) => updateFilters({ search })}
          activeFilterChip={filters.filterChip}
          onFilterChipChange={(filterChip) => updateFilters({ filterChip })}
          onCreateIntegration={handleCreateIntegration}
          onOpenCatalog={handleOpenCatalog}
          userPermission={userPermission}
          stats={stats}
        />

        {/* Category Navigation */}
        <CategoryNav
          categories={categories}
          activeCategory={filters.category}
          onCategoryChange={(category) => updateFilters({ category })}
          catalogSearchQuery={catalogSearchQuery}
          onCatalogSearchChange={setCatalogSearchQuery}
          onRequestConnector={handleRequestConnector}
          onUploadConnector={handleUploadConnector}
          userPermission={userPermission}
        />

        {/* Integrations List */}
        <IntegrationsList
          integrations={integrations}
          filters={filters}
          onFiltersChange={updateFilters}
          onConfigure={configureIntegration}
          onTest={testIntegration}
          onViewLogs={viewLogs}
          onToggleStatus={toggleIntegrationStatus}
          onDuplicate={duplicateIntegration}
          onRemove={removeIntegration}
          onViewUsage={viewUsage}
          onEnvironmentChange={changeEnvironment}
          onBulkAction={handleBulkAction}
        />
      </div>

      {/* Modals would go here */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Create Integration</h2>
            <p className="text-gray-600 mb-4">Integration creation modal would go here.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showCatalogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Integration Marketplace</h2>
            <p className="text-gray-600 mb-4">Integration catalog/marketplace would go here.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCatalogModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsPage;