/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { PipelineStage } from '../types/pipeline';
import { LeadCard } from './LeadCard';

interface PipelineColumnProps {
  stage: PipelineStage;
  onAddLead: (stageId: string) => void;
  onEditStage: (stage: PipelineStage) => void;
  onLeadEdit: (lead: any) => void;
  onLeadDelete: (leadId: string) => void;
  onLeadDrop: (leadId: string, stageId: string) => void;
}

export const PipelineColumn: React.FC<PipelineColumnProps> = ({
  stage,
  onAddLead,
  onEditStage,
  onLeadEdit,
  onLeadDelete,
  onLeadDrop
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    onLeadDrop(leadId, stage.id);
  };

  return (
    <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg">
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <h3 className="font-medium text-gray-900">{stage.name}</h3>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {stage.leads.length}
            </span>
          </div>
          
          <button 
            onClick={() => onEditStage(stage)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
        
        {/* Stage Stats */}
        <div className="text-sm text-gray-600">
          <div>Value: ${stage.totalValue.toLocaleString()}</div>
          {stage.leads.length > 0 && (
            <div>Avg Score: {Math.round(stage.averageScore)}</div>
          )}
        </div>
      </div>

      {/* Add Lead Button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => onAddLead(stage.id)}
          className="w-full flex items-center justify-center space-x-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Leads List */}
      <div 
        className="p-4 space-y-3 max-h-96 overflow-y-auto"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {stage.leads.map(lead => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onEdit={onLeadEdit}
            onDelete={onLeadDelete}
          />
        ))}
        
        {stage.leads.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-sm">No leads in this stage</div>
          </div>
        )}
      </div>

      {/* Stage Footer */}
      {stage.leads.length > 0 && (
        <div className="p-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
          <div className="text-xs text-gray-600 text-center">
            Total: ${stage.totalValue.toLocaleString()} • {stage.leads.length} leads
          </div>
        </div>
      )}
    </div>
  );
};