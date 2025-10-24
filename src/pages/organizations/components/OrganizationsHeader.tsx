
import { 
  Plus, 
  Download, 
  RefreshCw,
  Building
} from 'lucide-react';
import { OrganizationStats } from '../types/organization';

interface OrganizationsHeaderProps {
  stats: OrganizationStats;
  onRefresh: () => void;
  onExport: () => void;
}

export function OrganizationsHeader({
  stats,
  onRefresh,
  onExport
}: OrganizationsHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title and Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Registered Organizations
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {stats.total} organizations registered • {stats.totalUsers} total users
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Organization</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Organizations</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-semibold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="text-2xl font-semibold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-semibold text-red-600">{stats.suspended}</div>
          <div className="text-sm text-gray-600">Suspended</div>
        </div>
      </div>
    </div>
  );
}
       