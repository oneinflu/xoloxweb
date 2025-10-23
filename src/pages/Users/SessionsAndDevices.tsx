/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import {
  MonitorIcon,
  ClockIcon,
  AlertTriangleIcon,
  LogOutIcon,
  RefreshCwIcon,
  SmartphoneIcon,
  TabletIcon,
  CpuIcon,
  MoreVerticalIcon,
} from 'lucide-react';

// Types
interface Session {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'other';
  os: string;
  ip: string;
  location: {
    city: string;
    country: string;
    isp: string;
  };
  browserVersion: string;
  loginTime: string;
  lastActivity: {
    time: string;
    action: string;
  };
  status: 'active' | 'idle' | 'terminated';
  isCurrentDevice: boolean;
}

interface SecuritySummary {
  activeSessions: number;
  recentLogins: number;
  suspiciousActivity: number;
  lastLogout: {
    time: string;
    device: string;
  };
}

const SessionsAndDevices = () => {
  // Mock data for sessions
  const mockSessions: Session[] = [
    {
      id: '1',
      deviceName: 'Chrome on MacBook Pro',
      deviceType: 'desktop',
      os: 'macOS Sonoma 14.1',
      ip: '192.168.1.100',
      location: {
        city: 'San Francisco',
        country: 'USA',
        isp: 'Comcast'
      },
      browserVersion: 'Chrome v121.0.6167.85',
      loginTime: 'Today at 09:43 AM',
      lastActivity: {
        time: '2 mins ago',
        action: 'Viewed Dashboard'
      },
      status: 'active',
      isCurrentDevice: true
    },
    {
      id: '2',
      deviceName: 'iPhone 15 Pro',
      deviceType: 'mobile',
      os: 'iOS 17.2',
      ip: '172.20.10.2',
      location: {
        city: 'New York',
        country: 'USA',
        isp: 'AT&T'
      },
      browserVersion: 'Mobile App v2.1.0',
      loginTime: 'Yesterday at 3:15 PM',
      lastActivity: {
        time: '45 mins ago',
        action: 'Updated Profile'
      },
      status: 'idle',
      isCurrentDevice: false
    },
    {
      id: '3',
      deviceName: 'Firefox on Windows',
      deviceType: 'desktop',
      os: 'Windows 11 Pro',
      ip: '10.0.0.15',
      location: {
        city: 'London',
        country: 'UK',
        isp: 'Virgin Media'
      },
      browserVersion: 'Firefox v123.0',
      loginTime: 'Today at 11:30 AM',
      lastActivity: {
        time: '5 mins ago',
        action: 'Exported Reports'
      },
      status: 'active',
      isCurrentDevice: false
    },
    {
      id: '4',
      deviceName: 'iPad Air',
      deviceType: 'tablet',
      os: 'iPadOS 17.2',
      ip: '192.168.0.105',
      location: {
        city: 'Toronto',
        country: 'Canada',
        isp: 'Rogers'
      },
      browserVersion: 'Safari v17.2',
      loginTime: '2 days ago',
      lastActivity: {
        time: '3 hours ago',
        action: 'Viewed Analytics'
      },
      status: 'terminated',
      isCurrentDevice: false
    }
  ];

  // State
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [securitySummary, setSecuritySummary] = useState<SecuritySummary>({
    activeSessions: 4,
    recentLogins: 23,
    suspiciousActivity: 1,
    lastLogout: {
      time: '3 hours ago',
      device: 'Chrome (Windows)',
    },
  });

  // Filter states
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  // Handlers
  const handleRefresh = () => {
    // Reset sessions to initial mock data
    setSessions(mockSessions);
    
    // Update security summary
    setSecuritySummary(prev => ({
      ...prev,
      activeSessions: mockSessions.filter(session => session.status === 'active').length
    }));
  };

  const handleRevokeSession = (sessionId: string) => {
    // Remove the session from the list
    setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
    
    // Update security summary to reflect the change
    setSecuritySummary(prev => ({
      ...prev,
      activeSessions: prev.activeSessions - 1
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      {/* ROW 1 - Header / Context Bar */}
      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Sessions & Devices
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Dashboard / Security / Sessions & Devices
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
              {securitySummary.activeSessions} Active Sessions
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              title="Refresh sessions"
            >
              <RefreshCwIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 flex gap-4">
          <select
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
          >
            <option value="all">All Devices</option>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
          </select>
          <select
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="terminated">Terminated</option>
          </select>
          <select
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* ROW 2 - Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Active Sessions Card */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <MonitorIcon className="w-8 h-8 text-blue-500 mb-4" />
          <div className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
            {securitySummary.activeSessions} Active
          </div>
          <div className="text-blue-600 dark:text-blue-400">Active Sessions</div>
        </div>

        {/* Recent Logins Card */}
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <ClockIcon className="w-8 h-8 text-green-500 mb-4" />
          <div className="text-2xl font-semibold text-green-700 dark:text-green-300">
            {securitySummary.recentLogins} Logins
          </div>
          <div className="text-green-600 dark:text-green-400">Last 7 Days</div>
        </div>

        {/* Suspicious Activity Card */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl">
          <AlertTriangleIcon className="w-8 h-8 text-amber-500 mb-4" />
          <div className="text-2xl font-semibold text-amber-700 dark:text-amber-300">
            {securitySummary.suspiciousActivity} Detected
          </div>
          <div className="text-amber-600 dark:text-amber-400">Suspicious Activity</div>
        </div>

        {/* Last Logout Card */}
        <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-xl">
          <LogOutIcon className="w-8 h-8 text-gray-500 mb-4" />
          <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            {securitySummary.lastLogout.time}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            from {securitySummary.lastLogout.device}
          </div>
        </div>
      </div>

      {/* ROW 3 - Active Sessions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Device Info</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">IP Address</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Browser/App</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Login Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Last Activity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sessions.map((session) => (
              <tr
                key={session.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {session.deviceType === 'desktop' && <MonitorIcon className="w-5 h-5" />}
                    {session.deviceType === 'mobile' && <SmartphoneIcon className="w-5 h-5" />}
                    {session.deviceType === 'tablet' && <TabletIcon className="w-5 h-5" />}
                    {session.deviceType === 'other' && <CpuIcon className="w-5 h-5" />}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {session.deviceName}
                        {session.isCurrentDevice && (
                          <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                            This device
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{session.os}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white" title={`ISP: ${session.location.isp}`}>
                    {session.ip}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {session.location.city}, {session.location.country}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">{session.browserVersion}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">{session.loginTime}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {session.lastActivity.time} – {session.lastActivity.action}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                      session.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                        : session.status === 'idle'
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                    }`}
                  >
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <MoreVerticalIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionsAndDevices;