/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  company?: string;
  position?: string;
  source: 'Website' | 'Ads' | 'Referral' | 'Cold Call' | 'Social Media' | 'Event' | 'Other';
  stage: string;
  value: number;
  score: number;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  aiPrediction?: {
    conversionProbability: number;
    priority: 'high' | 'medium' | 'low';
    nextBestAction: string;
  };
  customFields?: Record<string, any>;
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  isClosedWon: boolean;
  isClosedLost: boolean;
  leads: Lead[];
  totalValue: number;
  averageScore: number;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  stages: PipelineStage[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineFilters {
  search: string;
  stages: string[];
  owners: string[];
  sources: string[];
  tags: string[];
  scoreRange: [number, number];
  valueRange: [number, number];
  dateRange: {
    start?: string;
    end?: string;
  };
  segment?: string;
}

export interface PipelineStats {
  totalLeads: number;
  totalValue: number;
  averageScore: number;
  conversionRate: number;
  averageDealSize: number;
  averageTimeToClose: number;
}

export type ViewMode = 'board' | 'list' | 'calendar';

export type SortOption = 'score' | 'value' | 'updated' | 'created' | 'name';

export interface SavedSegment {
  id: string;
  name: string;
  filters: PipelineFilters;
  isDefault: boolean;
}