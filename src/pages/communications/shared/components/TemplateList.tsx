import { useState } from 'react';
import { Edit, Copy, Trash2, Eye, MoreVertical, Calendar, User, Tag } from 'react-feather';
import { Template } from '../types/template';

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onDelete: (template: Template) => void;
  onPreview: (template: Template) => void;
}

export default function TemplateList({
  templates,
  onEdit,
  onDuplicate,
  onDelete,
  onPreview
}: TemplateListProps) {
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTemplates(new Set(templates.map(t => t.id)));
    } else {
      setSelectedTemplates(new Set());
    }
  };

  const handleSelectTemplate = (templateId: string, checked: boolean) => {
    const newSelected = new Set(selectedTemplates);
    if (checked) {
      newSelected.add(templateId);
    } else {
      newSelected.delete(templateId);
    }
    setSelectedTemplates(newSelected);
  };

  const getStatusColor = (status: Template['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Bulk Actions Bar */}
      {selectedTemplates.size > 0 && (
        <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedTemplates.size} template(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 rounded">
                Duplicate
              </button>
              <button className="px-3 py-1 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 rounded">
                Archive
              </button>
              <button className="px-3 py-1 text-sm text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-500 dark:text-gray-400">
          <div className="col-span-1">
            <input
              type="checkbox"
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600"
              checked={selectedTemplates.size === templates.length && templates.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
          <div className="col-span-4">Template</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Usage</div>
          <div className="col-span-2">Created</div>
          <div className="col-span-1">Actions</div>
        </div>
      </div>

      {/* Template List */}
      <div className="divide-y dark:divide-gray-700">
        {templates.map((template) => (
          <div key={template.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Checkbox */}
              <div className="col-span-1">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600"
                  checked={selectedTemplates.has(template.id)}
                  onChange={(e) => handleSelectTemplate(template.id, e.target.checked)}
                />
              </div>

              {/* Template Info */}
              <div className="col-span-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {template.name}
                    </h3>
                    {template.subject && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                        {template.subject}
                      </p>
                    )}
                    {template.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {template.tags.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{template.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                  {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                </span>
              </div>

              {/* Usage */}
              <div className="col-span-2">
                <div className="text-sm text-gray-900 dark:text-white">
                  {template.usage.toLocaleString()} times
                </div>
              </div>

              {/* Created */}
              <div className="col-span-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <User className="w-4 h-4 mr-1" />
                  <div>
                    <div>{template.createdBy.name}</div>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(template.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-1">
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === template.id ? null : template.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeDropdown === template.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            onPreview(template);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-3" />
                          Preview
                        </button>
                        <button
                          onClick={() => {
                            onEdit(template);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            onDuplicate(template);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-3" />
                          Duplicate
                        </button>
                        <hr className="my-2 border-gray-200 dark:border-gray-600" />
                        <button
                          onClick={() => {
                            onDelete(template);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {templates.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Get started by creating your first email template.
          </p>
        </div>
      )}
    </div>
  );
}