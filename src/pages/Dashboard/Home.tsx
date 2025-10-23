/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import { 
  PlusIcon, 
  DownloadIcon, 
  ChevronDownIcon,
  EnvelopeIcon,
  CalenderIcon,
  UserCircleIcon,
  PieChartIcon,
  CheckCircleIcon,
  AlertIcon,
  BoltIcon,
  TimeIcon,
  ArrowRightIcon,
 VideoIcon,
  HorizontaLDots,
  InfoIcon,
  AngleUpIcon
} from "../../icons";
import { aiInsightsData, counsellorData, leadTrendsData, pipelineData } from "../../data/charts";

export default function Home() {
  const [, setDateRange] = useState("");
  const [, setSource] = useState("");
  const [, setCourse] = useState("");
  const [, setPipeline] = useState("");
  const [, setCounsellor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Filter options
  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "thismonth", label: "This Month" },
    { value: "lastmonth", label: "Last Month" },
    { value: "custom", label: "Custom Range" },
  ];

  const sourceOptions = [
    { value: "website", label: "Website" },
    { value: "facebook", label: "Facebook" },
    { value: "google", label: "Google Ads" },
    { value: "referral", label: "Referral" },
    { value: "direct", label: "Direct" },
    { value: "email", label: "Email Campaign" },
  ];

  const courseOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "mobile-development", label: "Mobile Development" },
  ];

  const pipelineOptions = [
    { value: "lead-generation", label: "Lead Generation" },
    { value: "qualification", label: "Qualification" },
    { value: "proposal", label: "Proposal" },
    { value: "negotiation", label: "Negotiation" },
    { value: "closed-won", label: "Closed Won" },
    { value: "closed-lost", label: "Closed Lost" },
  ];

  const counsellorOptions = [
    { value: "john-doe", label: "John Doe" },
    { value: "jane-smith", label: "Jane Smith" },
    { value: "mike-johnson", label: "Mike Johnson" },
    { value: "sarah-wilson", label: "Sarah Wilson" },
    { value: "david-brown", label: "David Brown" },
  ];

  const handleExportCSV = () => {
    console.log("Exporting as CSV...");
    setShowExportMenu(false);
  };

  const handleSendReport = () => {
    console.log("Sending report...");
    setShowExportMenu(false);
  };

  const handleScheduleEmail = () => {
    console.log("Scheduling email...");
    setShowExportMenu(false);
  };

  const handleQuickAdd = () => {
    console.log("Opening quick add modal...");
  };

  return (
    <>
      <PageMeta
        title="CRM Overview | Dashboard"
        description="Comprehensive CRM overview with leads, activities, and performance metrics"
      />
      
      {/* ROW 1 — Page Header / Context Bar */}
      <div className="mb-8">
        {/* Page Title and Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome Irfat
            </h1>
            
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Add Button */}
            <Button
              onClick={handleQuickAdd}
              startIcon={<PlusIcon className="text-white w-4 h-4" />}
              className="bg-brand-500 hover:bg-brand-600"
            >
              Quick Add
            </Button>

            {/* Export/Share Button */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowExportMenu(!showExportMenu)}
                endIcon={<ChevronDownIcon className="w-4 h-4" />}
                startIcon={<DownloadIcon className="w-4 h-4" />}
              >
                Export
              </Button>

              {/* Export Dropdown Menu */}
              {showExportMenu && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <button
                      onClick={handleExportCSV}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <DownloadIcon className="w-4 h-4 mr-3" />
                      Export as CSV
                    </button>
                    <button
                      onClick={handleSendReport}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <EnvelopeIcon className="w-4 h-4 mr-3" />
                      Send Report
                    </button>
                    <button
                      onClick={handleScheduleEmail}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <CalenderIcon className="w-4 h-4 mr-3" />
                      Schedule Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Filters and Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <Select
                options={dateRangeOptions}
                placeholder="Select date range"
                onChange={setDateRange}
                className="w-full"
              />
            </div>

            {/* Source Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Source
              </label>
              <Select
                options={sourceOptions}
                placeholder="All sources"
                onChange={setSource}
                className="w-full"
              />
            </div>

            {/* Course Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course
              </label>
              <Select
                options={courseOptions}
                placeholder="All courses"
                onChange={setCourse}
                className="w-full"
              />
            </div>

            {/* Pipeline Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pipeline
              </label>
              <Select
                options={pipelineOptions}
                placeholder="All pipelines"
                onChange={setPipeline}
                className="w-full"
              />
            </div>

            {/* Counsellor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Counsellor
              </label>
              <Select
                options={counsellorOptions}
                placeholder="All counsellors"
                onChange={setCounsellor}
                className="w-full"
              />
            </div>

            {/* Search Bar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <Input
                type="text"
                placeholder="Search by name, phone, or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing results for selected filters
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDateRange("");
                  setSource("");
                  setCourse("");
                  setPipeline("");
                  setCounsellor("");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
              <Button size="sm">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 — Top-Level KPIs / Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Leads */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Leads
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <UserCircleIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12,580
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active leads in system
              </p>
            </div>
          </div>
        </div>

        {/* New Leads (This Month) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              New Leads (This Month)
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <PlusIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1,240
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Recently added
              </p>
            </div>
          </div>
        </div>

        {/* Contacted Leads */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contacted Leads
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                8,400
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Leads that have been engaged
              </p>
            </div>
          </div>
        </div>

        {/* Converted Leads */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Converted Leads
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                624
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Successful conversions
              </p>
            </div>
          </div>
        </div>

        {/* Lost Leads */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Lost Leads
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertIcon className="w-6 h-6 text-red-500 dark:text-red-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                240
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dropped or unresponsive
              </p>
            </div>
          </div>
        </div>

        {/* Lead Conversion Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Lead Conversion Rate
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <PieChartIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12.8%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                % of total converted
              </p>
            </div>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Response Time
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <TimeIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                3.4 hrs
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Time taken to first contact
              </p>
            </div>
          </div>
        </div>

        {/* AI Confidence Index */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              AI Confidence Index
            </h3>
            <span className="inline-flex items-center justify-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <BoltIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                92%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Accuracy of lead scoring
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3 — AI INSIGHTS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* AI Insights Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Insights
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                <BoltIcon className="w-3 h-3" />
                AI-powered
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <HorizontaLDots className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <AngleUpIcon className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  12 leads likely to convert this week
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Based on engagement patterns and historical data
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                <AlertIcon className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  5 counsellors are underperforming
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Below average conversion rates in past 30 days
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <InfoIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  Response time increased by 15%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Consider redistributing workload
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Conversion Forecast
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                <BoltIcon className="w-3 h-3" />
                AI-powered
              </span>
            </div>
            <select className="text-sm border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0">
              <option>Next 7 days</option>
              <option>Next 30 days</option>
              <option>Next quarter</option>
            </select>
          </div>
          
          <div className="h-[200px]">
            {/* Chart Container */}
            <div className="w-full h-full" id="forecastChart">
              {/* Chart will be mounted here */}
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Conversion Forecast
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Next 4 weeks prediction with AI confidence bands
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Actual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Predicted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Confidence</span>
                  </div>
                </div>
              </div>
              
              {/* Sample Data Visualization */}
              <div className="relative w-full h-[140px] mt-4">
                <div className="absolute inset-0 flex items-end justify-between px-2">
                  {aiInsightsData.forecast.actual.map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div 
                        className="w-8 bg-indigo-600 rounded-t-sm transition-all duration-300" 
                        style={{ 
                          height: `${Math.max((value/Math.max(...aiInsightsData.forecast.actual))*100, 10)}%`,
                          opacity: value === Math.max(...aiInsightsData.forecast.actual) ? 1 : 0.8
                        }}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {aiInsightsData.forecast.labels[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Quick Actions
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                <BoltIcon className="w-3 h-3" />
                AI-powered
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                  <BoltIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Auto-assign top leads
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Optimize lead distribution
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <EnvelopeIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Re-engage cold leads
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Send personalized follow-ups
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Generate performance report
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    AI-driven insights and recommendations
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ROW 4 — LEAD TRENDS & SOURCE PERFORMANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Leads Over Time Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Leads Over Time
            </h2>
            <select className="text-sm border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          
          <div className="h-[300px] p-4 cursor-pointer group relative">
            {/* Lead Trends Chart */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Lead Trends</h3>
              <select className="text-sm border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700">
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>Last Month</option>
              </select>
            </div>
            
            <div className="relative h-[240px] mt-4">
              {/* Chart Lines */}
              <div className="absolute inset-0">
                {leadTrendsData.timeSeriesData.datasets[0].data.map((_, index) => (
                  <div key={index} className="absolute left-0 right-0 flex items-end h-full" 
                       style={{ bottom: `${(index * 20)}%` }}>
                    <div className="w-full border-b border-gray-200 dark:border-gray-700"></div>
                  </div>
                ))}
              </div>
              
              {/* Data Points */}
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-end h-full px-2">
                {leadTrendsData.timeSeriesData.datasets[0].data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 group relative">
                    <div className="relative">
                      <div className="h-32 w-4 bg-indigo-600/20 rounded-t-sm"
                           style={{ height: `${(value/Math.max(...leadTrendsData.timeSeriesData.datasets[0].data))*180}px` }}></div>
                      <div className="h-32 w-4 bg-green-500/20 rounded-t-sm absolute bottom-0 left-6"
                           style={{ height: `${(leadTrendsData.timeSeriesData.datasets[1].data[index]/Math.max(...leadTrendsData.timeSeriesData.datasets[1].data))*180}px` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {leadTrendsData.timeSeriesData.labels[index]}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="absolute top-0 right-0 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-600/20 rounded-sm"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500/20 rounded-sm"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Converted</span>
                </div>
              </div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 dark:group-hover:bg-gray-900/20 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Click to view detailed leads list
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leads by Source Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Leads by Source
            </h2>
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <HorizontaLDots className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-[300px] flex items-center justify-center cursor-pointer group relative">
            {/* Placeholder for Chart Component */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Lead Sources</h3>
              <div className="relative">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 mx-auto">
                  {leadTrendsData.sourceDistribution.data.map((value, index) => {
                    const rotation = index * (360 / leadTrendsData.sourceDistribution.data.length);
                    const percentage = value;
                    return (
                      <div
                        key={index}
                        className="absolute inset-0"
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`
                        }}
                      >
                        <div
                          className="absolute inset-0 transition-transform"
                          style={{
                            backgroundColor: leadTrendsData.sourceDistribution.backgroundColor[index],
                            opacity: 0.8,
                            transformOrigin: 'center',
                            transform: `scale(${percentage / 100})`
                          }}
                        />
                      </div>
                    );
                  })}
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full"></div>
                </div>
                
                {/* Legend */}
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {leadTrendsData.sourceDistribution.labels.map((label, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: leadTrendsData.sourceDistribution.backgroundColor[index] }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {label} ({leadTrendsData.sourceDistribution.data[index]}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-gray-600 dark:text-gray-400">Website</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-gray-600 dark:text-gray-400">Ads</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-gray-600 dark:text-gray-400">Referral</span>
              </div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 dark:group-hover:bg-gray-900/20 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Click to view leads by source
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leads by Status Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Leads by Status
            </h2>
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <HorizontaLDots className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-[300px] flex items-center justify-center cursor-pointer group relative">
            {/* Placeholder for Chart Component */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Lead Status</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
                    <span className="text-gray-500 dark:text-gray-400">Current Month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-300 rounded-sm"></div>
                    <span className="text-gray-500 dark:text-gray-400">Previous Month</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {leadTrendsData.statusDistribution.labels.map((label, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">{label}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {leadTrendsData.statusDistribution.datasets[0].data[index]}
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-indigo-300 rounded-full"
                        style={{ 
                          width: `${(leadTrendsData.statusDistribution.datasets[1].data[index] / Math.max(...leadTrendsData.statusDistribution.datasets[1].data)) * 100}%`,
                        }}
                      ></div>
                      <div 
                        className="absolute h-full bg-indigo-600 rounded-full"
                        style={{ 
                          width: `${(leadTrendsData.statusDistribution.datasets[0].data[index] / Math.max(...leadTrendsData.statusDistribution.datasets[0].data)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Legend */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 text-xs flex-wrap px-4">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                <span className="text-gray-600 dark:text-gray-400">New</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                <span className="text-gray-600 dark:text-gray-400">Contacted</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="text-gray-600 dark:text-gray-400">Follow-up</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                <span className="text-gray-600 dark:text-gray-400">Demo</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span className="text-gray-600 dark:text-gray-400">Won</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="text-gray-600 dark:text-gray-400">Lost</span>
              </div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 dark:group-hover:bg-gray-900/20 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Click to view leads by status
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Stream Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Live Activity Stream
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              New lead "John Smith" added to Web Development pipeline
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Workflow "Follow-up Email" completed for 5 leads
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">5 min ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Organization request pending approval from "Tech Solutions Inc."
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">10 min ago</span>
          </div>
        </div>
      </div>

      {/* ROW 5 — PIPELINE & STAGE PERFORMANCE */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 mt-3">
        {/* Pipeline Tabs */}
       

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Pipeline Overview (Funnel Chart) */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pipeline Overview
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last 30 days
                </span>
                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <HorizontaLDots className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Pipeline Overview</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Overall Conversion:</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {pipelineData.conversion.overall}%
                  </span>
                </div>
              </div>

              {/* Pipeline Stages Flow */}
              <div className="relative">
                <div className="flex justify-between mb-8">
                  {pipelineData.stages.labels.map((label, index) => (
                    <div key={index} className="flex flex-col items-center w-1/6">
                      <div 
                        className="w-full h-2 rounded-full mb-2"
                        style={{ 
                          backgroundColor: pipelineData.stages.colors[index],
                          opacity: 0.8
                        }}
                      ></div>
                      <div 
                        className="text-2xl font-semibold"
                        style={{ color: pipelineData.stages.colors[index] }}
                      >
                        {pipelineData.stages.data[index]}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stage Conversion Rates */}
                <div className="space-y-4 mt-6">
                  {pipelineData.conversion.byStage.map((stage, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 text-xs text-gray-600 dark:text-gray-400">
                        {stage.stage}
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${stage.rate}%`,
                            backgroundColor: pipelineData.stages.colors[index + 1]
                          }}
                        ></div>
                      </div>
                      <div className="w-12 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {stage.rate}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs Content */}
             
            </div>
          </div>

          {/* AI Suggestions Panel */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Suggestions
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40 rounded-full">
                <BoltIcon className="w-3 h-3" />
                AI-powered
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                  <AlertIcon className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    Reduce time in Demo stage
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Could improve conversion by 8%
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <AngleUpIcon className="w-4 h-4 text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    Follow-up optimization
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    24-hour response rate increased by 15%
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <InfoIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    High drop-off detected
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Between Contacted and Demo stages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage-Wise Conversion Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Stage Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stage Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Leads In
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Converted
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Drop-off %
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg. Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm text-gray-900 dark:text-white">New</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">1,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">600</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">40%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-sm text-gray-900 dark:text-white">Contacted</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">600</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">200</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">67%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">5 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-gray-900 dark:text-white">Demo</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">200</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">75%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">3 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-900 dark:text-white">Closed</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">0%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">1 day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ROW 6 — COUNSELLOR & TEAM PERFORMANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Team Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Team Leaderboard
            </h3>
            <select className="text-sm border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0">
              <option>By Conversion %</option>
              <option>By Revenue</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Counsellor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Leads
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Conversion
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-6 h-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">1</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Kim</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Senior Counsellor</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">245</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      68%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$48,500</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-900/20 rounded-full">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-400">2</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Lead Counsellor</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">198</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      62%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$42,800</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-6 h-6 bg-bronze-100 dark:bg-orange-900/20 rounded-full">
                      <span className="text-sm font-medium text-orange-800 dark:text-orange-400">3</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Maria Garcia</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Senior Counsellor</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">215</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      58%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$45,200</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-900/20 rounded-full">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-400">4</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Chen</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Counsellor</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">182</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      72%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$38,900</td>
                </tr>
                {/* Add more rows with similar structure */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="space-y-6">
          {/* Counsellor Workload Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Counsellor Workload
                </h3>
                <button 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                  title="AI will distribute new leads evenly based on counsellor capacity and performance"
                >
                  <BoltIcon className="w-4 h-4" />
                  Auto-distribute leads
                </button>
              </div>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <HorizontaLDots className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-[200px] p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Leads Assigned</h3>
                <select className="text-xs border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700">
                  <option>This Month</option>
                  <option>Last Month</option>
                </select>
              </div>
              
              <div className="relative h-[140px]">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 dark:border-gray-700 w-full" />
                  ))}
                </div>
                
                {/* Bars */}
                <div className="absolute inset-x-0 bottom-0 flex justify-around items-end h-full px-2">
                  {counsellorData.performance.labels.map((label, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 group">
                      <div className="relative">
                        <div 
                          className="w-12 bg-indigo-600 rounded-t-sm transition-all duration-300"
                          style={{ 
                            height: `${(counsellorData.performance.datasets[0].data[index] / Math.max(...counsellorData.performance.datasets[0].data)) * 120}px`,
                            opacity: 0.8
                          }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                              {counsellorData.performance.datasets[0].data[index]} leads
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px] text-center">
                        {label.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Response Time Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Response Time Distribution
              </h3>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <HorizontaLDots className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-[200px] p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Response Time</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Target: 2.1h</span>
                </div>
              </div>
              
              <div className="relative h-[140px]">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 dark:border-gray-700 w-full">
                      <span className="absolute -left-6 text-xs text-gray-400">
                        {(5 - i)}h
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Target Line */}
                <div 
                  className="absolute w-full border-t-2 border-dashed border-green-500/30"
                  style={{ top: `${(1 - (counsellorData.responseTime.target / 5)) * 100}%` }}
                />
                
                {/* Data Points */}
                <div className="absolute inset-x-0 bottom-0 flex justify-around items-end h-full px-2">
                  {counsellorData.responseTime.labels.map((label, index) => (
                    <div key={index} className="relative group">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          counsellorData.responseTime.data[index] <= counsellorData.responseTime.target
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                        style={{ 
                          marginBottom: `${(counsellorData.responseTime.data[index] / 5) * 140}px`
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            {counsellorData.responseTime.data[index]}h avg
                          </div>
                        </div>
                        
                        {index > 0 && (
                          <div 
                            className="absolute right-full w-12 h-px transform -translate-y-1/2"
                            style={{ 
                              backgroundColor: counsellorData.responseTime.data[index] <= counsellorData.responseTime.target ? '#22C55E' : '#EAB308',
                              top: '50%',
                              opacity: 0.5
                            }}
                          />
                        )}
                      </div>
                      <span className="absolute top-full mt-2 text-xs text-gray-500 dark:text-gray-400 transform -translate-x-1/2 left-1/2 whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance Alerts */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance Alerts
          </h3>
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/40 rounded-full">
            <AlertIcon className="w-3 h-3" />
            Needs Attention
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertIcon className="w-4 h-4 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                Below Average Performance
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Counsellor A is 40% below average conversion this week
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <TimeIcon className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                Response Time Alert
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                3 counsellors showing increased response times &gt; 4 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <InfoIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                Workload Distribution
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Consider redistributing leads from overloaded counsellors
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ROW 7 — LEAD QUALITY & SCORING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* AI Lead Score Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Lead Score Distribution
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                <BoltIcon className="w-3 h-3" />
                AI-powered
              </span>
            </div>
          </div>

          <div className="h-[300px] flex items-center justify-center">
            {/* Placeholder for Histogram */}
            <div className="text-center text-gray-500 dark:text-gray-400">
              <PieChartIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">
                Histogram showing lead score distribution
              </p>
            </div>
          </div>

          {/* Score Legend */}
          <div className="flex justify-between mt-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-gray-600 dark:text-gray-400">Cold (0-40)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="text-gray-600 dark:text-gray-400">Warm (41-70)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-gray-600 dark:text-gray-400">Hot (71-100)</span>
            </div>
          </div>
        </div>

        {/* Top 10 Leads Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top 10 Leads
            </h3>
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <HorizontaLDots className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Example Lead Row */}
                <tr className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-400">JD</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                      Website
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">95</span>
                      <span className="text-xs text-green-600 dark:text-green-400">+15</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserCircleIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">Sarah Kim</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </td>
                </tr>
                {/* Add more rows with similar structure */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Scoring Changes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Scoring Changes
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
              <BoltIcon className="w-3 h-3" />
              AI-powered
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Timeline Items */}
          <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-green-500"></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Lead score increased</span>
                <span className="text-xs text-green-600 dark:text-green-400">+15 points</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                John Doe's score increased after WhatsApp reply
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                10 minutes ago
              </p>
            </div>
          </div>

          <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-yellow-500"></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Lead score adjusted</span>
                <span className="text-xs text-yellow-600 dark:text-yellow-400">+5 points</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sarah Johnson viewed course details page
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                30 minutes ago
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-red-500"></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Lead score decreased</span>
                <span className="text-xs text-red-600 dark:text-red-400">-10 points</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Michael Brown missed scheduled demo call
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                1 hour ago
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ROW 8 — LEAD ACTIVITY OVERVIEW */}
      <div className="space-y-6 mb-6">
        {/* Activity Summary Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calls Tile */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Calls
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  240
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <VideoIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <AngleUpIcon className="w-4 h-4 mr-1" />
                12%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                vs last week
              </span>
            </div>
          </div>

          {/* Emails Tile */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Emails
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  180
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <EnvelopeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <AngleUpIcon className="w-4 h-4 mr-1 rotate-180" />
                5%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                vs last week
              </span>
            </div>
          </div>

          {/* WhatsApp Tile */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  WhatsApp Messages
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  320
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <PieChartIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <AngleUpIcon className="w-4 h-4 mr-1" />
                18%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                vs last week
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h3>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <HorizontaLDots className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Lead
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Owner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                        WhatsApp
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Rahul Sharma</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">Sarah Kim</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      2 mins ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                        In Progress
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-400">
                        Website
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Priya Patel</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">John Doe</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      15 mins ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
                        New
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400">
                        Email
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Amit Kumar</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">Maria Garcia</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      45 mins ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                        Contacted
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400">
                        Referral
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Sneha Reddy</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">Alex Chen</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      1 hour ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400">
                        Meeting Scheduled
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-400">
                        Social
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Arjun Singh</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">Sarah Kim</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      2 hours ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400">
                        Follow-up
                      </span>
                    </td>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                        WhatsApp
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">AK</span>
                        </div>
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">Alex Kumar</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      Sarah Kim
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      5 min ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                        Replied
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Channel Effectiveness & AI Suggestion */}
          <div className="space-y-6">
            {/* Channel Effectiveness Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Channel Effectiveness
                </h3>
                <select className="text-sm border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>

              <div className="h-[200px] flex items-center justify-center">
                {/* Placeholder for Bar Chart */}
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <PieChartIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    Bar chart comparing channel conversion rates
                  </p>
                </div>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BoltIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Channel Insight
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                WhatsApp has 22% better engagement than Calls this week. Consider prioritizing WhatsApp for initial contact.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ROW 9 — CAMPAIGN & AUTOMATION INSIGHTS */}
      <div className="space-y-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Campaigns List */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Campaigns
              </h3>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Channel
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Leads Reached
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CTR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Spring Enrollment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                        Email
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      1,240
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      24.8%
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Course Preview
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                        WhatsApp
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
                        Scheduled
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      850
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      18.2%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Workflow Automation Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Workflow Automation
            </h3>
            
            <div className="space-y-4">
              {/* Triggers */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Active Triggers
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    24
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Success Rate */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Success Rate
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    96.8%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96.8%' }}></div>
                </div>
              </div>

              {/* Failed Executions */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Failed Executions
                  </span>
                  <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                    12
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '3.2%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign ROI Graph */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Campaign ROI
              </h3>
              <select className="text-sm border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="h-[300px] flex items-center justify-center">
              {/* Placeholder for Line Chart */}
              <div className="text-center text-gray-500 dark:text-gray-400">
                <PieChartIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">
                  Line chart showing leads generated per campaign over time
                </p>
              </div>
            </div>
          </div>

          {/* AI Optimization Note */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Campaign Alert
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Consider pausing "Spring Early Bird" campaign:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  ROI is 2.3% below average
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  Click-through rate declining by 5% weekly
                </li>
              </ul>
              <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 dark:border-red-700 text-sm font-medium rounded-lg text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800">
                Review Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ROW 10 — GEO & TERRITORY INSIGHTS */}
      <div className="space-y-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Geo Map (Heatmap) */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Geographic Distribution
              </h3>
              <select className="text-sm border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0">
                <option>All Leads</option>
                <option>New Leads</option>
                <option>Converted Leads</option>
              </select>
            </div>

            <div className="relative h-[400px] bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              {/* Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <PieChartIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    Interactive heatmap showing lead density by region
                  </p>
                  <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">
                    Hover for lead count • Click to view local leads
                  </p>
                </div>
              </div>

              {/* Sample Tooltip */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 pointer-events-none hidden">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Mumbai Region
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  428 Active Leads
                </p>
              </div>
            </div>
          </div>

          {/* Territory Performance Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Territory Performance
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Territory
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Leads
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Converted
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Counsellors
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Mumbai West
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      245
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-green-600 dark:text-green-400">68%</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      4
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Thane
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      183
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-yellow-600 dark:text-yellow-400">42%</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Geo Assignment Efficiency */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Territory Response Time
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertIcon className="w-4 h-4" />
                2 territories need attention
              </span>
              <select className="text-sm border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0">
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
              </select>
            </div>
          </div>

          <div className="h-[200px] flex items-center justify-center">
            {/* Placeholder for Bar Chart */}
            <div className="text-center text-gray-500 dark:text-gray-400">
              <PieChartIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">
                Bar chart showing average response time by territory
              </p>
            </div>
          </div>

          {/* Territory Alert */}
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertIcon className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Slow Response Alert
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Navi Mumbai territory showing 4.2hr average response time (2.1hr above target).
                  Consider redistributing leads or adding support staff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart Data */}
    

      {/* Footer Section */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Version & Update Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  CRM v2.0.1
                </span>
                <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20 rounded-full">
                  AI Beta
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TimeIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Updated 2 mins ago
                </span>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <span className="sr-only">Help & Feedback</span>
                <InfoIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant Dock */}
        <div className="fixed bottom-6 right-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-colors">
            <BoltIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Ask AI Assistant</span>
          </button>
        </div>
      </div>
    </>
  );
}