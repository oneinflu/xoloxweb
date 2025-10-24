import { useState, useEffect } from 'react';
import TemplateHeader from '../shared/components/TemplateHeader';
import TemplateList from '../shared/components/TemplateList';
import TemplateStats from '../shared/components/TemplateStats';
import { Template, TemplateFilters } from '../shared/types/template';

// Mock data for demonstration
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to our platform!',
    content: 'Welcome {{firstName}}! We\'re excited to have you on board...',
    type: 'email',
    status: 'active',
    tags: ['welcome', 'onboarding'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    usage: 1250,
    variables: ['firstName', 'lastName', 'email']
  },
  {
    id: '2',
    name: 'Password Reset',
    subject: 'Reset your password',
    content: 'Hi {{firstName}}, click the link below to reset your password...',
    type: 'email',
    status: 'active',
    tags: ['security', 'password'],
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    usage: 890,
    variables: ['firstName', 'resetLink', 'expiryTime']
  },
  {
    id: '3',
    name: 'Monthly Newsletter',
    subject: 'Your monthly update is here!',
    content: 'Dear {{firstName}}, here\'s what happened this month...',
    type: 'email',
    status: 'draft',
    tags: ['newsletter', 'monthly'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-20T16:45:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    usage: 0,
    variables: ['firstName', 'monthlyStats', 'featuredContent']
  }
];

export default function EmailTemplates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);
  const [filters, setFilters] = useState<TemplateFilters>({});

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
        template.tags.includes(filters.type!)
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
    console.log('Preview template:', template.id);
    // TODO: Open preview modal
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
          />
        </div>
      </div>
    </div>
  );
}