import React from 'react';
import { 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Calendar, 
  Filter, 
  Plus, 
  Zap,
  RefreshCw
} from 'lucide-react';
import { Pipeline, ViewMode } from '../types/pipeline';

interface PipelineHeaderProps {
  pipelines: Pipeline[];
  currentPipeline: Pipeline;
  viewMode: ViewMode;
  onPipelineChange: (pipeline: Pipeline) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onAddLead: () => void;
  onShowFilters: () => void;
  onShowAIInsights: () => void;
  onRefresh: () => void;
  loading: boolean;
}

export const PipelineHeader: React.FC<PipelineHeaderProps> = ({
  pipelines,
  currentPipeline,
  viewMode,
  onPipelineChange,
  onViewModeChange,
  onAddLead,
  onShowFilters,
  onShowAIInsights,
  onRefresh,
  loading
}) => {
  const viewModeIcons = {
    board: LayoutGrid,
    list: List,
    calendar: Calendar
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span>CRM</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Pipeline Board</span>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-gray-900">Pipeline Board</h1>

            {/* Pipeline Selector */}
            <div className="relative">
              <select 
                value={currentPipeline.id}
                onChange={(e) => {
                  const pipeline = pipelines.find(p => p.id === e.target.value);
                  if (pipeline) onPipelineChange(pipeline);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {pipelines.map(pipeline => (
                  <option key={pipeline.id} value={pipeline.id}>
                    {pipeline.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {Object.entries(viewModeIcons).map(([mode, Icon]) => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode as ViewMode)}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === mode
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} view`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onShowFilters}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            <button
              onClick={onShowAIInsights}
              className="flex items-center space-x-2 px-4 py-2 text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>AI Insights</span>
            </button>

            <button
              onClick={onAddLead}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};