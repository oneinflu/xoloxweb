import React, { useState } from 'react';
import { MoreHorizontal, Eye, CheckCircle, XCircle, Pause, Play, Users, Building, Calendar, Globe } from 'lucide-react';
import { Organization, OrganizationFilters } from '../types/organization';

interface OrganizationsListProps {
  organizations: Organization[];
  filters: OrganizationFilters;
  loading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
  onViewDetails: (id: string) => void;
  onBulkAction: (action: string, ids: string[]) => void;
}

const OrganizationsList: React.FC<OrganizationsListProps> = ({
  organizations,
  loading,
  onApprove,
  onReject,
  onSuspend,
  onActivate,
  onViewDetails,
  onBulkAction
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? organizations.map(org => org.id) : []);
  };

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds(prev => 
      checked ? [...prev, id] : prev.filter(selectedId => selectedId !== id)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rejected':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-100 text-gray-800';
      case 'basic':
        return 'bg-blue-100 text-blue-800';
      case 'pro':
        return 'bg-purple-100 text-purple-800';
      case 'enterprise':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg mx-4 sm:mx-6 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading organizations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg mx-4 sm:mx-6 mb-6">
      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="border-b border-gray-200 px-4 sm:px-6 py-3 bg-blue-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedIds.length} organization{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onBulkAction('approve', selectedIds)}
                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => onBulkAction('suspend', selectedIds)}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="border-b border-gray-200 px-3 sm:px-4 py-3 bg-gray-50">
        <div className="flex items-center space-x-3 sm:space-x-4 text-sm font-medium text-gray-700">
          <div className="w-4 flex-shrink-0">
            <input
              type="checkbox"
              checked={selectedIds.length === organizations.length && organizations.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="w-64 min-w-0 flex-shrink-0">Organization</div>
          <div className="hidden sm:block flex-shrink-0 w-24">Status</div>
          <div className="hidden md:block flex-shrink-0 w-20">Plan</div>
          <div className="hidden lg:block flex-shrink-0 w-24">Industry</div>
          <div className="hidden xl:block flex-shrink-0 w-20">Users</div>
          <div className="hidden xl:block flex-shrink-0 w-24">Registered</div>
          <div className="hidden xl:block flex-shrink-0 w-24">Last Activity</div>
          <div className="flex-shrink-0 w-20">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {organizations.length === 0 ? (
          <div className="px-4 sm:px-6 py-8 text-center">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No organizations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          organizations.map((org) => (
            <div key={org.id} className="px-3 sm:px-4 py-4 hover:bg-gray-50 group">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedIds.includes(org.id)}
                  onChange={(e) => handleSelect(org.id, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                />

                {/* Organization Info */}
                <div className="flex items-center space-x-3 w-64 min-w-0 flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {org.logo ? (
                      <img 
                        src={org.logo} 
                        alt={org.name}
                        className="w-8 h-8 rounded-lg"
                      />
                    ) : (
                      <Building className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => onViewDetails(org.id)}
                      className="text-left w-full"
                    >
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm truncate">
                        {org.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 space-x-2">
                        <Globe className="w-3 h-3" />
                        <span className="truncate">{org.domain}</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div className="hidden sm:block flex-shrink-0 w-24">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(org.status)}`}>
                    {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                  </span>
                </div>

                {/* Plan */}
                <div className="hidden md:block flex-shrink-0 w-20">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPlanColor(org.subscription.plan)}`}>
                    {org.subscription.plan.charAt(0).toUpperCase() + org.subscription.plan.slice(1)}
                  </span>
                </div>

                {/* Industry */}
                <div className="hidden lg:block flex-shrink-0 w-24">
                  <span className="text-sm text-gray-600 truncate">{org.industry}</span>
                </div>

                {/* Users */}
                <div className="hidden xl:block flex-shrink-0 w-20">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{org.usage.users}</span>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="hidden xl:block flex-shrink-0 w-24">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(org.registrationDate)}</span>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="hidden xl:block flex-shrink-0 w-24">
                  <span className="text-sm text-gray-600">{formatDate(org.lastActivity)}</span>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 w-20 relative">
                  <button
                    onClick={() => setShowActions(showActions === org.id ? null : org.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {showActions === org.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            onViewDetails(org.id);
                            setShowActions(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        
                        {org.status === 'pending' && (
                          <>
                            <button
                              onClick={() => {
                                onApprove(org.id);
                                setShowActions(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                onReject(org.id);
                                setShowActions(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </button>
                          </>
                        )}
                        
                        {org.status === 'active' && (
                          <button
                            onClick={() => {
                              onSuspend(org.id);
                              setShowActions(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            Suspend
                          </button>
                        )}
                        
                        {org.status === 'suspended' && (
                          <button
                            onClick={() => {
                              onActivate(org.id);
                              setShowActions(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Activate
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrganizationsList;