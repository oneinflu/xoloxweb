import { useState } from 'react';
import { MoreVertical, Edit, Copy, Trash2, Eye, CheckSquare, Square, Mail, User, Calendar, TrendingUp, Download } from 'react-feather';
import { Template } from '../types/template';

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onPreview: (template: Template) => void;
  onTemplateClick: (template: Template) => void;
}

export default function TemplateList({ templates, onEdit, onDelete, onDuplicate, onPreview }: TemplateListProps) {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 25;

  const toggleSelectAll = () => {
    if (selectedTemplates.length === templates.length) {
      setSelectedTemplates([]);
    } else {
      setSelectedTemplates(templates.map(t => t.id));
    }
  };

  const toggleSelectTemplate = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Pagination logic
  const totalPages = Math.ceil(templates.length / templatesPerPage);
  const startIndex = (currentPage - 1) * templatesPerPage;
  const endIndex = startIndex + templatesPerPage;
  const currentTemplates = templates.slice(startIndex, endIndex);

  if (templates.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first email template
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            Create Template
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="sticky left-0 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-left z-10">
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center justify-center w-5 h-5"
                >
                  {selectedTemplates.length === templates.length ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[200px]">
                Template Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[180px]">
                Subject Line
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category / Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Owner / Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Used In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Open Rate (avg)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentTemplates.map((template) => (
              <tr
                key={template.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                onMouseEnter={() => setHoveredRow(template.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="sticky left-0 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 px-4 py-4 z-10">
                  <button
                    onClick={() => toggleSelectTemplate(template.id)}
                    className="flex items-center justify-center w-5 h-5"
                  >
                    {selectedTemplates.includes(template.id) ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </td>
                
                {/* Template Name - Clickable */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(template)}
                    className="flex items-center text-left hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {template.name}
                    </div>
                  </button>
                </td>

                {/* Subject Line */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300" title={template.subject || 'No subject'}>
                    {truncateText(template.subject || 'No subject', 40)}
                  </div>
                </td>

                {/* Category / Usage */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {template.category || template.type}
                  </div>
                </td>

                {/* Owner / Created By */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-2">
                      <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {template.createdBy?.name || 'Unknown'}
                    </div>
                  </div>
                </td>

                {/* Last Modified */}
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatRelativeTime(template.lastModified || template.createdAt)}
                  </div>
                </td>

                {/* Used In */}
                <td className="px-6 py-4">
                  <div className="group relative">
                    <span className="text-sm text-blue-600 dark:text-blue-400 cursor-help border-b border-dotted border-blue-300">
                      {template.usedIn?.length || 0} workflows
                    </span>
                    {template.usedIn && template.usedIn.length > 0 && (
                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-20">
                        <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
                          {template.usedIn.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                    {template.status}
                  </span>
                </td>

                {/* Open Rate */}
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm">
                    {template.openRate ? (
                      <>
                        <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-300">{template.openRate}%</span>
                      </>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  {hoveredRow === template.id ? (
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => onEdit(template)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onPreview(template)}
                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(template)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors group">
                        <MoreVertical className="w-4 h-4" />
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                          <div className="py-1">
                            <button
                              onClick={() => onEdit(template)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => onDuplicate(template)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </button>
                            <button 
                              onClick={() => onPreview(template)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </button>
                            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                            <button
                              onClick={() => onDelete(template)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          Showing {startIndex + 1} to {Math.min(endIndex, templates.length)} of {templates.length} templates
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}