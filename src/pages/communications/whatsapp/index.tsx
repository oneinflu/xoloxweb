import { useState, useEffect } from 'react';

import WhatsAppTemplateDetailDrawer from './components/WhatsAppTemplateDetailDrawer';
import { Template, TemplateFilters } from '../shared/types/template';
import TemplateHeader from '../shared/components/TemplateHeader';
import TemplateList from '../shared/components/TemplateList';
import TemplateStats from '../shared/components/TemplateStats';

// Mock data for WhatsApp templates
const mockWhatsAppTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Message',
    subject: undefined, // WhatsApp doesn't have subjects
    content: 'Hi {{firstName}}! 👋 Welcome to our platform. We\'re excited to have you on board! Feel free to reach out if you have any questions.',
    type: 'whatsapp',
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
    usage: 1850,
    usedIn: ['Welcome Workflow', 'User Onboarding Campaign'],
    openRate: 95.8,
    variables: ['firstName', 'lastName', 'phone'],
    whatsappData: {
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      hasButtons: true,
      buttons: [
        { type: 'url', text: 'Get Started', url: 'https://example.com/onboarding' },
        { type: 'phone', text: 'Call Support', phone: '+1-800-123-4567' }
      ]
    }
  },
  {
    id: '2',
    name: 'Order Confirmation',
    subject: undefined,
    content: 'Hi {{firstName}}! 🛍️ Your order #{{orderNumber}} has been confirmed.\n\n📦 Items: {{orderItems}}\n💰 Total: ${{totalAmount}}\n📅 Expected delivery: {{deliveryDate}}',
    type: 'whatsapp',
    status: 'published',
    category: 'Transactional',
    tags: ['order', 'confirmation', 'ecommerce'],
    createdBy: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    lastModified: '2024-01-12T09:15:00Z',
    usage: 3240,
    usedIn: ['Order Processing Workflow', 'E-commerce Campaign'],
    openRate: 98.2,
    variables: ['firstName', 'orderNumber', 'orderItems', 'totalAmount', 'deliveryDate'],
    whatsappData: {
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      hasButtons: true,
      buttons: [
        { type: 'url', text: 'Track Order', url: 'https://example.com/track/{{orderNumber}}' },
        { type: 'phone', text: 'Contact Us', phone: '+1-800-123-4567' }
      ]
    }
  },
  {
    id: '3',
    name: 'Appointment Reminder',
    subject: undefined,
    content: '📅 Hi {{firstName}}! This is a friendly reminder about your appointment:\n\n🕐 Time: {{appointmentTime}}\n📍 Location: {{location}}\n👨‍⚕️ With: {{doctorName}}\n\nPlease arrive 15 minutes early.',
    type: 'whatsapp',
    status: 'published',
    category: 'Reminders',
    tags: ['appointment', 'reminder', 'healthcare'],
    createdBy: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-20T16:45:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    lastModified: '2024-01-22T11:30:00Z',
    usage: 1640,
    usedIn: ['Appointment System', 'Healthcare Workflow'],
    openRate: 97.5,
    variables: ['firstName', 'appointmentTime', 'location', 'doctorName'],
    whatsappData: {
      hasImage: false,
      hasButtons: true,
      buttons: [
        { type: 'quick_reply', text: 'Confirm' },
        { type: 'quick_reply', text: 'Reschedule' },
        { type: 'phone', text: 'Call Clinic', phone: '+1-800-CLINIC' }
      ]
    }
  },
  {
    id: '4',
    name: 'Promotional Offer',
    subject: undefined,
    content: '🎉 Hey {{firstName}}! Special offer just for you!\n\n🔥 Get {{discount}}% OFF on all products\n💳 Use code: {{promoCode}}\n⏰ Valid until: {{expiryDate}}\n\nDon\'t miss out! Shop now and save big! 🛒',
    type: 'whatsapp',
    status: 'published',
    category: 'Marketing',
    tags: ['promotion', 'discount', 'marketing'],
    createdBy: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-08T14:30:00Z',
    lastModified: '2024-01-08T14:30:00Z',
    usage: 2890,
    usedIn: ['Marketing Campaign', 'Promotional Workflow'],
    openRate: 89.4,
    variables: ['firstName', 'discount', 'promoCode', 'expiryDate'],
    whatsappData: {
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop',
      hasButtons: true,
      buttons: [
        { type: 'url', text: 'Shop Now', url: 'https://example.com/shop?code={{promoCode}}' },
        { type: 'quick_reply', text: 'View Catalog' }
      ]
    }
  },
  {
    id: '5',
    name: 'Payment Reminder',
    subject: undefined,
    content: '💳 Hi {{firstName}}, this is a gentle reminder about your payment.\n\n💰 Amount due: ${{amount}}\n📅 Due date: {{dueDate}}\n\nYou can pay easily using the link below. Thank you!',
    type: 'whatsapp',
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
    usage: 1267,
    usedIn: ['Billing Workflow', 'Payment Reminders'],
    openRate: 94.6,
    variables: ['firstName', 'amount', 'dueDate'],
    whatsappData: {
      hasImage: false,
      hasButtons: true,
      buttons: [
        { type: 'url', text: 'Pay Now', url: 'https://example.com/pay/{{paymentId}}' },
        { type: 'phone', text: 'Call Support', phone: '+1-800-BILLING' }
      ]
    }
  },
  {
    id: '6',
    name: 'Event Invitation',
    subject: undefined,
    content: '🎪 Hi {{firstName}}! You\'re invited to {{eventName}}!\n\n📅 Date: {{eventDate}}\n🕐 Time: {{eventTime}}\n📍 Venue: {{venue}}\n\nJoin us for an amazing experience! RSVP below.',
    type: 'whatsapp',
    status: 'draft',
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
    usage: 0,
    usedIn: [],
    openRate: undefined,
    variables: ['firstName', 'eventName', 'eventDate', 'eventTime', 'venue'],
    whatsappData: {
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
      hasButtons: true,
      buttons: [
        { type: 'quick_reply', text: 'Yes, I\'ll attend' },
        { type: 'quick_reply', text: 'Can\'t make it' },
        { type: 'url', text: 'Event Details', url: 'https://example.com/events/{{eventId}}' }
      ]
    }
  },
  {
    id: '7',
    name: 'Support Response',
    subject: undefined,
    content: '🤝 Hi {{firstName}}! Thank you for contacting our support team.\n\nWe\'ve received your inquiry about: "{{issueSubject}}"\n\n📋 Ticket ID: {{ticketId}}\n⏱️ Expected response: Within 24 hours\n\nOur team will get back to you soon!',
    type: 'whatsapp',
    status: 'published',
    category: 'Support',
    tags: ['support', 'ticket', 'customer-service'],
    createdBy: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-25T08:00:00Z',
    updatedAt: '2024-01-25T08:00:00Z',
    lastModified: '2024-01-25T08:00:00Z',
    usage: 945,
    usedIn: ['Support System', 'Customer Service Workflow'],
    openRate: 96.8,
    variables: ['firstName', 'issueSubject', 'ticketId'],
    whatsappData: {
      hasImage: false,
      hasButtons: true,
      buttons: [
        { type: 'url', text: 'View Ticket', url: 'https://example.com/support/{{ticketId}}' },
        { type: 'phone', text: 'Call Support', phone: '+1-800-SUPPORT' }
      ]
    }
  }
];

