/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  Search, 
  Filter, 
  X,
  Calendar
} from 'lucide-react';
import { OrganizationFilters } from '../types/organization';

interface OrganizationsFiltersProps {
  filters: OrganizationFilters;
  onFilterChange: (filters: Partial<OrganizationFilters>) => void;
}

export function OrganizationsFilters({
  filters,
  onFilterChange
}: OrganizationsFiltersProps) {
  const hasActiveFilters = filters.search || 
    filters.status.length > 0 || 
    filters.industry.length > 0 || 
    filters.size.length > 0 || 
    filters.plan.length > 0 ||
    filters.registrationDateRange.start ||
    filters.registrationDateRange.end;

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: [],
      industry: [],
      size: [],
      plan: [],
      registrationDateRange: {},
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
            >
              <X className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Search */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Organizations
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, domain, or email..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status.length > 0 ? filters.status[0] : ''}
            onChange={(e) => onFilterChange({ status: e.target.value ? [e.target.value] : [] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            value={filters.industry.length > 0 ? filters.industry[0] : ''}
            onChange={(e) => onFilterChange({ industry: e.target.value ? [e.target.value] : [] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="SaaS">SaaS</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Size
          </label>
          <select
            value={filters.size.length > 0 ? filters.size[0] : ''}
            onChange={(e) => onFilterChange({ size: e.target.value ? [e.target.value] : [] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Sizes</option>
            <option value="startup">Startup (1-10)</option>
            <option value="small">Small (11-50)</option>
            <option value="medium">Medium (51-200)</option>
            <option value="large">Large (201-1000)</option>
            <option value="enterprise">Enterprise (1000+)</option>
          </select>
        </div>

        {/* Subscription Plan Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Plan
          </label>
          <select
            value={filters.plan.length > 0 ? filters.plan[0] : ''}
            onChange={(e) => onFilterChange({ plan: e.target.value ? [e.target.value] : [] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Plans</option>
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        {/* Registration Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Date (From)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filters.registrationDateRange.start || ''}
              onChange={(e) => onFilterChange({ 
                registrationDateRange: { 
                  ...filters.registrationDateRange, 
                  start: e.target.value 
                } 
              })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Date (To)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filters.registrationDateRange.end || ''}
              onChange={(e) => onFilterChange({ 
                registrationDateRange: { 
                  ...filters.registrationDateRange, 
                  end: e.target.value 
                } 
              })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">Name</option>
            <option value="registrationDate">Registration Date</option>
            <option value="lastActivity">Last Activity</option>
            <option value="users">User Count</option>
          </select>
        </div>
      </div>
    </div>
  );
}
         