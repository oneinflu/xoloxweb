/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  environment: Environment;
  owner: string;
  addedBy: string;
  lastActivity: string;
  secretsStatus: SecretsStatus;
  usageCount: number;
  isInstalled: boolean;
  isConfigured: boolean;
  hasError: boolean;
  errorMessage?: string;
  version: string;
  documentation?: string;
  configurationSummary?: {
    endpoint?: string;
    lastTestResult?: string;
    credentials?: string;
  };
}

export type IntegrationCategory = 
  | 'payments'
  | 'whatsapp'
  | 'email'
  | 'logistics'
  | 'telecalling'
  | 'loan'
  | 'analytics'
  | 'custom-api'
  | 'webhooks';

export type IntegrationStatus = 
  | 'enabled'
  | 'disabled'
  | 'unconfigured'
  | 'error';

export type Environment = 'test' | 'production';

export type SecretsStatus = 
  | 'up-to-date'
  | 'expiring'
  | 'rotated'
  | 'expired';

export type FilterChip = 
  | 'all'
  | 'installed'
  | 'unconfigured'
  | 'errors';

export interface IntegrationFilters {
  search: string;
  category: IntegrationCategory | 'all';
  filterChip: FilterChip;
  environment?: Environment;
  status?: IntegrationStatus;
}

export interface CreateIntegrationData {
  name: string;
  category: IntegrationCategory;
  environment: Environment;
  configuration: Record<string, any>;
}

export interface UserPermission {
  role: 'super-admin' | 'admin' | 'integration-manager';
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canViewSecrets: boolean;
}

export interface CategoryInfo {
  id: IntegrationCategory;
  name: string;
  icon: string;
  installedCount: number;
  availableCount: number;
}