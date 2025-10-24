
import { useState, useEffect } from 'react';
import { Organization, OrganizationFilters, OrganizationStats } from '../types/organization';

// Mock data for organizations
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    domain: 'techsolutions.com',
    logo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=3b82f6&color=fff',
    industry: 'Technology',
    size: 'medium',
    status: 'active',
    registrationDate: '2024-01-15',
    lastActivity: '2024-03-15',
    contactPerson: {
      name: 'John Smith',
      email: 'john@techsolutions.com',
      phone: '+1-555-0123',
      role: 'CEO'
    },
    subscription: {
      plan: 'pro',
      status: 'active',
      expiryDate: '2024-12-31'
    },
    usage: {
      users: 45,
      maxUsers: 100,
      storage: 2.5,
      maxStorage: 10,
      apiCalls: 15000,
      maxApiCalls: 50000
    },
    billing: {
      address: '123 Tech Street',
      city: 'San Francisco',
      country: 'USA',
      taxId: 'US123456789'
    },
    features: ['CRM', 'Automation', 'Analytics', 'Integrations'],
    integrations: 8,
    workflows: 12,
    leads: 1250
  },
  {
    id: '2',
    name: 'Global Marketing Agency',
    domain: 'globalmarketing.co',
    logo: 'https://ui-avatars.com/api/?name=Global+Marketing&background=10b981&color=fff',
    industry: 'Marketing',
    size: 'large',
    status: 'active',
    registrationDate: '2023-11-20',
    lastActivity: '2024-03-14',
    contactPerson: {
      name: 'Sarah Johnson',
      email: 'sarah@globalmarketing.co',
      phone: '+1-555-0456',
      role: 'Marketing Director'
    },
    subscription: {
      plan: 'enterprise',
      status: 'active',
      expiryDate: '2024-11-20'
    },
    usage: {
      users: 180,
      maxUsers: 500,
      storage: 8.2,
      maxStorage: 50,
      apiCalls: 45000,
      maxApiCalls: 200000
    },
    billing: {
      address: '456 Marketing Ave',
      city: 'New York',
      country: 'USA',
      taxId: 'US987654321'
    },
    features: ['CRM', 'Automation', 'Analytics', 'Integrations', 'White-label'],
    integrations: 15,
    workflows: 28,
    leads: 5600
  },
  {
    id: '3',
    name: 'StartupCo',
    domain: 'startupco.io',
    logo: 'https://ui-avatars.com/api/?name=StartupCo&background=f59e0b&color=fff',
    industry: 'SaaS',
    size: 'startup',
    status: 'pending',
    registrationDate: '2024-03-10',
    lastActivity: '2024-03-10',
    contactPerson: {
      name: 'Mike Chen',
      email: 'mike@startupco.io',
      phone: '+1-555-0789',
      role: 'Founder'
    },
    subscription: {
      plan: 'basic',
      status: 'trial'
    },
    usage: {
      users: 5,
      maxUsers: 25,
      storage: 0.5,
      maxStorage: 5,
      apiCalls: 1200,
      maxApiCalls: 10000
    },
    billing: {
      address: '789 Startup Blvd',
      city: 'Austin',
      country: 'USA'
    },
    features: ['CRM', 'Basic Automation'],
    integrations: 2,
    workflows: 3,
    leads: 85
  },
  {
    id: '4',
    name: 'Enterprise Corp',
    domain: 'enterprisecorp.com',
    logo: 'https://ui-avatars.com/api/?name=Enterprise+Corp&background=8b5cf6&color=fff',
    industry: 'Finance',
    size: 'enterprise',
    status: 'suspended',
    registrationDate: '2023-08-05',
    lastActivity: '2024-02-28',
    contactPerson: {
      name: 'Robert Wilson',
      email: 'robert@enterprisecorp.com',
      phone: '+1-555-0321',
      role: 'CTO'
    },
    subscription: {
      plan: 'enterprise',
      status: 'expired',
      expiryDate: '2024-02-28'
    },
    usage: {
      users: 350,
      maxUsers: 1000,
      storage: 25.8,
      maxStorage: 100,
      apiCalls: 95000,
      maxApiCalls: 500000
    },
    billing: {
      address: '321 Enterprise Way',
      city: 'Chicago',
      country: 'USA',
      taxId: 'US456789123'
    },
    features: ['CRM', 'Automation', 'Analytics', 'Integrations', 'White-label', 'Custom'],
    integrations: 25,
    workflows: 45,
    leads: 12500
  }
];

const mockStats: OrganizationStats = {
  total: 4,
  active: 2,
  pending: 1,
  suspended: 1,
  totalUsers: 580,
  totalRevenue: 125000,
  growthRate: 15.5
};

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filters, setFilters] = useState<OrganizationFilters>({
    search: '',
    status: [],
    industry: [],
    size: [],
    plan: [],
    registrationDateRange: {},
    sortBy: 'registrationDate',
    sortOrder: 'desc'
  });
  const [stats, setStats] = useState<OrganizationStats>(mockStats);
  const [loading, setLoading] = useState(false);

  // Load organizations
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrganizations(mockOrganizations);
      setLoading(false);
    }, 500);
  }, []);

  const updateFilters = (newFilters: Partial<OrganizationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const approveOrganization = (id: string) => {
    setOrganizations(prev => 
      prev.map(org => 
        org.id === id ? { ...org, status: 'active' as const } : org
      )
    );
  };

  const rejectOrganization = (id: string) => {
    setOrganizations(prev => 
      prev.map(org => 
        org.id === id ? { ...org, status: 'rejected' as const } : org
      )
    );
  };

  const suspendOrganization = (id: string) => {
    setOrganizations(prev => 
      prev.map(org => 
        org.id === id ? { ...org, status: 'suspended' as const } : org
      )
    );
  };

  const activateOrganization = (id: string) => {
    setOrganizations(prev => 
      prev.map(org => 
        org.id === id ? { ...org, status: 'active' as const } : org
      )
    );
  };

  const viewDetails = (id: string) => {
    console.log('View details for organization:', id);
  };

  const exportData = () => {
    console.log('Export organizations data');
  };

  const handleBulkAction = (action: string, ids: string[]) => {
    console.log('Bulk action:', action, 'for organizations:', ids);
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setOrganizations(mockOrganizations);
      setStats(mockStats);
      setLoading(false);
    }, 500);
  };

  // Filter organizations based on current filters
  const filteredOrganizations = organizations.filter(org => {
    if (filters.search && !org.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !org.domain.toLowerCase().includes(filters.search.toLowerCase()) &&
        !org.contactPerson.email.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    if (filters.status.length > 0 && !filters.status.includes(org.status)) {
      return false;
    }
    
    if (filters.industry.length > 0 && !filters.industry.includes(org.industry)) {
      return false;
    }
    
    if (filters.size.length > 0 && !filters.size.includes(org.size)) {
      return false;
    }
    
    if (filters.plan.length > 0 && !filters.plan.includes(org.subscription.plan)) {
      return false;
    }
    
    return true;
  });

  return {
    organizations: filteredOrganizations,
    filters,
    stats,
    loading,
    updateFilters,
    approveOrganization,
    rejectOrganization,
    suspendOrganization,
    activateOrganization,
    viewDetails,
    exportData,
    handleBulkAction,
    refreshData
  };
};