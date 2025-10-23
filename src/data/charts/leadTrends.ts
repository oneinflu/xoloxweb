import { ChartData } from './types';

interface LeadTrendsData {
  timeSeriesData: ChartData;
  sourceDistribution: {
    labels: string[];
    data: number[];
    backgroundColor: string[];
  };
  statusDistribution: ChartData;
}

export const leadTrendsData: LeadTrendsData = {
  timeSeriesData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Leads",
        data: [450, 520, 480, 600, 580, 620],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)"
      },
      {
        label: "Converted",
        data: [200, 250, 220, 300, 280, 320],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)"
      }
    ]
  },
  sourceDistribution: {
    labels: ["Website", "Referral", "Social", "Direct", "Other"],
    data: [35, 25, 20, 15, 5],
    backgroundColor: [
      "#4F46E5",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#6B7280"
    ]
  },
  statusDistribution: {
    labels: ["New", "Contacted", "Qualified", "Proposal", "Converted"],
    datasets: [
      {
        label: "Current Month",
        data: [120, 90, 60, 45, 30],
        backgroundColor: "#4F46E5"
      },
      {
        label: "Previous Month",
        data: [100, 80, 50, 40, 25],
        backgroundColor: "#93C5FD"
      }
    ]
  }
};