export default function WhatsAppTemplates() {
  const [templates, setTemplates] = useState<Template[]>(mockWhatsAppTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockWhatsAppTemplates);
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
      // For WhatsApp templates, we might filter by WhatsApp type categories
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
    console.log('Create new WhatsApp template');
    // TODO: Open create WhatsApp template modal
  };

  const handleAIGenerate = () => {
    console.log('Generate WhatsApp template with AI');
    // TODO: Open AI generation modal for WhatsApp
  };

  const handleImport = () => {
    console.log('Import WhatsApp templates');
    // TODO: Handle WhatsApp template import
  };

  const handleExport = () => {
    console.log('Export WhatsApp templates');
    // TODO: Handle WhatsApp template export
  };

  const handleViewLogs = () => {
    console.log('View WhatsApp logs');
    // TODO: Open WhatsApp logs view
  };

  const handleEditTemplate = (template: Template) => {
    console.log('Edit WhatsApp template:', template.id);
    // TODO: Open edit WhatsApp template modal/page
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
        title="WhatsApp Templates"
        breadcrumb={['Dashboard', 'Communications', 'WhatsApp Templates']}
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

      <WhatsAppTemplateDetailDrawer
        template={selectedTemplate}
        isOpen={showDetailDrawer}
        onClose={handleCloseDrawer}
        onSave={handleSaveTemplate}
        onDelete={handleDeleteTemplate}
      />
    </div>
  );
}