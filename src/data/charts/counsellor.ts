import { ChartData } from './types';

interface CounsellorData {
  performance: ChartData;
  responseTime: {
    labels: string[];
    data: number[];
    target: number;
    backgroundColor: string[];
  };
}

export const counsellorData: CounsellorData = {
  performance: {
    labels: ["Sarah Kim", "John Doe", "Maria Garcia", "Alex Chen"],
    datasets: [
      {
        label: "Leads Handled",
        data: [45, 38, 42, 35],
        backgroundColor: "#4F46E5"
      },
      {
        label: "Conversion Rate",
        data: [68, 62, 58, 72],
        backgroundColor: "#10B981"
      }
    ]
  },
  responseTime: {
    labels: ["Mumbai West", "Thane", "Navi Mumbai", "Mumbai Central"],
    data: [2.1, 2.8, 4.2, 1.8],
    target: 2.1,
    backgroundColor: ["#10B981", "#F59E0B", "#EF4444", "#10B981"]
  }
};