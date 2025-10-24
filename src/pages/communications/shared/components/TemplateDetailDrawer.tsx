import React, { useState } from 'react';
import { Template } from '../types/template';
import { 
  X, 
  Eye, 
  Edit, 
  
  Sparkles,
  BarChart3,
  Clock,
  Info
} from 'lucide-react';

interface TemplateDetailDrawerProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Template) => void;
  onDelete: (template: Template) => void;
}

type TabType = 'preview' | 'details' | 'edit' | 'ai' | 'analytics' | 'history';

export default function TemplateDetailDrawer({
  template,
  isOpen,
  onClose,
  onSave,
  onDelete
}: TemplateDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(template);

  React.useEffect(() => {
    setEditedTemplate(template);
  }, [template]);

  if (!isOpen || !template) return null;

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'details', label: 'Details', icon: Info },
    { id: 'edit', label: 'Edit HTML / Rich Text', icon: Edit },
    { id: 'ai', label: 'AI Enhancer', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: Clock },
  ];

  const handleSave = () => {
    if (editedTemplate) {
      onSave(editedTemplate);
      onClose();
    }
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${template.name}"?`)) {
      onDelete(template);
      onClose();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'preview':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Preview</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <div className="text-gray-900 dark:text-white font-medium">{template.subject}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[300px] border border-gray-200 dark:border-gray-600">
                    <div className="prose dark:prose-invert max-w-none">
                      {template.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Template Name</label>
                  <div className="text-gray-900 dark:text-white">{template.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <div className="text-gray-900 dark:text-white">{template.category}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    template.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    template.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {template.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usage Count</label>
                  <div className="text-gray-900 dark:text-white">{template.usage}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created By</label>
                  <div className="flex items-center space-x-2">
                    <img src={template.createdBy.avatar} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-gray-900 dark:text-white">{template.createdBy.name}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Modified</label>
                  <div className="text-gray-900 dark:text-white">{template.lastModified ? new Date(template.lastModified).toLocaleDateString() : 'N/A'}</div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {template.usedIn && template.usedIn.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Used In</label>
                  <div className="space-y-1">
                    {template.usedIn.map((workflow, index) => (
                      <div key={index} className="text-gray-900 dark:text-white text-sm">{workflow}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'edit':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Template</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={editedTemplate?.name || ''}
                    onChange={(e) => setEditedTemplate(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={editedTemplate?.subject || ''}
                    onChange={(e) => setEditedTemplate(prev => prev ? { ...prev, subject: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                  <textarea
                    value={editedTemplate?.content || ''}
                    onChange={(e) => setEditedTemplate(prev => prev ? { ...prev, content: e.target.value } : null)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Enhancer</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">AI Suggestions</h4>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                    <li>• Consider adding personalization tokens for better engagement</li>
                    <li>• The subject line could be more compelling with action words</li>
                    <li>• Add a clear call-to-action button</li>
                  </ul>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enhancement Options</label>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
                      <div className="font-medium text-gray-900 dark:text-white">Improve Subject Line</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Generate more engaging subject lines</div>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
                      <div className="font-medium text-gray-900 dark:text-white">Optimize Content</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Enhance readability and engagement</div>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
                      <div className="font-medium text-gray-900 dark:text-white">A/B Test Variants</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Generate alternative versions for testing</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template Analytics</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{template.openRate?.toFixed(1)}%</div>
                  <div className="text-sm text-blue-800 dark:text-blue-300">Open Rate</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{template.usage}</div>
                  <div className="text-sm text-green-800 dark:text-green-300">Total Sends</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Performance Trends</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Chart placeholder - Performance over time</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Engagement Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Click Rate</span>
                      <span className="text-gray-900 dark:text-white">12.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Bounce Rate</span>
                      <span className="text-gray-900 dark:text-white">2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Unsubscribe Rate</span>
                      <span className="text-gray-900 dark:text-white">0.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template History</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">Template updated</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Subject line modified by {template.createdBy.name}</div>
                </div>
                <div className="border-l-2 border-green-500 pl-4 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">Template published</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">1 day ago</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Status changed from draft to published</div>
                </div>
                <div className="border-l-2 border-gray-300 pl-4 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">Template created</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(template.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Initial template created by {template.createdBy.name}</div>
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999998]"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[900px] bg-white dark:bg-gray-900 shadow-2xl z-[9999999] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{template.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.subject}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </div>

        {/* Sticky Bottom Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Delete Template
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveTab('preview')}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Preview
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}