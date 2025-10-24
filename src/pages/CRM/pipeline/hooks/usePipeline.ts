import { useState } from 'react';
import { Pipeline, PipelineFilters, Lead, PipelineStats, ViewMode, SortOption } from '../types/pipeline';

// Mock data
const mockPipelines: Pipeline[] = [
  {
    id: '1',
    name: 'Sales Pipeline',
    description: 'Main sales process',
    isDefault: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-03-15',
    stages: [
      {
        id: 'new',
        name: 'New Leads',
        color: '#3b82f6',
        order: 1,
        isClosedWon: false,
        isClosedLost: false,
        leads: [],
        totalValue: 0,
        averageScore: 0
      },
      {
        id: 'contacted',
        name: 'Contacted',
        color: '#f59e0b',
        order: 2,
        isClosedWon: false,
        isClosedLost: false,
        leads: [],
        totalValue: 0,
        averageScore: 0
      },
      {
        id: 'interested',
        name: 'Interested',
        color: '#10b981',
        order: 3,
        isClosedWon: false,
        isClosedLost: false,
        leads: [],
        totalValue: 0,
        averageScore: 0
      },
      {
        id: 'converted',
        name: 'Converted',
        color: '#059669',
        order: 4,
        isClosedWon: true,
        isClosedLost: false,
        leads: [],
        totalValue: 0,
        averageScore: 0
      },
      {
        id: 'lost',
        name: 'Closed Lost',
        color: '#ef4444',
        order: 5,
        isClosedWon: false,
        isClosedLost: true,
        leads: [],
        totalValue: 0,
        averageScore: 0
      }
    ]
  },
  {
    id: '2',
    name: 'Admissions Pipeline',
    description: 'Student admissions process',
    isDefault: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    stages: [
      {
        id: 'inquiry',
        name: 'Inquiry',
        color: '#6366f1',
        order: 1,
        isClosedWon: false,
        isClosedLost: false,
        leads: [],
        totalValue: 0,
        averageScore: 0
      },
      {
        id: 'application',
        name: 'Application',
        color: '#8b5cf6',
        order: 2,
        isClosedWon: false,
        isClosedLost: false,
        leads: [],
        totalValue: 0,
        averageScore: 0
      },
      {
        id: 'enrolled',
        name: 'Enrolled',
        color: '#059669',
        order: 3,
        isClosedWon: true,
        isClosedLost: false,
        leads: [],
        totalValue: 0,
        averageScore: 0
      }
    ]
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0123',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff',
    company: 'Tech Corp',
    position: 'CEO',
    source: 'Website',
    stage: 'new',
    value: 50000,
    score: 85,
    owner: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff'
    },
    tags: ['hot-lead', 'enterprise'],
    createdAt: '2024-03-10',
    updatedAt: '2024-03-15',
    lastActivity: '2024-03-15',
    aiPrediction: {
      conversionProbability: 78,
      priority: 'high',
      nextBestAction: 'Schedule demo call'
    }
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily@startup.io',
    phone: '+1-555-0456',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=f59e0b&color=fff',
    company: 'StartupCo',
    position: 'Founder',
    source: 'Referral',
    stage: 'contacted',
    value: 25000,
    score: 72,
    owner: {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=8b5cf6&color=fff'
    },
    tags: ['startup', 'warm-lead'],
    createdAt: '2024-03-08',
    updatedAt: '2024-03-14',
    lastActivity: '2024-03-14',
    aiPrediction: {
      conversionProbability: 65,
      priority: 'medium',
      nextBestAction: 'Send proposal'
    }
  }
];

export const usePipeline = () => {
  const [pipelines] = useState<Pipeline[]>(mockPipelines);
  const [currentPipeline, setCurrentPipeline] = useState<Pipeline>(mockPipelines[0]);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [filters, setFilters] = useState<PipelineFilters>({
    search: '',
    stages: [],
    owners: [],
    sources: [],
    tags: [],
    scoreRange: [0, 100],
    valueRange: [0, 1000000],
    dateRange: {}
  });
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Calculate pipeline stats
  const stats: PipelineStats = {
    totalLeads: leads.length,
    totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
    averageScore: leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length || 0,
    conversionRate: 15.5,
    averageDealSize: 37500,
    averageTimeToClose: 45
  };

  // Filter leads based on current filters
  const filteredLeads = leads.filter(lead => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!lead.name.toLowerCase().includes(searchTerm) &&
          !lead.email.toLowerCase().includes(searchTerm) &&
          !lead.phone.includes(searchTerm)) {
        return false;
      }
    }

    if (filters.stages.length > 0 && !filters.stages.includes(lead.stage)) {
      return false;
    }

    if (filters.owners.length > 0 && !filters.owners.includes(lead.owner.id)) {
      return false;
    }

    if (filters.sources.length > 0 && !filters.sources.includes(lead.source)) {
      return false;
    }

    if (filters.tags.length > 0 && !filters.tags.some(tag => lead.tags.includes(tag))) {
      return false;
    }

    if (lead.score < filters.scoreRange[0] || lead.score > filters.scoreRange[1]) {
      return false;
    }

    if (lead.value < filters.valueRange[0] || lead.value > filters.valueRange[1]) {
      return false;
    }

    return true;
  });

  // Organize leads by stage
  const organizedPipeline = {
    ...currentPipeline,
    stages: currentPipeline.stages.map(stage => ({
      ...stage,
      leads: filteredLeads.filter(lead => lead.stage === stage.id),
      totalValue: filteredLeads
        .filter(lead => lead.stage === stage.id)
        .reduce((sum, lead) => sum + lead.value, 0),
      averageScore: filteredLeads
        .filter(lead => lead.stage === stage.id)
        .reduce((sum, lead) => sum + lead.score, 0) / 
        filteredLeads.filter(lead => lead.stage === stage.id).length || 0
    }))
  };

  const updateFilters = (newFilters: Partial<PipelineFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      stages: [],
      owners: [],
      sources: [],
      tags: [],
      scoreRange: [0, 100],
      valueRange: [0, 1000000],
      dateRange: {}
    });
  };

  const moveLeadToStage = (leadId: string, newStageId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, stage: newStageId, updatedAt: new Date().toISOString() }
        : lead
    ));
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setLeads(prev => [...prev, newLead]);
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
        : lead
    ));
  };

  const deleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return {
    pipelines,
    currentPipeline: organizedPipeline,
    leads: filteredLeads,
    filters,
    viewMode,
    sortBy,
    loading,
    autoRefresh,
    stats,
    setCurrentPipeline,
    updateFilters,
    clearFilters,
    setViewMode,
    setSortBy,
    setAutoRefresh,
    moveLeadToStage,
    addLead,
    updateLead,
    deleteLead,
    refreshData
  };
};