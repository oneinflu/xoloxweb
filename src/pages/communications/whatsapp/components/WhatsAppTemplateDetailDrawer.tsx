import { useState } from 'react';
import { X, Eye, Edit, Trash2, Sparkles, BarChart3, Clock, Info, Smartphone } from 'lucide-react';
import { Template } from '../../shared/types/template';

interface WhatsAppTemplateDetailDrawerProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Template) => void;
  onDelete: (template: Template) => void;
}

const WhatsAppTemplateDetailDrawer: React.FC<WhatsAppTemplateDetailDrawerProps> = ({
  template,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  const [activeTab, setActiveTab] = useState('preview');

  if (!isOpen || !template) return null;

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'details', label: 'Details', icon: Info },
    { id: 'edit', label: 'Edit Content', icon: Edit },
    { id: 'ai', label: 'AI Enhancer', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: Clock }
  ];

  const handleSave = () => {
    if (template) {
      onSave(template);
    }
  };

  const handleDelete = () => {
    if (template && confirm(`Are you sure you want to delete "${template.name}"?`)) {
      onDelete(template);
      onClose();
    }
  };

  const renderWhatsAppPreview = () => {
    const processedContent = template.content.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      // Replace variables with sample data for preview
      const sampleData: Record<string, string> = {
        firstName: 'John',
        lastName: 'Doe',
        orderNumber: 'ORD-12345',
        orderItems: '2x Premium T-Shirt, 1x Jeans',
        totalAmount: '89.99',
        deliveryDate: 'March 25, 2024',
        appointmentTime: '2:30 PM',
        location: 'Downtown Medical Center',
        doctorName: 'Dr. Smith',
        discount: '25',
        promoCode: 'SAVE25',
        expiryDate: 'March 31, 2024',
        amount: '150.00',
        dueDate: 'March 20, 2024',
        eventName: 'Annual Conference 2024',
        eventDate: 'April 15, 2024',
        eventTime: '9:00 AM',
        venue: 'Convention Center',
        issueSubject: 'Login Issues',
        ticketId: 'TKT-789'
      };
      return sampleData[variable] || match;
    });

    return (
      <div className="flex justify-center items-center min-h-[600px] bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8">
        {/* Phone Mockup */}
        <div className="relative">
          {/* Phone Frame */}
          <div className="w-80 h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
              {/* Status Bar */}
              <div className="bg-green-500 h-12 flex items-center justify-between px-4 text-white text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>WhatsApp</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-3 border border-white rounded-sm">
                    <div className="w-2 h-1 bg-white rounded-sm m-0.5"></div>
                  </div>
                  <span className="text-xs">100%</span>
                </div>
              </div>

              {/* Chat Header */}
              <div className="bg-green-500 px-4 py-3 flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-semibold">
                    {template.createdBy.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{template.createdBy.name}</div>
                  <div className="text-xs text-green-100">Online</div>
                </div>
              </div>

              {/* Chat Background */}
              <div 
                className="flex-1 p-4 overflow-y-auto"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  height: 'calc(100% - 120px)'
                }}
              >
                {/* Message Bubble */}
                <div className="flex justify-end mb-4">
                  <div className="max-w-xs">
                    {/* Image if present */}
                    {template.whatsappData?.hasImage && template.whatsappData.imageUrl && (
                      <div className="mb-2">
                        <img 
                          src={template.whatsappData.imageUrl} 
                          alt="Template image"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    {/* Message Content */}
                    <div className="bg-green-500 text-white p-3 rounded-lg rounded-br-none shadow-md">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {processedContent}
                      </div>
                      <div className="flex justify-end items-center mt-2 gap-1">
                        <span className="text-xs text-green-100">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex">
                          <div className="w-4 h-3 text-green-100">
                            <svg viewBox="0 0 16 15" className="fill-current">
                              <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.063-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l3.61 3.463c.143.14.361.125.484-.033L10.91 3.379a.366.366 0 0 0-.063-.51z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons if present */}
                    {template.whatsappData?.hasButtons && template.whatsappData.buttons && (
                      <div className="mt-2 space-y-1">
                        {template.whatsappData.buttons.map((button, index) => (
                          <div 
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm"
                          >
                            <span className="text-blue-600 font-medium text-sm">
                              {button.type === 'url' && '🔗 '}
                              {button.type === 'phone' && '📞 '}
                              {button.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-gray-100 p-3 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">
                  Type a message...
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'preview':
        return renderWhatsAppPreview();
      
      case 'details':
        return (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                    <p className="text-gray-900 dark:text-white">{template.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</label>
                    <p className="text-gray-900 dark:text-white capitalize">{template.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      template.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      template.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</label>
                    <p className="text-gray-900 dark:text-white">{template.category || 'Uncategorized'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Statistics</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Times Used</label>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{template.usage.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivery Rate</label>
                    <p className="text-2xl font-bold text-green-600">{template.openRate?.toFixed(1) || 'N/A'}%</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Used In</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.usedIn?.map((usage, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
                          {usage}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">WhatsApp Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🖼️</span>
                    <span className="font-medium text-gray-900 dark:text-white">Image</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {template.whatsappData?.hasImage ? 'Includes image' : 'Text only'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔘</span>
                    <span className="font-medium text-gray-900 dark:text-white">Buttons</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {template.whatsappData?.hasButtons ? `${template.whatsappData.buttons?.length || 0} buttons` : 'No buttons'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Variables</h3>
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full dark:bg-purple-900 dark:text-purple-200">
                    {`{{${variable}}}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'edit':
        return (
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  defaultValue={template.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message Content
                </label>
                <textarea
                  rows={8}
                  defaultValue={template.content}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your WhatsApp message content..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  defaultValue={template.tags.join(', ')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>
          </div>
        );
      
      case 'ai':
        return (
          <div className="p-6 text-center">
            <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Template Enhancer</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use AI to improve your WhatsApp template content, optimize for engagement, and suggest better messaging.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Enhance with AI
            </button>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Template Analytics</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{template.usage.toLocaleString()}</div>
                <div className="text-sm text-blue-600">Total Sends</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{template.openRate?.toFixed(1) || 'N/A'}%</div>
                <div className="text-sm text-green-600">Delivery Rate</div>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Template History</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Template created</div>
                  <div className="text-sm text-gray-500">{new Date(template.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Edit className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Last modified</div>
                  <div className="text-sm text-gray-500">{new Date(template.updatedAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        style={{ zIndex: 9999998 }}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className="fixed right-0 top-0 h-full w-[900px] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
        style={{ zIndex: 9999999 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{template.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp Template</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {renderTabContent()}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('preview')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppTemplateDetailDrawer;