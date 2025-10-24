import { useState, useEffect } from 'react';
import TemplateHeader from '../shared/components/TemplateHeader';
import TemplateList from '../shared/components/TemplateList';
import TemplateStats from '../shared/components/TemplateStats';
import TemplateDetailDrawer from '../shared/components/TemplateDetailDrawer';
import { Template, TemplateFilters } from '../shared/types/template';

// Mock data for SMS templates
const mockSMSTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome SMS',
    subject: undefined, // SMS doesn't have subjects
    content: 'Hi {{firstName}}! Welcome to our platform. Your account is now active. Reply STOP to opt out.',
    type: 'sms',
    status: 'published',
    category: 'Onboarding',
    tags: ['welcome', 'onboarding'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    lastModified: '2024-01-15T10:30:00Z',
    usage: 2150,
    usedIn: ['Welcome Workflow', 'User Onboarding Campaign'],
    openRate: 98.5, // SMS delivery rate
    variables: ['firstName', 'lastName', 'phone']
  },
  {
    id: '2',
    name: 'OTP Verification',
    subject: undefined,
    content: 'Your verification code is {{otpCode}}. Valid for 5 minutes. Do not share this code with anyone.',
    type: 'sms',
    status: 'published',
    category: 'Security',
    tags: ['security', 'otp', 'verification'],
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    lastModified: '2024-01-12T09:15:00Z',
    usage: 5890,
    usedIn: ['Login Flow', 'Registration Process'],
    openRate: 99.2,
    variables: ['otpCode', 'expiryTime']
  },
  {
    id: '3',
    name: 'Appointment Reminder',
    subject: undefined,
    content: 'Hi {{firstName}}, reminder: You have an appointment tomorrow at {{appointmentTime}}. Reply YES to confirm or NO to reschedule.',
    type: 'sms',
    status: 'published',
    category: 'Reminders',
    tags: ['appointment', 'reminder'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-20T16:45:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    lastModified: '2024-01-22T11:30:00Z',
    usage: 1240,
    usedIn: ['Appointment System', 'Healthcare Workflow'],
    openRate: 97.8,
    variables: ['firstName', 'appointmentTime', 'appointmentDate']
  },
  {
    id: '4',
    name: 'Order Status Update',
    subject: undefined,
    content: 'Hi {{firstName}}, your order #{{orderNumber}} is now {{status}}. Track: {{trackingLink}}',
    type: 'sms',
    status: 'published',
    category: 'Transactional',
    tags: ['order', 'status', 'ecommerce'],
    createdBy: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-08T14:30:00Z',
    lastModified: '2024-01-08T14:30:00Z',
    usage: 3240,
    usedIn: ['Order Processing Workflow', 'E-commerce Campaign'],
    openRate: 98.1,
    variables: ['firstName', 'orderNumber', 'status', 'trackingLink']
  },
  {
    id: '5',
    name: 'Payment Reminder',
    subject: undefined,
    content: 'Hi {{firstName}}, your payment of ${{amount}} is due on {{dueDate}}. Pay now: {{paymentLink}}',
    type: 'sms',
    status: 'published',
    category: 'Billing',
    tags: ['payment', 'reminder', 'billing'],
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-12T11:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
    lastModified: '2024-01-18T16:20:00Z',
    usage: 867,
    usedIn: ['Billing Workflow', 'Payment Reminders'],
    openRate: 96.4,
    variables: ['firstName', 'amount', 'dueDate', 'paymentLink']
  },
  {
    id: '6',
    name: 'Promotional Offer',
    subject: undefined,
    content: 'Hi {{firstName}}! 🎉 Get {{discount}}% off your next purchase. Use code: {{promoCode}}. Valid until {{expiryDate}}. Shop now!',
    type: 'sms',
    status: 'draft',
    category: 'Marketing',
    tags: ['promotion', 'discount', 'marketing'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2023-12-20T13:45:00Z',
    updatedAt: '2023-12-22T10:30:00Z',
    lastModified: '2023-12-22T10:30:00Z',
    usage: 0,
    usedIn: [],
    openRate: undefined,
    variables: ['firstName', 'discount', 'promoCode', 'expiryDate']
  },
  {
    id: '7',
    name: 'Event Notification',
    subject: undefined,
    content: 'Hi {{firstName}}, {{eventName}} starts in 1 hour at {{venue}}. See you there!',
    type: 'sms',
    status: 'published',
    category: 'Events',
    tags: ['event', 'notification'],
    createdBy: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-25T08:00:00Z',
    updatedAt: '2024-01-25T08:00:00Z',
    lastModified: '2024-01-25T08:00:00Z',
    usage: 445,
    usedIn: ['Event Management System'],
    openRate: 97.2,
    variables: ['firstName', 'eventName', 'venue', 'eventTime']
  }
];

export default function SMSTemplates() {
  const [templates, setTemplates] = useState<Template[]>(mockSMSTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockSMSTemplates);
  const [filters, setFilters] = useState<TemplateFilters>({});
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);

  // Filter templates based on current filters
  useEffect(() => {
    let filtered = templates;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchLower) ||
        template.content.toLowerCase().includes(searchLower) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.status) {
      filtered = filtered.filter(template => template.status === filters.status);
    }

    if (filters.type) {
      // For SMS templates, we might filter by SMS type categories
      filtered = filtered.filter(template => 
        template.tags.includes(filters.type!) || template.category?.toLowerCase().includes(filters.type!.toLowerCase())
      );
    }

    if (filters.usage) {
      filtered = filtered.filter(template => {
        switch (filters.usage) {
          case 'high':
            return template.usage >= 1000;
          case 'medium':
            return template.usage >= 100 && template.usage < 1000;
          case 'low':
            return template.usage >= 1 && template.usage < 100;
          case 'unused':
            return template.usage === 0;
          default:
            return true;
        }
      });
    }

    setFilteredTemplates(filtered);
  }, [templates, filters]);

  const handleCreateTemplate = () => {
    console.log('Create new SMS template');
    // TODO: Open create SMS template modal
  };

  const handleAIGenerate = () => {
    console.log('Generate SMS template with AI');
    // TODO: Open AI generation modal for SMS
  };

  const handleImport = () => {
    console.log('Import SMS templates');
    // TODO: Handle SMS template import
  };

  const handleExport = () => {
    console.log('Export SMS templates');
    // TODO: Handle SMS template export
  };

  const handleViewLogs = () => {
    console.log('View SMS logs');
    // TODO: Open SMS logs view
  };

  const handleEditTemplate = (template: Template) => {
    console.log('Edit SMS template:', template.id);
    // TODO: Open edit SMS template modal/page
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicated = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usage: 0,
      status: 'draft' as const
    };
    setTemplates([duplicated, ...templates]);
  };

  const handleDeleteTemplate = (template: Template) => {
    if (confirm(`Are you sure you want to delete "${template.name}"?`)) {
      setTemplates(templates.filter(t => t.id !== template.id));
    }
  };

  const handlePreviewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setShowDetailDrawer(true);
  };

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setShowDetailDrawer(true);
  };

  const handleSaveTemplate = (updatedTemplate: Template) => {
    setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
  };

  const handleCloseDrawer = () => {
    setShowDetailDrawer(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TemplateHeader
        title="SMS Templates"
        breadcrumb={['Dashboard', 'Communications', 'SMS Templates']}
        filters={filters}
        onFiltersChange={setFilters}
        onCreateTemplate={handleCreateTemplate}
        onAIGenerate={handleAIGenerate}
        onImport={handleImport}
        onExport={handleExport}
        onViewLogs={handleViewLogs}
      />

      <div className="px-6 py-6">
        <TemplateStats templates={templates} />
        
        <div className="mt-6">
          <TemplateList
            templates={filteredTemplates}
            onEdit={handleEditTemplate}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
            onPreview={handlePreviewTemplate}
            onTemplateClick={handleTemplateClick}
          />
        </div>
      </div>

      <TemplateDetailDrawer
        template={selectedTemplate}
        isOpen={showDetailDrawer}
        onClose={handleCloseDrawer}
        onSave={handleSaveTemplate}
        onDelete={handleDeleteTemplate}
      />
    </div>
  );
}