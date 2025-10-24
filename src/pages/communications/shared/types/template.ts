export interface WhatsAppButton {
  type: 'url' | 'phone' | 'quick_reply';
  text: string;
  url?: string;
  phone?: string;
}

export interface WhatsAppData {
  hasImage?: boolean;
  imageUrl?: string;
  hasButtons?: boolean;
  buttons?: WhatsAppButton[];
}

export interface Template {
  id: string;
  name: string;
  subject?: string;
  content: string;
  type: 'email' | 'sms' | 'whatsapp' | 'notification';
  status: 'published' | 'draft' | 'archived';
  tags: string[];
  category?: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastModified?: string;
  usage: number;
  usedIn?: string[];
  openRate?: number;
  variables: string[];
  whatsappData?: WhatsAppData;
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