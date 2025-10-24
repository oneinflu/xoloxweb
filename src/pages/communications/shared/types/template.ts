export interface Template {
  id: string;
  name: string;
  subject?: string;
  content: string;
  type: 'email' | 'sms' | 'whatsapp' | 'notification';
  status: 'active' | 'draft' | 'archived';
  tags: string[];
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  usage: number;
  variables: string[];
}

export interface TemplateFilters {
  type?: string;
  usage?: string;
  createdBy?: string;
  status?: string;
  search?: string;
}

export interface CreateTemplateData {
  name: string;
  subject?: string;
  content: string;
  type: Template['type'];
  tags: string[];
}