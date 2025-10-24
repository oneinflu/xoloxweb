import { useState,  useMemo } from 'react';
import { Integration, IntegrationFilters, CategoryInfo, UserPermission, Environment } from '../types/integration';

// Mock data
const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Razorpay',
    description: 'Payment Gateway Integration',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-u7Pqb-l6x5bO9qj9OVrO1cjW8pxuwAZSww&s',
    category: 'payments',
    status: 'enabled',
    environment: 'production',
    owner: 'John Doe',
    addedBy: 'John Doe',
    lastActivity: '2 hours ago',
    secretsStatus: 'up-to-date',
    usageCount: 15,
    isInstalled: true,
    isConfigured: true,
    hasError: false,
    version: '2.1.0',
    documentation: 'https://razorpay.com/docs',
    configurationSummary: {
      endpoint: 'https://api.razorpay.com/v1',
      lastTestResult: 'Success - 200ms',
      credentials: 'API Key configured'
    }
  },
  {
    id: '2',
    name: 'WhatsApp Business API',
    description: 'WhatsApp messaging integration',
    icon: 'https://images.template.net/78747/Free-WhatsApp-Business-Logo-Vector-1.jpg',
    category: 'whatsapp',
    status: 'enabled',
    environment: 'production',
    owner: 'Jane Smith',
    addedBy: 'Jane Smith',
    lastActivity: '1 day ago',
    secretsStatus: 'expiring',
    usageCount: 8,
    isInstalled: true,
    isConfigured: true,
    hasError: false,
    version: '1.5.2',
    documentation: 'https://developers.facebook.com/docs/whatsapp',
    configurationSummary: {
      endpoint: 'https://graph.facebook.com/v17.0',
      lastTestResult: 'Success - 150ms',
      credentials: 'Access token expires in 7 days'
    }
  },
  {
    id: '3',
    name: 'SendGrid',
    description: 'Email delivery service',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7vl8K9ufzkpsCkChHkz181-r-yDalG9zog&s',
    category: 'email',
    status: 'disabled',
    environment: 'test',
    owner: 'Mike Johnson',
    addedBy: 'Mike Johnson',
    lastActivity: '3 days ago',
    secretsStatus: 'up-to-date',
    usageCount: 3,
    isInstalled: true,
    isConfigured: true,
    hasError: false,
    version: '3.2.1',
    documentation: 'https://docs.sendgrid.com',
    configurationSummary: {
      endpoint: 'https://api.sendgrid.com/v3',
      lastTestResult: 'Success - 95ms',
      credentials: 'API Key configured'
    }
  },
  {
    id: '4',
    name: 'Delhivery',
    description: 'Logistics and shipping integration',
    icon: 'https://images.seeklogo.com/logo-png/35/1/delhivery-logo-png_seeklogo-356432.png',
    category: 'logistics',
    status: 'unconfigured',
    environment: 'test',
    owner: 'Sarah Wilson',
    addedBy: 'Sarah Wilson',
    lastActivity: 'Never',
    secretsStatus: 'up-to-date',
    usageCount: 0,
    isInstalled: true,
    isConfigured: false,
    hasError: false,
    version: '1.0.0',
    documentation: 'https://delhivery.com/api-docs'
  },
  {
    id: '5',
    name: 'Twilio Voice',
    description: 'Voice calling and SMS service',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twilio/twilio-original.svg',
    category: 'telecalling',
    status: 'error',
    environment: 'production',
    owner: 'David Brown',
    addedBy: 'David Brown',
    lastActivity: '5 hours ago',
    secretsStatus: 'expired',
    usageCount: 12,
    isInstalled: true,
    isConfigured: true,
    hasError: true,
    errorMessage: 'Authentication failed - Invalid credentials',
    version: '2.0.5',
    documentation: 'https://www.twilio.com/docs',
    configurationSummary: {
      endpoint: 'https://api.twilio.com/2010-04-01',
      lastTestResult: 'Error - 401 Unauthorized',
      credentials: 'Auth token expired'
    }
  }
];

