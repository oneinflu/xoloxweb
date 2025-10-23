export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor: string | string[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface KPIMetric {
  value: number;
  trend: number;
  timeframe: string;
  unit?: string;
}

export interface AIInsight {
  id: number;
  text: string;
  impact: string;
  confidence: number;
}

export interface RegionData {
  name: string;
  leads: number;
  conversion: number;
  counsellors: number;
  responseTime: number;
}

export interface CampaignInfo {
  name: string;
  channel: string;
  status: string;
  leadsReached: number;
  ctr: number;
}

export interface StageConversion {
  stage: string;
  rate: number;
}