import { CampaignInfo } from './types';

interface CampaignData {
  active: CampaignInfo[];
  roi: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
    }[];
  };
}

export const campaignData: CampaignData = {
  active: [
    {
      name: "Spring Enrollment",
      channel: "Email",
      status: "Active",
      leadsReached: 1240,
      ctr: 24.8
    },
    {
      name: "Early Bird Offer",
      channel: "WhatsApp",
      status: "Scheduled",
      leadsReached: 850,
      ctr: 18.2
    }
  ],
  roi: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Email Campaign",
        data: [2.4, 2.8, 3.2, 2.9],
        borderColor: "#4F46E5"
      },
      {
        label: "WhatsApp Campaign",
        data: [3.1, 3.4, 3.2, 3.6],
        borderColor: "#10B981"
      }
    ]
  }
};