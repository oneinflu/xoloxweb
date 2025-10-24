import React from 'react';
import { 
  Mail, 
  Phone, 
  Building, 
  Zap, 
  MoreVertical,
  
  Clock,
  DollarSign
} from 'lucide-react';
import { Lead } from '../types/pipeline';

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
  isDragging?: boolean;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  
  isDragging = false
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${
        isDragging ? 'opacity-50 rotate-2 shadow-lg' : ''
      }`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', lead.id);
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={lead.avatar}
            alt={lead.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{lead.name}</h3>
            {lead.company && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Building className="h-3 w-3 mr-1" />
                {lead.company}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {lead.aiPrediction && (
            <div className="relative group">
              <Zap className="h-4 w-4 text-purple-600" />
              <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {lead.aiPrediction.conversionProbability}% conversion probability
              </div>
            </div>
          )}
          
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-xs text-gray-600">
          <Mail className="h-3 w-3 mr-2" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <Phone className="h-3 w-3 mr-2" />
          <span>{lead.phone}</span>
        </div>
      </div>

      {/* Value and Score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 text-green-600 mr-1" />
          <span className="font-medium text-gray-900">
            ${lead.value.toLocaleString()}
          </span>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.score)}`}>
          {lead.score}
        </div>
      </div>

      {/* Tags */}
      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {lead.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {lead.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{lead.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <img
            src={lead.owner.avatar}
            alt={lead.owner.name}
            className="w-4 h-4 rounded-full mr-1"
          />
          <span>{lead.owner.name}</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{new Date(lead.lastActivity).toLocaleDateString()}</span>
        </div>
      </div>

      {/* AI Prediction */}
      {lead.aiPrediction && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.aiPrediction.priority)}`}>
              {lead.aiPrediction.priority.toUpperCase()}
            </div>
            <div className="text-xs text-gray-600">
              {lead.aiPrediction.nextBestAction}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};