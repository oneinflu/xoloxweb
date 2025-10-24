export interface ApiKey {
  id: string;
  name: string;
  key: string;
  description?: string;
  permissions: ApiKeyPermission[];
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  lastUsed?: string;
  expiresAt?: string;
  createdBy: string;
  usageCount: number;
  rateLimit?: {
    requests: number;
    period: 'minute' | 'hour' | 'day';
  };
}

export interface ApiKeyPermission {
  resource: string;
  actions: ('read' | 'write' | 'delete')[];
}

export interface CreateApiKeyData {
  name: string;
  description?: string;
  permissions: ApiKeyPermission[];
  expiresAt?: string;
  rateLimit?: {
    requests: number;
    period: 'minute' | 'hour' | 'day';
  };
}

export interface ApiKeyFilters {
  search: string;
  status: 'all' | 'active' | 'inactive' | 'expired';
  permission: string;
}