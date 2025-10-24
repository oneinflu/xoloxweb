import { useState } from 'react';
import { ChevronRight, Plus, Clock, RefreshCw, AlertTriangle } from 'react-feather';

import DateRangePicker from './components/DateRangePicker';

import GlobalFilters from './components/GlobalFilters';
import ReportSearch from './components/ReportSearch';
import QuickActions from './components/QuickActions';
import KPICard from './components/KPICard';
import SavedDashboards from './components/SavedDashboards';

interface DateRange {
  start: Date;
  end: Date;
  timezone: string;
}

interface GlobalFilter {
  type: string;
  value: string;
}

export default function Reports() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    end: new Date(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const [filters, setFilters] = useState<GlobalFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedKPIs, setPinnedKPIs] = useState<string[]>([]);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  // Utility functions
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      notation: num > 9999 ? "compact" : "standard",
      maximumFractionDigits: 1
    }).format(num);
  };

  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handlePinKPI = (kpiId: string) => {
    setPinnedKPIs(prev => 
      prev.includes(kpiId) 
        ? prev.filter(id => id !== kpiId)
        : [...prev, kpiId]
    );
  };

  const handleCreateReport = (type: string) => {
    // Handle report creation based on type
    console.log('Creating report of type:', type);
  };

  const handleSync = async () => {
    // Handle manual data sync
    setLastSync(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Reports & Analytics
                </h1>
                {/* Breadcrumbs */}
                <div className="ml-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <a href="/dashboard" className="hover:text-gray-700 dark:hover:text-gray-300">
                    Dashboard
                  </a>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span>Reports & Analytics</span>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleCreateReport('blank')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </button>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="mt-4 flex items-center space-x-4">
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                className="w-72"
              />

              <GlobalFilters
                filters={filters}
                onChange={setFilters}
                className="flex-1"
              />

              <ReportSearch
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-64"
              />

              <QuickActions onSync={handleSync} />

              {/* Last Sync Info */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>Last sync: {lastSync.toLocaleTimeString()}</span>
                <button
                  onClick={handleSync}
                  className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Warning for Date Range */}
            {dateRange.start < new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000) && (
              <div className="mt-2 flex items-center text-sm text-amber-600 dark:text-amber-500">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>Selected date range exceeds 2-year retention window</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Saved Dashboards */}
        <div className="mb-8">
          <SavedDashboards />
        </div>

        {/* Executive Snapshot */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Executive Snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total Leads"
              value={formatNumber(2547)}
              delta={12.5}
              sparklineData={[2200, 2300, 2400, 2450, 2500, 2520, 2547]}
              info="Total number of leads in the selected date range"
              isPinned={pinnedKPIs.includes('total-leads')}
              onPin={() => handlePinKPI('total-leads')}
            />
            <KPICard
              title="New Leads"
              value={formatNumber(342)}
              delta={-5.2}
              sparklineData={[310, 325, 318, 330, 335, 340, 342]}
              info="New leads acquired during the selected period"
              isPinned={pinnedKPIs.includes('new-leads')}
              onPin={() => handlePinKPI('new-leads')}
            />
            <KPICard
              title="Conversion Rate"
              value="24.8%"
              delta={3.1}
              sparklineData={[22.5, 23.0, 23.5, 24.0, 24.3, 24.6, 24.8]}
              info="Percentage of leads that converted to enrollments"
              isPinned={pinnedKPIs.includes('conversion-rate')}
              onPin={() => handlePinKPI('conversion-rate')}
            />
            <KPICard
              title="Revenue"
              value="$1.2M"
              delta={15.7}
              sparklineData={[0.95, 1.0, 1.05, 1.1, 1.15, 1.18, 1.2]}
              info="Total revenue from enrollments in the selected period"
              isPinned={pinnedKPIs.includes('revenue')}
              onPin={() => handlePinKPI('revenue')}
            />
            <KPICard
              title="Avg. Time to Convert"
              value="12 days"
              delta={-8.3}
              sparklineData={[14, 13.5, 13, 12.8, 12.5, 12.2, 12]}
              info="Average time from lead creation to enrollment"
              isPinned={pinnedKPIs.includes('time-to-convert')}
              onPin={() => handlePinKPI('time-to-convert')}
            />
            <KPICard
              title="Campaign ROI"
              value="287%"
              delta={22.4}
              sparklineData={[240, 250, 260, 270, 275, 280, 287]}
              info="Return on investment for marketing campaigns"
              isPinned={pinnedKPIs.includes('campaign-roi')}
              onPin={() => handlePinKPI('campaign-roi')}
            />
            <KPICard
              title="AI Confidence"
              value="94%"
              delta={1.2}
              sparklineData={[91, 92, 92.5, 93, 93.5, 94, 94]}
              info="Confidence level of AI predictions and recommendations"
              isPinned={pinnedKPIs.includes('ai-confidence')}
              onPin={() => handlePinKPI('ai-confidence')}
            />
            <KPICard
              title="Data Freshness"
              value={formatTimeAgo(lastSync)}
              delta={0}
              sparklineData={[5, 4, 3, 2, 1, 0.5, 0]}
              info="Time since last data synchronization"
              isPinned={pinnedKPIs.includes('data-freshness')}
              onPin={() => handlePinKPI('data-freshness')}
            />
          </div>
        </div>
        
        {/* Additional report content will go here */}
      </div>
    </div>
  );
}