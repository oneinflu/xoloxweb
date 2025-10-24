export interface Organization {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  registrationDate: string;
  lastActivity: string;
  contactPerson: {
    name: string;
    email: string;
    phone?: string;
    role: string;
  };
  subscription: {
    plan: 'free' | 'basic' | 'pro' | 'enterprise';
    status: 'active' | 'trial' | 'expired' | 'cancelled';
    expiryDate?: string;
  };
  usage: {
    users: number;
    maxUsers: number;
    storage: number;
    maxStorage: number;
    apiCalls: number;
    maxApiCalls: number;
  };
  billing: {
    address: string;
    city: string;
    country: string;
    taxId?: string;
  };
  features: string[];
  integrations: number;
  workflows: number;
  leads: number;
}

export interface OrganizationFilters {
  search: string;
  status: string[];
  industry: string[];
  size: string[];
  plan: string[];
  registrationDateRange: {
    start?: string;
    end?: string;
  };
  sortBy: 'name' | 'registrationDate' | 'lastActivity' | 'users';
  sortOrder: 'asc' | 'desc';
}

export interface OrganizationStats {
  total: number;
  active: number;
  pending: number;
  suspended: number;
  totalUsers: number;
  totalRevenue: number;
  growthRate: number;
}