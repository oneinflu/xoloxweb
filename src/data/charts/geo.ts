import { RegionData } from './types';

interface GeoData {
  regions: RegionData[];
  heatmap: {
    center: { lat: number; lng: number };
    data: Array<{
      location: { lat: number; lng: number };
      weight: number;
    }>;
  };
}

export const geoData: GeoData = {
  regions: [
    {
        name: "Mumbai West",
        leads: 450,
        conversion: 32,
        counsellors: 4,
        responseTime: 2.1
    },
    {
        name: "Thane",
        leads: 380,
        conversion: 28,
        counsellors: 3,
        responseTime: 2.3
    },
    {
        name: "Navi Mumbai",
        leads: 320,
        conversion: 25,
        counsellors: 3,
        responseTime: 2.2
    },
    {
        name: "Mumbai Central",
        leads: 420,
        conversion: 30,
        counsellors: 4,
        responseTime: 2.1
    }
  ],
  heatmap: {
    center: { lat: 19.0760, lng: 72.8777 }, // Mumbai
    data: [
      { location: { lat: 19.0760, lng: 72.8777 }, weight: 0.8 },
      { location: { lat: 19.2183, lng: 72.9781 }, weight: 0.6 },
      { location: { lat: 19.0330, lng: 73.0297 }, weight: 0.5 },
      { location: { lat: 18.9067, lng: 72.8147 }, weight: 0.7 }
    ]
  }
};