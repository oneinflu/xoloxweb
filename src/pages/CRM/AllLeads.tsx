/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import {
  Search,
  Plus,
  Zap,
  Users,
  Calendar,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MessageSquare,
  Trash,
  Edit,
  UserPlus,
  AlertTriangle,
  ChevronDown,
  Copy,
  X,
  Clock,
  FileText,
  Bot,
  Workflow,
  MapPin,
  Settings,
  ChevronRight,
  Save,
  Star,
  CheckCircle,
  BrainCircuit,
  Link,
  BookOpen,
  User2,
  CalendarClock,
  Send,
  File,
  Paperclip,
  Circle,
  RefreshCw,
  CreditCard,
  Maximize2,
  Minimize2,
  GripVertical
} from 'lucide-react';

// Types
interface LeadActivity {
  id: string;
  type: 'call' | 'email' | 'whatsapp' | 'note' | 'status' | 'workflow' | 'file' | 'meeting' | 'payment' | 'task';
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
  sentiment?: 'positive' | 'neutral' | 'negative';
  details?: string;
  attachments?: { name: string; url: string }[];
  importance?: 'normal' | 'high';
}

const TimelineEvent = ({ activity }: { activity: LeadActivity }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getEventIcon = () => {
    switch (activity.type) {
      case 'call':
        return <Phone className="w-4 h-4 text-blue-500" />;
      case 'email':
        return <Mail className="w-4 h-4 text-green-500" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'note':
        return <FileText className="w-4 h-4 text-yellow-500" />;
      case 'status':
        return <RefreshCw className="w-4 h-4 text-purple-500" />;
      case 'workflow':
        return <Workflow className="w-4 h-4 text-orange-500" />;
      case 'file':
        return <File className="w-4 h-4 text-gray-500" />;
      case 'meeting':
        return <CalendarClock className="w-4 h-4 text-indigo-500" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-green-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSentimentColor = () => {
    switch (activity.sentiment) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="relative">
      <div className={`absolute -left-3.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getSentimentColor()}`} />
      
      <div 
        className={`ml-4 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 cursor-pointer transition-all ${
          activity.importance === 'high' ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              {getEventIcon()}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.description}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                <span>{activity.timestamp}</span>
                {activity.user && (
                  <>
                    <span>•</span>
                    <span>{activity.user.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <button 
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BrainCircuit className="w-4 h-4" />
          </button>
        </div>

        {isExpanded && activity.details && (
          <div className="mt-4 pt-4 border-t dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {activity.details}
            </div>
            {activity.attachments && activity.attachments.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {activity.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <Paperclip className="w-3 h-3 mr-1" />
                    {attachment.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface LeadAutomation {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  triggers: string[];
}

interface LeadAIInsight {
  conversionProbability: number;
  expectedTimeToConvert: string;
  recommendations: string[];
  riskFactors: string[];
}

// Additional lead-related types can be added here

interface Lead {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  source: 'Ads' | 'Website' | 'Referral' | 'Other';
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Converted' | 'Lost';
  owner: {
    name: string;
    avatar: string;
  };
  aiScore: number;
  createdAt: string;
  lastActivity: {
    time: string;
    action: string;
  };
  // Additional fields for detail view
  course?: string;
  budget?: string;
  location?: string;
  tags?: string[];
  type?: 'Student' | 'Parent' | 'Corporate';
  timeline?: LeadActivity[];
  automations?: LeadAutomation[];
  aiInsights?: LeadAIInsight;
  files?: Array<{
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
  }>;
}

interface AIInsights {
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  predictedConversions: number;
  recommendations: Array<{
    message: string;
    action: string;
    count: number;
  }>;
  anomalies: Array<{
    type: string;
    count: number;
  }>;
}

interface PipelineStats {
  totalLeads: number;
  newLeadsToday: number;
  contactedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  conversionRate: number;
}

interface Filter {
  type: string;
  value: string;
}

const AllLeads = () => {
  // States
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters] = useState<Filter[]>([]);

  // Filter states
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [scoreRange, setScoreRange] = useState<{ min: number; max: number }>({ min: 0, max: 100 });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'timeline' | 'tasks' | 'files' | 'ai-insights' | 'automation'>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Column management
  type ColumnKey = 'lead' | 'contact' | 'source' | 'status' | 'owner' | 'score' | 'created' | 'lastActivity' | 'actions';
  interface Column { key: ColumnKey; label: string; visible: boolean; }
  const initialColumns: Column[] = [
    { key: 'lead', label: 'Lead', visible: true },
    { key: 'contact', label: 'Contact', visible: true },
    { key: 'source', label: 'Source', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'owner', label: 'Owner', visible: true },
    { key: 'score', label: 'Score', visible: true },
    { key: 'created', label: 'Created', visible: true },
    { key: 'lastActivity', label: 'Last Activity', visible: true },
    { key: 'actions', label: 'Actions', visible: true }
  ];
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [dragKey, setDragKey] = useState<ColumnKey | null>(null);
  const [dragOverKey, setDragOverKey] = useState<ColumnKey | null>(null);
  const [showColumnManager, setShowColumnManager] = useState(false);

  const onDragStart = (key: ColumnKey) => {
    setDragKey(key);
  };
  const onDrop = (targetKey: ColumnKey) => {
    if (!dragKey || dragKey === targetKey) {
      setDragOverKey(null);
      return;
    }
    const next = [...columns];
    const from = next.findIndex(c => c.key === dragKey);
    const to = next.findIndex(c => c.key === targetKey);
    if (from === -1 || to === -1) {
      setDragKey(null);
      setDragOverKey(null);
      return;
    }
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setColumns(next);
    setDragKey(null);
    setDragOverKey(null);
  };
  const toggleColumnVisibility = (key: ColumnKey) => {
    setColumns(cols => cols.map(c => c.key === key ? { ...c, visible: !c.visible } : c));
  };
  
 
  // Mock data for leads
  const mockLeads: Lead[] = [
    {
      id: "LEAD-2024-001",
      name: "Sarah Johnson",
      avatar: "/images/user/avatar-1.png",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      source: "Website",
      status: "Qualified",
      owner: {
        name: "Alex Turner",
        avatar: "/images/user/avatar-2.png"
      },
      aiScore: 85,
      createdAt: "2024-03-15",
      lastActivity: {
        time: "2 hrs ago",
        action: "Email Sent"
      },
      course: "Full Stack Development",
      budget: "$10,000",
      location: "San Francisco, CA",
      tags: ["High Priority", "Tech Interest", "Follow Up"],
      type: "Student",
      timeline: [
        {
          type: 'email',
          description: 'Sent course curriculum details',
          timestamp: '2 hrs ago',
          user: {
            name: 'Alex Turner',
            avatar: '/images/user/avatar-2.png'
          },
          sentiment: 'positive',
          details: 'Detailed course curriculum and learning path sent. Included information about practical projects and industry certifications.',
          attachments: [{ name: 'FullStack_Curriculum_2024.pdf', url: '#' }],
          importance: 'high',
          id: 'evt-001'
        },
        {
          type: 'call',
          description: 'Initial consultation call completed',
          timestamp: 'Yesterday',
          user: {
            name: 'Alex Turner',
            avatar: '/images/user/avatar-2.png'
          },
          sentiment: 'positive',
          details: 'Discussed career goals and learning objectives. Strong interest in full stack development. Prefers weekend batches.',
          importance: 'normal',
          id: 'evt-002'
        },
        {
          type: 'whatsapp',
          description: 'Follow-up message sent',
          timestamp: 'Yesterday',
          user: {
            name: 'Alex Turner',
            avatar: '/images/user/avatar-2.png'
          },
          sentiment: 'neutral',
          details: 'Sent course schedule options and payment plan details',
          id: 'evt-003'
        }
      ],
      automations: [
        {
          id: "auto-001",
          name: "Welcome Sequence",
          status: "active",
          triggers: ["Lead Created", "Email Opened"]
        }
      ],
      aiInsights: {
        conversionProbability: 85,
        expectedTimeToConvert: "3 days",
        recommendations: [
          "Schedule a demo session",
          "Share success stories",
          "Discuss payment plans"
        ],
        riskFactors: [
          "Price sensitivity",
          "Evaluating competitors"
        ]
      },
      files: [
        {
          name: "Course_Brochure.pdf",
          type: "PDF",
          size: "2.5MB",
          uploadedAt: "2024-03-15"
        }
      ]
    },
    {
      id: "LEAD-2024-002",
      name: "Michael Chen",
      avatar: "/images/user/avatar-3.png",
      email: "m.chen@example.com",
      phone: "+1 (555) 234-5678",
      source: "Ads",
      status: "New",
      owner: {
        name: "Emma Wilson",
        avatar: "/images/user/avatar-4.png"
      },
      aiScore: 92,
      createdAt: "2024-03-14",
      lastActivity: {
        time: "5 mins ago",
        action: "Viewed Proposal"
      }
    },
    {
      id: "LEAD-2024-003",
      name: "David Smith",
      avatar: "/images/user/avatar-5.png",
      email: "david.s@example.com",
      phone: "+1 (555) 345-6789",
      source: "Referral",
      status: "Contacted",
      owner: {
        name: "Sophie Brown",
        avatar: "/images/user/avatar-6.png"
      },
      aiScore: 78,
      createdAt: "2024-03-14",
      lastActivity: {
        time: "1 day ago",
        action: "Call Scheduled"
      }
    },
    {
      id: "LEAD-2024-004",
      name: "Emily Davis",
      avatar: "/images/user/avatar-7.png",
      email: "emily.d@example.com",
      phone: "+1 (555) 456-7890",
      source: "Website",
      status: "Proposal",
      owner: {
        name: "James Miller",
        avatar: "/images/user/avatar-8.png"
      },
      aiScore: 95,
      createdAt: "2024-03-13",
      lastActivity: {
        time: "30 mins ago",
        action: "Meeting Completed"
      }
    }
  ];

  // Pipeline stats
  const pipelineStats: PipelineStats = {
    totalLeads: 12485,
    newLeadsToday: 42,
    contactedLeads: 285,
    convertedLeads: 68,
    lostLeads: 16,
    conversionRate: 14.8
  };

  // Derived filtered leads based on search and status toggles
  const statuses = ['New','Contacted','Qualified','Proposal','Converted','Lost'];
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>([]);
  const toggleStatusFilter = (status: string) => {
    setActiveStatusFilters(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };
  const filteredLeads = mockLeads.filter(lead => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q === '' || [lead.name, lead.email, lead.phone, lead.id].some(v => v.toLowerCase().includes(q));
    const matchesStatus = activeStatusFilters.length === 0 || activeStatusFilters.includes(lead.status);
    return matchesSearch && matchesStatus;
  });

  const aiInsights: AIInsights = {
    hotLeads: 52,
    warmLeads: 213,
    coldLeads: 88,
    predictedConversions: 14,
    recommendations: [
      {
        message: "Follow up with silent leads",
        action: "Send WhatsApp",
        count: 6
      }
    ],
    anomalies: [
      {
        type: "incomplete_data",
        count: 3
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
      {/* ROW 1 - Header / Context Bar */}
      <div className="mb-6">
        {/* Title and Breadcrumb */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            All Leads
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Dashboard / CRM / All Leads
          </div>
        </div>

        {/* Search and Filters Row */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Global Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search leads by name, email, phone or ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 flex-wrap">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Status
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Assigned To
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200">
                <Zap className="w-4 h-4 mr-2" />
                Find Hot Leads
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowColumnManager(!showColumnManager)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Columns
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsFullscreen(true)}
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Screen
              </button>
            </div>
          </div>

          {/* Status Toggles */}
          <div className="flex flex-wrap gap-2 mb-3">
            {statuses.map((s) => {
              const active = activeStatusFilters.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleStatusFilter(s)}
                  className={`px-3 py-1 rounded-full text-sm border ${active ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600'}`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {activeFilters.map((filter, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                >
                  {`${filter.type}: ${filter.value}`}
                  <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                </span>
              ))}
            </div>
          )}

          {/* Column Manager Panel */}
          {showColumnManager && (
            <div className="mt-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Show/Hide Columns</div>
              <div className="flex flex-wrap gap-3">
                {columns.map((col) => (
                  <label key={col.key} className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => toggleColumnVisibility(col.key)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ROW 2 - AI Insights Bar */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {/* AI Lead Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex-1">
            <div className="flex items-center gap-2 text-lg font-medium">
              <span className="text-red-500">{aiInsights.hotLeads} Hot</span>
              <span className="text-gray-300">·</span>
              <span className="text-yellow-500">{aiInsights.warmLeads} Warm</span>
              <span className="text-gray-300">·</span>
              <span className="text-blue-500">{aiInsights.coldLeads} Cold</span>
            </div>
          </div>

          {/* Predicted Conversions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex-1">
            <div className="text-lg font-medium">
              {aiInsights.predictedConversions} expected conversions in next 7 days
            </div>
          </div>

          {/* AI Recommendations */}
          {aiInsights.recommendations.map((rec, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex-1">
              <div className="flex items-center justify-between">
                <div className="text-lg">
                  {rec.message} ({rec.count})
                </div>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                  {rec.action}
                </button>
              </div>
            </div>
          ))}

          {/* Anomaly Detection */}
          {aiInsights.anomalies.map((anomaly, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex-1">
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span>{anomaly.count} leads with incomplete contact data</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 3 - Pipeline Stats */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {Object.entries(pipelineStats).map(([key, value], index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-2xl font-semibold mt-1">
              {typeof value === 'number' && key === 'conversionRate'
                ? `${value}%`
                : value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* ROW 4 - Leads Table */}
      <div className={isFullscreen ? "fixed inset-0 z-[999998] p-4 bg-white dark:bg-gray-900 overflow-auto" : "bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"}>
        {isFullscreen && (
          <div className="flex items-center justify-end mb-3">
            <button onClick={() => setIsFullscreen(false)} className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Minimize2 className="w-4 h-4 mr-2" /> Exit Full Screen
            </button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-700">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                </th>
                {columns.filter(c => c.visible).map((col) => (
                  <th
                    key={col.key}
                    draggable
                    onDragStart={() => onDragStart(col.key)}
                    onDragOver={(e) => { e.preventDefault(); setDragOverKey(col.key); }}
                    onDragEnter={() => setDragOverKey(col.key)}
                    onDragEnd={() => { setDragKey(null); setDragOverKey(null); }}
                    onDrop={() => onDrop(col.key)}
                    className={`px-6 py-3 ${col.key === 'actions' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-move ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}
                    aria-label={`Drag to reorder ${col.label} column`}
                  >
                    <div className={`flex items-center ${col.key === 'actions' ? 'justify-end' : 'justify-start'} gap-2`}>
                      <span>{col.label}</span>
                      <GripVertical className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLeads.map((lead) => (
                  <tr
                      key={lead.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 group cursor-pointer"
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.tagName !== 'INPUT' && target.tagName !== 'BUTTON' && !target.closest('button')) {
                          setSelectedLead(lead);
                          setIsDetailDrawerOpen(true);
                          setActiveDetailTab('overview');
                        }
                      }}
                    >
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/30">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads([...selectedLeads, lead.id]);
                        } else {
                          setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                        }
                      }}
                    />
                  </td>
                  {columns.filter(c => c.visible).map((col) => {
                    switch (col.key) {
                      case 'lead':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <div className="flex items-center">
                              <div className="ml-0">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {lead.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  ID: {lead.id}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      case 'contact':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <div className="text-sm text-gray-900 dark:text-white group-hover:hidden">
                              {lead.email}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:hidden">
                              {lead.phone}
                            </div>
                            <div className="hidden group-hover:flex space-x-2">
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded" title="Copy Email">
                                <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded" title="Send Email">
                                <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded" title="Call">
                                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded" title="Send Message">
                                <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              </button>
                            </div>
                          </td>
                        );
                      case 'source':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${lead.source === 'Website' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                              lead.source === 'Ads' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                              {lead.source}
                            </span>
                          </td>
                        );
                      case 'status':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <select
                              value={lead.status}
                              onChange={() => {/* Handle status change */}}
                              className="text-sm border-0 bg-transparent focus:ring-0 cursor-pointer
                                ${lead.status === 'New' ? 'text-blue-600 dark:text-blue-400' :
                                lead.status === 'Contacted' ? 'text-yellow-600 dark:text-yellow-400' :
                                lead.status === 'Qualified' ? 'text-green-600 dark:text-green-400' :
                                lead.status === 'Proposal' ? 'text-purple-600 dark:text-purple-400' :
                                lead.status === 'Converted' ? 'text-emerald-600 dark:text-emerald-400' :
                                'text-red-600 dark:text-red-400'}"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Proposal">Proposal</option>
                              <option value="Converted">Converted</option>
                              <option value="Lost">Lost</option>
                            </select>
                          </td>
                        );
                      case 'owner':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <div className="flex items-center">
                              <div className="ml-0 text-sm text-gray-900 dark:text-white">
                                {lead.owner.name}
                              </div>
                            </div>
                          </td>
                        );
                      case 'score':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${lead.aiScore >= 90 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              lead.aiScore >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                              {lead.aiScore}
                            </span>
                          </td>
                        );
                      case 'created':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <div className="text-sm text-gray-900 dark:text-white">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                        );
                      case 'lastActivity':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {lead.lastActivity.time} - {lead.lastActivity.action}
                            </div>
                          </td>
                        );
                      case 'actions':
                        return (
                          <td key={col.key} className={`px-6 py-4 whitespace-nowrap text-right ${dragOverKey === col.key ? 'border-l-2 border-blue-500 ring-1 ring-blue-400 ring-inset' : ''} ${dragKey === col.key ? 'opacity-60' : ''}`}>
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        );
                      default:
                        return null;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backdrop */}
      {isDetailDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-999998"
          onClick={() => setIsDetailDrawerOpen(false)}
        />
      )}

      {/* Lead Detail Drawer */}
      {isDetailDrawerOpen && selectedLead && (
        <div className="fixed inset-y-0 right-0 w-[800px] bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-999999">
          {/* Drawer Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {selectedLead.name}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${selectedLead.aiScore >= 90 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    selectedLead.aiScore >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                    Score: {selectedLead.aiScore}
                  </span>
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{selectedLead.email}</span>
              </div>
            </div>
            <button
              onClick={() => setIsDetailDrawerOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b dark:border-gray-700">
            <div className="flex space-x-4 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Users },
                { id: 'timeline', label: 'Timeline', icon: Clock },
                { id: 'tasks', label: 'Tasks', icon: CheckCircle },
                { id: 'files', label: 'Files', icon: FileText },
                { id: 'ai-insights', label: 'AI Insights', icon: BrainCircuit },
                { id: 'automation', label: 'Automation', icon: Workflow }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                    ${activeDetailTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
            {activeDetailTab === 'overview' && (
              <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          {selectedLead.name}
                          <span className="text-sm text-gray-500 dark:text-gray-400">#{selectedLead.id}</span>
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {selectedLead.status}
                          </span>
                          <button 
                            onClick={() => {/* Open AI modal */}}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            <BrainCircuit className="w-3 h-3 mr-1" />
                            Score: {selectedLead.aiScore}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Lead Info Block */}
                    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Lead Information</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Email', value: selectedLead.email, icon: Mail },
                          { label: 'Phone', value: selectedLead.phone, icon: Phone },
                          { label: 'Location', value: `${selectedLead.location || 'Not specified'}`, icon: MapPin },
                          { label: 'Course', value: selectedLead.course || 'Not specified', icon: BookOpen },
                          { label: 'Source', value: selectedLead.source, icon: Link }
                        ].map((field, index) => (
                          <div key={index} className="group relative">
                            <div className="flex items-center">
                              <field.icon className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{field.label}</div>
                                <input
                                  type="text"
                                  value={field.value}
                                  onChange={() => {/* Handle inline edit */}}
                                  className="mt-1 text-sm font-medium text-gray-900 dark:text-white bg-transparent border-0 border-b border-transparent focus:ring-0 focus:border-blue-500 p-0 w-full"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lead Owner Block */}
                    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Lead Owner</h4>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700">
                          Change Owner
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <User2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedLead.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Lead Counsellor
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags / Labels */}
                    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {(selectedLead.tags || []).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {tag}
                            <button className="ml-1.5 text-blue-600 hover:text-blue-800">×</button>
                          </span>
                        ))}
                        <button className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* AI Snapshot */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">AI Prediction</h4>
                          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                            Lead likely to convert in 3 days
                            <span className="block text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                              85% confidence
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Next Step Suggestion */}
                    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Next Step</h4>
                      <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <CalendarClock className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-green-900 dark:text-green-100">
                              Schedule Demo Call
                            </div>
                            <div className="text-xs text-green-700 dark:text-green-300 mt-0.5">
                              Tomorrow at 11:00 AM
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </button>
                    </div>

                    {/* Notes Widget */}
                    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Notes</h4>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700">
                          View All
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Add a note..."
                            className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          {[
                            { text: 'Interested in full stack development course', time: '2 hours ago' },
                            { text: 'Follow up scheduled for next week', time: 'Yesterday' }
                          ].map((note, index) => (
                            <div key={index} className="text-sm">
                              <p className="text-gray-900 dark:text-white">{note.text}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{note.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === 'timeline' && selectedLead.timeline && (
              <div className="space-y-6">
                {/* AI Summary Bar */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <span className="font-medium">This Week: </span>
                      3 follow-ups, 1 missed call, 1 conversion event
                    </div>
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center space-x-2 pb-4 overflow-x-auto">
                  {['All', 'Calls', 'Emails', 'WhatsApp', 'Status', 'Notes', 'Automation'].map((filter) => (
                    <button
                      key={filter}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        filter === 'All'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Add Event Button */}
                <button className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 group">
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                    Add Event
                  </span>
                </button>

                {/* Timeline Feed */}
                <div className="relative pl-6 space-y-8">
                  {/* Timeline Line */}
                  <div className="absolute left-2.5 top-0 h-full w-px bg-blue-200 dark:bg-blue-900/50"></div>

                  {/* Today Section */}
                  <div>
                    <div className="sticky top-0 bg-white dark:bg-gray-800 py-2 -ml-6 pl-6 font-medium text-gray-900 dark:text-white z-10">
                      Today
                    </div>
                    <div className="space-y-6 mt-4">
                      {selectedLead.timeline
                        .filter(activity => activity.timestamp.includes('ago'))
                        .map((activity, index) => (
                          <TimelineEvent key={index} activity={activity} />
                        ))}
                    </div>
                  </div>

                  {/* Yesterday Section */}
                  <div>
                    <div className="sticky top-0 bg-white dark:bg-gray-800 py-2 -ml-6 pl-6 font-medium text-gray-900 dark:text-white z-10">
                      Yesterday
                    </div>
                    <div className="space-y-6 mt-4">
                      {selectedLead.timeline
                        .filter(activity => activity.timestamp.includes('Yesterday'))
                        .map((activity, index) => (
                          <TimelineEvent key={index} activity={activity} />
                        ))}
                    </div>
                  </div>

                  {/* Older Section */}
                  <div>
                    <div className="sticky top-0 bg-white dark:bg-gray-800 py-2 -ml-6 pl-6 font-medium text-gray-900 dark:text-white z-10">
                      Older
                    </div>
                    <div className="space-y-6 mt-4">
                      {selectedLead.timeline
                        .filter(activity => !activity.timestamp.includes('ago') && !activity.timestamp.includes('Yesterday'))
                        .map((activity, index) => (
                          <TimelineEvent key={index} activity={activity} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === 'ai-insights' && selectedLead.aiInsights && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                      <BrainCircuit className="w-5 h-5 text-blue-500 mr-2" />
                      Lead Score Analysis
                    </h3>
                    <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                      {selectedLead.aiScore}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-lg font-medium text-blue-700 dark:text-blue-300">
                        {selectedLead.aiInsights.conversionProbability}% Likely to Convert
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        Expected within {selectedLead.aiInsights.expectedTimeToConvert}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Recommendations
                    </h3>
                    <div className="space-y-2">
                      {selectedLead.aiInsights.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center mb-4">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      Risk Factors
                    </h3>
                    <div className="space-y-2">
                      {selectedLead.aiInsights.riskFactors.map((risk, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span>{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      AI Model Insights
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analysis based on historical conversion patterns and engagement metrics
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Floating Update Button */}
          <div className="absolute bottom-6 right-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Update Lead</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-30">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                  <input
                    type="date"
                    className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  multiple
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  value={selectedStatuses}
                  onChange={(e) => setSelectedStatuses(Array.from(e.target.selectedOptions, option => option.value))}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Score Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Score Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scoreRange.max}
                    onChange={(e) => setScoreRange({ ...scoreRange, max: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{scoreRange.min}</span>
                    <span>{scoreRange.max}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                      <button
                        onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                        className="ml-1.5 text-blue-400 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply/Clear Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {/* Apply filters */}}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {/* Clear filters */}}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Panel - AI & Shortcuts */}
      {isRightPanelOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Assistant</h3>
              <button
                onClick={() => setIsRightPanelOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* AI Query Bar */}
            <div className="mb-6">
              <div className="relative">
                <Bot className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ask anything about your leads..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
              </div>
            </div>

            {/* Smart Lists */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Smart Lists</h4>
              <div className="space-y-2">
                {[
                  { name: 'Hot Leads', count: 24 },
                  { name: 'Unassigned Today', count: 12 },
                  { name: 'Follow-up Required', count: 8 }
                ].map((list, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{list.name}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {list.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Action Cards */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">AI Suggestions</h4>
              <div className="space-y-3">
                {[
                  {
                    title: 'Re-engage Cold Leads',
                    description: 'Send follow-up email to 6 leads',
                    action: 'Send Email'
                  },
                  {
                    title: 'Potential Hot Leads',
                    description: '3 leads showing high interest',
                    action: 'View Leads'
                  }
                ].map((card, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {card.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {card.description}
                    </div>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700">
                      {card.action} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions (Hidden by default) */}
      {selectedLeads.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {selectedLeads.length} leads selected
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Assign
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Edit className="w-4 h-4 mr-2" />
              Change Status
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLeads;