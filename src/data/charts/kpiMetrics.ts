import { KPIMetric } from './types';

interface KPIMetricsData {
  totalLeads: KPIMetric;
  newLeadsThisMonth: KPIMetric;
  contactedLeads: KPIMetric;
  convertedLeads: KPIMetric;
  lostLeads: KPIMetric;
  conversionRate: KPIMetric;
  avgResponseTime: KPIMetric;
  aiConfidence: KPIMetric;
}

export const kpiMetricsData: KPIMetricsData = {
  totalLeads: {
    value: 2840,
    trend: 12.5,
    timeframe: 'vs last month'
  },
  newLeadsThisMonth: {
    value: 486,
    trend: 8.2,
    timeframe: 'vs last month'
  },
  contactedLeads: {
    value: 1924,
    trend: -2.4,
    timeframe: 'vs last month'
  },
  convertedLeads: {
    value: 892,
    trend: 15.8,
    timeframe: 'vs last month'
  },
  lostLeads: {
    value: 234,
    trend: -5.6,
    timeframe: 'vs last month'
  },
  conversionRate: {
    value: 31.4,
    trend: 3.2,
    timeframe: 'vs last month'
  },
  avgResponseTime: {
    value: 2.4,
    trend: -18.5,
    timeframe: 'vs last month',
    unit: 'hours'
  },
  aiConfidence: {
    value: 92.8,
    trend: 4.6,
    timeframe: 'vs last month'
  }
};