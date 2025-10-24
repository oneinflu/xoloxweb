/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { usePipeline } from './hooks/usePipeline';
import { PipelineHeader } from './components/PipelineHeader';
import { PipelineFiltersComponent } from './components/PipelineFilters';
import { PipelineBoard } from './components/PipelineBoard';
import { AddLeadModal } from './components/AddLeadModal';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { Lead } from './types/pipeline';

const PipelinePage: React.FC = () => {
  const {
    pipelines,
    currentPipeline,
    filters,
    viewMode,
    sortBy,
    autoRefresh,
    loading,
    setCurrentPipeline,
    updateFilters,
    clearFilters,
    setViewMode,
    setSortBy,
    setAutoRefresh,
    moveLeadToStage,
    addLead,
    updateLead,
    deleteLead,
    refreshData
  } = usePipeline();

  // UI State
  const [showFilters, setShowFilters] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<string>('');
  const [showAIInsights, setShowAIInsights] = useState(false);

  // Event Handlers
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleAddLeadClick = () => {
    setSelectedStageId('');
    setShowAddLeadModal(true);
  };

  const handleAddLeadToStage = (stageId: string) => {
    setSelectedStageId(stageId);
    setShowAddLeadModal(true);
  };

  const handleSaveLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    addLead(leadData);
    setShowAddLeadModal(false);
    setSelectedStageId('');
  };

  const handleCloseAddLeadModal = () => {
    setShowAddLeadModal(false);
    setSelectedStageId('');
  };

  const handleAutoRefreshToggle = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handleShowAdvancedFilters = () => {
    console.log('Show advanced filters modal');
  };

  const handleAIInsightsToggle = () => {
    setShowAIInsights(!showAIInsights);
  };

  const handleEditStage = (stage: any) => {
    console.log('Edit stage:', stage);
  };

  const handleLeadEdit = (lead: any) => {
    // Extract lead ID and create updates object
    const { id, ...updates } = lead;
    updateLead(id, updates);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pipeline...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (!currentPipeline) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No pipeline found</p>
          <button 
            onClick={refreshData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <PipelineHeader
        pipelines={pipelines}
        currentPipeline={currentPipeline}
        viewMode={viewMode}
        onPipelineChange={setCurrentPipeline}
        onViewModeChange={setViewMode}
        onAddLead={handleAddLeadClick}
        onShowFilters={handleFilterToggle}
        onShowAIInsights={handleAIInsightsToggle}
        onRefresh={refreshData}
        loading={loading}
      />

      {/* Filters */}
      {showFilters && (
        <PipelineFiltersComponent
          filters={filters}
          sortBy={sortBy}
          autoRefresh={autoRefresh}
          onFiltersChange={updateFilters}
          onSortChange={setSortBy}
          onAutoRefreshToggle={handleAutoRefreshToggle}
          onClearFilters={clearFilters}
          onShowAdvancedFilters={handleShowAdvancedFilters}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {viewMode === 'board' && (
          <PipelineBoard
            pipeline={currentPipeline}
            onAddLead={handleAddLeadToStage}
            onEditStage={handleEditStage}
            onLeadEdit={handleLeadEdit}
            onLeadDelete={deleteLead}
            onLeadMove={moveLeadToStage}
          />
        )}

        {viewMode === 'list' && (
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">List View</h3>
                <p className="text-gray-500">List view implementation coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
                <p className="text-gray-500">Calendar view implementation coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddLeadModal
        isOpen={showAddLeadModal}
        stageId={selectedStageId}
        onClose={handleCloseAddLeadModal}
        onSave={handleSaveLead}
      />

      <AIInsightsPanel
        isOpen={showAIInsights}
        onClose={handleAIInsightsToggle}
      />
    </div> </div>
  );
};

export default PipelinePage;