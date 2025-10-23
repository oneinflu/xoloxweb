import { AIInsight } from './types';

interface AIInsightsData {
  keyInsights: AIInsight[];
  forecast: {
    labels: string[];
    actual: number[];
    predicted: number[];
    confidence: [number, number][];
  };
}

export const aiInsightsData: AIInsightsData = {
  keyInsights: [
    {
      id: 1,
      text: "Email response rates peak between 10-11 AM",
      impact: "28% higher engagement",
      confidence: 94
    },
    {
      id: 2,
      text: "WhatsApp leads convert 2.3x faster",
      impact: "Reduced sales cycle",
      confidence: 89
    },
    {
      id: 3,
      text: "Follow-up sweet spot: 4-6 hours",
      impact: "42% better conversion",
      confidence: 91
    }
  ],
  forecast: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    actual: [45, 52, 49, 58],
    predicted: [44, 50, 52, 61],
    confidence: [
      [42, 46],
      [48, 52],
      [50, 54],
      [59, 63]
    ]
  }
};