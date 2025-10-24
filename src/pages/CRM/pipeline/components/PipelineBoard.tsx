/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Pipeline } from '../types/pipeline';
import { PipelineColumn } from './PipelineColumn';

interface PipelineBoardProps {
  pipeline: Pipeline;
  onAddLead: (stageId: string) => void;
  onEditStage: (stage: any) => void;
  onLeadEdit: (lead: any) => void;
  onLeadDelete: (leadId: string) => void;
  onLeadMove: (leadId: string, stageId: string) => void;
}

export const PipelineBoard: React.FC<PipelineBoardProps> = ({
  pipeline,
  onAddLead,
  onEditStage,
  onLeadEdit,
  onLeadDelete,
  onLeadMove
}) => {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-x-auto">
        <div className="flex space-x-6 p-6 min-w-max">
          {pipeline.stages
            .sort((a, b) => a.order - b.order)
            .map(stage => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                onAddLead={onAddLead}
                onEditStage={onEditStage}
                onLeadEdit={onLeadEdit}
                onLeadDelete={onLeadDelete}
                onLeadDrop={onLeadMove}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

