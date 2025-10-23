import { StageConversion } from './types';

interface PipelineData {
  stages: {
    labels: string[];
    data: number[];
    colors: string[];
  };
  conversion: {
    overall: number;
    byStage: StageConversion[];
  };
}

export const pipelineData: PipelineData = {
  stages: {
    labels: ["Lead In", "Initial Contact", "Need Analysis", "Proposal", "Negotiation", "Closed"],
    data: [100, 80, 60, 40, 30, 20],
    colors: ["#4F46E5", "#818CF8", "#10B981", "#34D399", "#F59E0B", "#EF4444"]
  },
  conversion: {
    overall: 31.4,
    byStage: [
      { stage: "Lead → Contact", rate: 82 },
      { stage: "Contact → Qualified", rate: 64 },
      { stage: "Qualified → Proposal", rate: 48 },
      { stage: "Proposal → Closed", rate: 38 }
    ]
  }
};