const mockCategories: CategoryInfo[] = [
  { id: 'payments', name: 'Payments', icon: 'credit-card', installedCount: 1, availableCount: 5 },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'message-circle', installedCount: 1, availableCount: 3 },
  { id: 'email', name: 'Email', icon: 'mail', installedCount: 1, availableCount: 4 },
  { id: 'logistics', name: 'Logistics', icon: 'truck', installedCount: 1, availableCount: 6 },
  { id: 'telecalling', name: 'Telecalling', icon: 'phone', installedCount: 1, availableCount: 3 },
  { id: 'loan', name: 'Loan', icon: 'dollar-sign', installedCount: 0, availableCount: 2 },
  { id: 'analytics', name: 'Analytics', icon: 'bar-chart-3', installedCount: 0, availableCount: 4 },
  { id: 'custom-api', name: 'Custom API', icon: 'code', installedCount: 0, availableCount: 0 },
  { id: 'webhooks', name: 'Webhooks', icon: 'webhook', installedCount: 0, availableCount: 0 }
];

export const useIntegrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [categories] = useState<CategoryInfo[]>(mockCategories);
  const [filters, setFilters] = useState<IntegrationFilters>({
    search: '',
    category: 'all',
    filterChip: 'all'
  });
  const [catalogSearchQuery, setCatalogSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock user permission - in real app, this would come from auth context
  const userPermission: UserPermission = {
    role: 'admin',
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewSecrets: true
  };

  // Filter integrations based on current filters
  const filteredIntegrations = useMemo(() => {
    return integrations.filter(integration => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          integration.name.toLowerCase().includes(searchLower) ||
          integration.description.toLowerCase().includes(searchLower) ||
          integration.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'all' && integration.category !== filters.category) {
        return false;
      }

      // Filter chip
      switch (filters.filterChip) {
        case 'installed':
          return integration.isInstalled;
        case 'unconfigured':
          return !integration.isConfigured;
        case 'errors':
          return integration.hasError;
        default:
          break;
      }

      // Status filter
      if (filters.status && integration.status !== filters.status) {
        return false;
      }

      // Environment filter
      if (filters.environment && integration.environment !== filters.environment) {
        return false;
      }

      return true;
    });
  }, [integrations, filters]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: integrations.length,
      installed: integrations.filter(i => i.isInstalled).length,
      unconfigured: integrations.filter(i => !i.isConfigured).length,
      errors: integrations.filter(i => i.hasError).length
    };
  }, [integrations]);

  // Actions
  const updateFilters = (newFilters: Partial<IntegrationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const configureIntegration = async (id: string) => {
    console.log('Configure integration:', id);
    // In real app, navigate to configuration page
  };

  const testIntegration = async (id: string) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Test integration:', id);
      // Update integration with test result
    } finally {
      setLoading(false);
    }
  };

  const viewLogs = (id: string) => {
    console.log('View logs for integration:', id);
    // In real app, navigate to logs page
  };

  const toggleIntegrationStatus = async (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { 
            ...integration, 
            status: integration.status === 'enabled' ? 'disabled' : 'enabled' 
          }
        : integration
    ));
  };

  const duplicateIntegration = async (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      const newIntegration: Integration = {
        ...integration,
        id: Date.now().toString(),
        name: `${integration.name} (Copy)`,
        status: 'unconfigured',
        isConfigured: false,
        lastActivity: 'Never',
        usageCount: 0
      };
      setIntegrations(prev => [...prev, newIntegration]);
    }
  };

  const removeIntegration = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this integration?')) {
      setIntegrations(prev => prev.filter(integration => integration.id !== id));
    }
  };

  const viewUsage = (id: string) => {
    console.log('View usage for integration:', id);
    // In real app, show modal with dependent workflows/campaigns
  };

  const changeEnvironment = async (id: string, environment: Environment) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, environment }
        : integration
    ));
  };

  const handleBulkAction = async (action: string, ids: string[]) => {
    switch (action) {
      case 'enable':
        setIntegrations(prev => prev.map(integration => 
          ids.includes(integration.id) 
            ? { ...integration, status: 'enabled' }
            : integration
        ));
        break;
      case 'disable':
        setIntegrations(prev => prev.map(integration => 
          ids.includes(integration.id) 
            ? { ...integration, status: 'disabled' }
            : integration
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${ids.length} integrations?`)) {
          setIntegrations(prev => prev.filter(integration => !ids.includes(integration.id)));
        }
        break;
      case 'test':
        console.log('Testing integrations:', ids);
        break;
      case 'export':
        console.log('Exporting integrations:', ids);
        break;
    }
  };

  return {
    integrations: filteredIntegrations,
    categories,
    filters,
    catalogSearchQuery,
    stats,
    userPermission,
    loading,
    updateFilters,
    setCatalogSearchQuery,
    configureIntegration,
    testIntegration,
    viewLogs,
    toggleIntegrationStatus,
    duplicateIntegration,
    removeIntegration,
    viewUsage,
    changeEnvironment,
    handleBulkAction
  };
};