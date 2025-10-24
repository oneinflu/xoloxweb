import { useState, useEffect } from 'react';
import TemplateHeader from '../shared/components/TemplateHeader';
import TemplateList from '../shared/components/TemplateList';
import TemplateStats from '../shared/components/TemplateStats';
import TemplateDetailDrawer from '../shared/components/TemplateDetailDrawer';
import { Template, TemplateFilters } from '../shared/types/template';

// Mock data for demonstration
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to our platform!',
    content: 'Welcome {{firstName}}! We\'re excited to have you on board...',
    type: 'email',
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
    usage: 1250,
    usedIn: ['Welcome Workflow', 'User Onboarding Campaign'],
    openRate: 85.2,
    variables: ['firstName', 'lastName', 'email']
  },
  {
    id: '2',
    name: 'Password Reset',
    subject: 'Reset your password',
    content: 'Hi {{firstName}}, click the link below to reset your password...',
    type: 'email',
    status: 'published',
    category: 'Security',
    tags: ['security', 'password'],
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    lastModified: '2024-01-12T09:15:00Z',
    usage: 890,
    usedIn: ['Password Reset Flow'],
    openRate: 92.7,
    variables: ['firstName', 'resetLink', 'expiryTime']
  },
  {
    id: '3',
    name: 'Monthly Newsletter',
    subject: 'Your monthly update is here!',
    content: 'Dear {{firstName}}, here\'s what happened this month...',
    type: 'email',
    status: 'draft',
    category: 'Newsletter',
    tags: ['newsletter', 'monthly'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-20T16:45:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    lastModified: '2024-01-22T11:30:00Z',
    usage: 0,
    usedIn: [],
    openRate: undefined,
    variables: ['firstName', 'monthlyStats', 'featuredContent']
  },
  {
    id: '4',
    name: 'Order Confirmation',
    subject: 'Your order #{{orderNumber}} has been confirmed',
    content: 'Thank you {{firstName}} for your order! Your order #{{orderNumber}} has been confirmed...',
    type: 'email',
    status: 'published',
    category: 'Transactional',
    tags: ['order', 'confirmation', 'ecommerce'],
    createdBy: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-08T14:30:00Z',
    lastModified: '2024-01-08T14:30:00Z',
    usage: 2340,
    usedIn: ['Order Processing Workflow', 'E-commerce Campaign'],
    openRate: 96.8,
    variables: ['firstName', 'orderNumber', 'orderItems', 'totalAmount']
  },
  {
    id: '5',
    name: 'Abandoned Cart Reminder',
    subject: 'Don\'t forget about your cart!',
    content: 'Hi {{firstName}}, you left some great items in your cart...',
    type: 'email',
    status: 'published',
    category: 'Marketing',
    tags: ['cart', 'reminder', 'marketing'],
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-12T11:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
    lastModified: '2024-01-18T16:20:00Z',
    usage: 567,
    usedIn: ['Cart Recovery Campaign'],
    openRate: 78.4,
    variables: ['firstName', 'cartItems', 'cartValue', 'checkoutLink']
  },
  {
    id: '6',
    name: 'Event Invitation',
    subject: 'You\'re invited to {{eventName}}!',
    content: 'Dear {{firstName}}, we\'re excited to invite you to our upcoming event...',
    type: 'email',
    status: 'archived',
    category: 'Events',
    tags: ['event', 'invitation'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2023-12-20T13:45:00Z',
    updatedAt: '2023-12-22T10:30:00Z',
    lastModified: '2023-12-22T10:30:00Z',
    usage: 145,
    usedIn: ['Holiday Event Campaign'],
    openRate: 67.3,
    variables: ['firstName', 'eventName', 'eventDate', 'eventLocation']
  }
];

export default function EmailTemplates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);
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
        template.subject?.toLowerCase().includes(searchLower) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.status) {
      filtered = filtered.filter(template => template.status === filters.status);
    }

    if (filters.type) {
      // For email templates, we might filter by email type categories
      filtered = filtered.filter(template => 
        template.tags.includes(filters.type!) || template.category?.toLowerCase().includes(filters.type!.toLowerCase())
      );
    }

    if (filters.usage) {
      filtered = filtered.filter(template => {
        switch (filters.usage) {
          case 'high':
            return template.usage >= 100;
          case 'medium':
            return template.usage >= 10 && template.usage < 100;
          case 'low':
            return template.usage >= 1 && template.usage < 10;
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
    console.log('Create new template');
    // TODO: Open create template modal
  };

  const handleAIGenerate = () => {
    console.log('Generate template with AI');
    // TODO: Open AI generation modal
  };

  const handleImport = () => {
    console.log('Import templates');
    // TODO: Handle template import
  };

  const handleExport = () => {
    console.log('Export templates');
    // TODO: Handle template export
  };

  const handleViewLogs = () => {
    console.log('View logs');
    // TODO: Open logs view
  };

  const handleEditTemplate = (template: Template) => {
    console.log('Edit template:', template.id);
    // TODO: Open edit template modal/page
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
        title="Email Templates"
        breadcrumb={['Dashboard', 'Communications', 'Email Templates']}
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