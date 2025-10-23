/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AngleRightIcon,
  PlusIcon,
  
  InfoIcon,
  UserCircleIcon,
  LockIcon,
  AlertIcon,
  TimeIcon,
  PencilIcon,
  CopyIcon,
  CloseIcon,
  HorizontaLDots,
  ChevronLeftIcon,
  ChevronDownIcon,
  
  EyeIcon,
  DownloadIcon,
  ShootingStarIcon,
  
} from '../../icons';

// Role Detail Drawer Types

interface AuditLog {
  id: number;
  changedBy: string;
  date: string;
  summary: string;
}
const RoleDetailDrawer: React.FC<RoleDetailDrawerProps> = ({ role, isOpen, onClose }) => {
  type TabId = 'Overview' | 'Permissions' | 'Users' | 'Audit';
  
  const [activeTab, setActiveTab] = useState<TabId>('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const tabs: { id: TabId; label: string | React.ReactNode }[] = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Permissions', label: 'Permissions' },
    { id: 'Users', label: (
      <div className="flex items-center gap-2">
        <span>Users</span>
        <Badge variant="light" color="primary" size="sm">
          {role?.usersCount || 0}
        </Badge>
      </div>
    )},
    { id: 'Audit', label: 'Audit Log' },
  ];

  // Sample audit logs
  const auditLogs: AuditLog[] = [
    {
      id: 1,
      changedBy: 'John Smith',
      date: '2024-03-20 14:30',
      summary: 'Updated user management permissions'
    },
    {
      id: 2,
      changedBy: 'Sarah Lee',
      date: '2024-03-19 11:15',
      summary: 'Modified report access settings'
    }
  ];

  return (
    <div className={`fixed inset-0 z-[99999999] ${isOpen ? 'block' : 'hidden'}`}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/80 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[900px] max-w-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {role ? (
                <>
                  {isEditing ? (
                    <input
                      type="text"
                      value={role.name}
                      className="text-xl font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none px-1"
                      onBlur={() => setIsEditing(false)}
                    />
                  ) : (
                    <h2 
                      className="text-xl font-semibold text-gray-800 dark:text-white cursor-pointer"
                      onClick={() => setIsEditing(true)}
                    >
                      {role.name}
                    </h2>
                  )}
                  <Badge variant="light" color={role.isDefault ? 'info' : 'primary'}>
                    {role.isDefault ? 'Default' : 'Custom Role'}
                  </Badge>
                </>
              ) : (
                <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                  Select a Role
                </h2>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {role ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Access Level</h3>
                      <p className="text-gray-800 dark:text-white">{role.accessLevel}</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Users Assigned</h3>
                      <p className="text-gray-800 dark:text-white">{role.usersCount}</p>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Modules</h3>
                    <div className="flex flex-wrap gap-2">
                      {role.modules.map((module) => (
                        <Badge key={module} variant="light" color="primary">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Created By</h3>
                    <p className="text-gray-800 dark:text-white">{role.createdBy}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{role.updatedAt}</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                        <InfoIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300">
                          AI Role Suggestion
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                          4 users might be better suited for Manager role based on their activity patterns and responsibilities.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  No role selected
                </div>
              )}
            </div>
          )}

          {activeTab === 'Users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Assigned Users</h3>
                  <Badge variant="light" color="primary">{role?.usersCount || 0} users</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-9 pr-4 py-2 text-sm border rounded-lg w-64 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <EyeIcon className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <PlusIcon className="w-4 h-4" />
                    Add/Remove Users
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell isHeader className="py-3 px-4">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </TableCell>
                      <TableCell isHeader className="py-3 px-4">Name</TableCell>
                      <TableCell isHeader className="py-3 px-4">Email</TableCell>
                      <TableCell isHeader className="py-3 px-4">Team</TableCell>
                      <TableCell isHeader className="py-3 px-4">Status</TableCell>
                      <TableCell isHeader className="py-3 px-4">Last Active</TableCell>
                      <TableCell isHeader className="py-3 px-4">Actions</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: '1', name: 'Sarah Chen', email: 'sarah.chen@example.com', team: 'Sales', status: 'active', lastActive: '2 hours ago' },
                      { id: '2', name: 'John Smith', email: 'john.smith@example.com', team: 'Marketing', status: 'active', lastActive: '1 day ago' },
                      { id: '3', name: 'Maria Garcia', email: 'maria.garcia@example.com', team: 'Support', status: 'inactive', lastActive: '3 days ago' },
                      { id: '4', name: 'Alex Kumar', email: 'alex.kumar@example.com', team: 'Sales', status: 'active', lastActive: '5 mins ago' },
                      { id: '5', name: 'Emma Wilson', email: 'emma.wilson@example.com', team: 'Marketing', status: 'active', lastActive: '1 hour ago' }
                    ].map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <TableCell className="py-3 px-4">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-500 dark:text-gray-400">{user.email}</TableCell>
                        <TableCell className="py-3 px-4">
                          <Badge variant="light" color="primary" size="sm">{user.team}</Badge>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <Badge variant="light" color={user.status === 'active' ? 'success' : 'warning'} size="sm">{user.status}</Badge>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500" title="Edit user">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500" title="Remove user">
                              <CloseIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {activeTab === 'Permissions' && (
            <div className="-mx-6">
              <PermissionsMatrix
                permissions={defaultPermissions}
                onPermissionChange={(moduleIndex, action) => {
                  // Handle permission change
                  console.log('Permission changed:', { moduleIndex, action });
                }}
                onBulkPermissionChange={(action, value) => {
                  // Handle bulk permission change
                  console.log('Bulk permission changed:', { action, value });
                }}
              />
              
              {/* Advanced Permission Settings */}
              <div className="mt-8 space-y-4 px-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <InfoIcon className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Advanced Settings</h3>
                </div>

                {/* Field-Level Permissions */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750"
                    onClick={() => setExpandedPanel(expandedPanel === 'fields' ? null : 'fields')}
                  >
                    <div className="flex items-center gap-3">
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Field-Level Permissions</span>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Workflow Access Control */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750"
                  >
                    <div className="flex items-center gap-3">
                      <AlertIcon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Workflow Access Control</span>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Integration Access */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750"
                  >
                    <div className="flex items-center gap-3">
                      <LockIcon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Integration Access</span>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Audit' && (
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div 
                  key={log.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {log.changedBy}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {log.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {log.summary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed bottom bar with save actions and global tools */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {/* Version info and export */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <TimeIcon className="w-4 h-4" />
              <span>Last updated 2 hours ago by Suurya</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1"
                title="Export role configuration"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Export JSON</span>
              </button>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-gray-500 dark:text-gray-400">v1.2.0</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => {/* TODO: Show reset confirmation modal */}}
              >
                <AlertIcon className="w-4 h-4" />
                Reset to Defaults
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                onClick={() => {/* TODO: Clone role */}}
              >
                <CopyIcon className="w-4 h-4" />
                Clone Role
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => {/* TODO: Trigger AI configuration */}}
              >
                <ShootingStarIcon className="w-4 h-4" />
                AI Auto-Configure
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                Discard Changes
              </button>
              <button
                onClick={async () => {
                  setIsSaving(true);
                  try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setIsEditing(false);
                    // You would typically save changes to the backend here
                  } catch (error) {
                    console.error('Failed to save changes:', error);
                  } finally {
                    setIsSaving(false);
                  }
                }}
                disabled={!isEditing || isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                {isSaving && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* AI Assistant Dock */}
          <div className="fixed bottom-4 right-4 z-50">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              onClick={() => {/* TODO: Open AI assistant */}}
            >
              <ShootingStarIcon className="w-5 h-5" />
              <span>Ask AI Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/table';
import Badge from '../../components/ui/badge/Badge';

interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  accessLevel: 'Full' | 'Limited' | 'Custom';
  modules: string[];
  createdBy: string;
  isDefault: boolean;
  updatedAt: string;
}

const RolesPermissions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
    setIsDrawerOpen(true);
  };

  // Sample data - replace with actual data
  const roles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access and control',
      usersCount: 3,
      accessLevel: 'Full',
      modules: ['All Modules'],
      createdBy: 'System',
      isDefault: true,
      updatedAt: '2024-03-15',
    },
    {
      id: '2',
      name: 'Team Lead',
      description: 'Manages team and project resources',
      usersCount: 12,
      accessLevel: 'Custom',
      modules: ['CRM', 'Projects', 'Reports'],
      createdBy: 'John Smith',
      isDefault: false,
      updatedAt: '2024-03-14',
    },
    {
      id: '3',
      name: 'Developer',
      description: 'Access to development tools and resources',
      usersCount: 45,
      accessLevel: 'Limited',
      modules: ['Projects', 'Git', 'CI/CD'],
      createdBy: 'Sarah Connor',
      isDefault: false,
      updatedAt: '2024-03-13',
    },
  ];

  // Filter roles based on search query
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredRoles.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Header / Context Bar */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Roles & Permissions
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <AngleRightIcon className="w-3 h-3" />
            <Link to="/users" className="hover:text-blue-600">Users</Link>
            <AngleRightIcon className="w-3 h-3" />
            <span>Roles & Permissions</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search roles or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64 dark:bg-gray-800 dark:border-gray-700"
            />
            <EyeIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="w-5 h-5" />
            Add Role
          </button>
          
          <button 
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 transition-colors" 
            title="Learn about roles and permissions"
          >
            <InfoIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Roles</p>
              <p className="text-2xl font-semibold mt-1">7</p>
              <p className="text-xs text-green-600 mt-1">↑ 2 new this month</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <LockIcon className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Users Assigned</p>
              <p className="text-2xl font-semibold mt-1">128</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <UserCircleIcon className="w-6 h-6 text-green-600 dark:text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
              <p className="text-2xl font-semibold mt-1">3</p>
              <p className="text-xs text-yellow-600 mt-1">Requires attention</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <TimeIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overlap Detected</p>
              <p className="text-2xl font-semibold mt-1">2</p>
              <p className="text-xs text-purple-600 mt-1">Review suggested</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <AlertIcon className="w-6 h-6 text-purple-600 dark:text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Role Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Users
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Access Level
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Modules
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created By
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginatedRoles.map((role) => (
                <TableRow 
                  key={role.id} 
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
                  onClick={() => handleRoleClick(role)}
                >
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{role.name}</span>
                      {role.isDefault && (
                        <Badge variant="light" color="info" size="sm">Default</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-500 text-theme-sm dark:text-gray-400">
                    {role.description}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{role.usersCount}</span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge
                      variant="light"
                      color={
                        role.accessLevel === 'Full' 
                          ? 'info' 
                          : role.accessLevel === 'Custom' 
                          ? 'warning' 
                          : 'primary'
                      }
                    >
                      {role.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {role.modules.map((module) => (
                        <Badge key={module} variant="light" color="primary" size="sm">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-theme-sm dark:text-white/90">{role.createdBy}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{role.updatedAt}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors" 
                        title="Edit role"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors" 
                        title="Duplicate role"
                      >
                        <CopyIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors" 
                        title="Delete role"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                        title="More options"
                      >
                        <HorizontaLDots className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredRoles.length)} of {filteredRoles.length} roles
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border dark:border-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border dark:border-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Role Detail Drawer */}
      <RoleDetailDrawer
        role={selectedRole}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
// Permission types
type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'manage' | 'export' | 'share';

interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  manage: boolean;
  export: boolean;
  share: boolean;
}

interface ModulePermission extends Permission {
  subModules?: Permission[];
  isExpanded?: boolean;
}

const isPermissionAction = (key: string): key is PermissionAction => {
  return ['view', 'create', 'edit', 'delete', 'manage', 'export', 'share'].includes(key);
};

interface PermissionsMatrixProps {
  permissions: ModulePermission[];
  onPermissionChange: (moduleIndex: number, action: keyof Permission) => void;
  onBulkPermissionChange: (action: keyof Permission, value: boolean) => void;
}

interface RoleDetailDrawerProps {
  role: Role | null;
  isOpen: boolean;
  onClose: () => void;
}

const defaultPermissions: ModulePermission[] = [
  {
    module: "Leads & CRM",
    view: true,
    create: true,
    edit: true,
    delete: false,
    manage: false,
    export: true,
    share: false,
    isExpanded: true,
    subModules: [
      {
        module: "Leads",
        view: true,
        create: true,
        edit: true,
        delete: false,
        manage: false,
        export: true,
        share: false,
      },
      {
        module: "Pipelines",
        view: true,
        create: true,
        edit: true,
        delete: false,
        manage: false,
        export: true,
        share: false,
      }
    ]
  },
  {
    module: "Workflows",
    view: true,
    create: true,
    edit: true,
    delete: true,
    manage: true,
    export: true,
    share: true,
  },
  {
    module: "Campaigns",
    view: true,
    create: true,
    edit: false,
    delete: false,
    manage: true,
    export: false,
    share: false,
  },
  {
    module: "Reports",
    view: true,
    create: false,
    edit: false,
    delete: false,
    manage: false,
    export: true,
    share: false,
  },
  {
    module: "AI Insights",
    view: true,
    create: false,
    edit: false,
    delete: false,
    manage: false,
    export: true,
    share: false,
  },
  {
    module: "Settings",
    view: false,
    create: false,
    edit: false,
    delete: false,
    manage: false,
    export: false,
    share: false,
  }
];

const PermissionsMatrix: React.FC<PermissionsMatrixProps> = ({
  permissions,
  onPermissionChange,
  onBulkPermissionChange
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const actions: { key: keyof Permission; label: string; tooltip: string }[] = [
    { key: 'view', label: 'View', tooltip: 'Access to view data in this module' },
    { key: 'create', label: 'Create', tooltip: 'Create new items in this module' },
    { key: 'edit', label: 'Edit', tooltip: 'Modify existing data in this module' },
    { key: 'delete', label: 'Delete', tooltip: 'Permanently removes data from module' },
    { key: 'manage', label: 'Manage', tooltip: 'Full control over module settings and configuration' },
    { key: 'export', label: 'Export', tooltip: 'Download or export data from this module' },
    { key: 'share', label: 'Share', tooltip: 'Share module data with other users' }
  ];

  const toggleModule = (module: string) => {
    setExpandedModules(prev => 
      prev.includes(module) 
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const filteredPermissions = permissions.filter(p => 
    p.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <EyeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Permissions Grid */}
      <div className="relative overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-16 bg-white dark:bg-gray-800">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4 font-medium text-gray-500 dark:text-gray-400">
                Module
              </th>
              {actions.map(action => (
                <th 
                  key={action.key}
                  className="text-center py-4 px-4 font-medium text-gray-500 dark:text-gray-400"
                  title={action.tooltip}
                >
                  <div className="flex flex-col items-center gap-2">
                    {action.label}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={(e) => onBulkPermissionChange(action.key, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPermissions.map((permission, moduleIndex) => (
              <>
                <tr key={permission.module} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {permission.subModules && (
                        <button
                          onClick={() => toggleModule(permission.module)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          {expandedModules.includes(permission.module) ? (
                            <ChevronDownIcon className="w-4 h-4" />
                          ) : (
                            <ChevronLeftIcon className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      <span className="font-medium text-gray-800 dark:text-white">
                        {permission.module}
                      </span>
                    </div>
                  </td>
                  {actions.map(action => (
                    <td key={action.key} className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isPermissionAction(action.key) ? permission[action.key] : false}
                        onChange={() => onPermissionChange(moduleIndex, action.key)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                      />
                    </td>
                  ))}
                </tr>
                {permission.subModules && expandedModules.includes(permission.module) && (
                  permission.subModules.map((subModule, subIndex) => (
                    <tr key={subModule.module} className="bg-gray-50 dark:bg-gray-700/30">
                      <td className="py-4 px-4 pl-10">
                        <span className="text-gray-800 dark:text-white">
                          {subModule.module}
                        </span>
                      </td>
                      {actions.map(action => (
                        <td key={action.key} className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isPermissionAction(action.key) ? subModule[action.key] : false}
                            onChange={() => {
                              // Calculate the effective module index for the submodule
                              const effectiveModuleIndex = moduleIndex + subIndex + 1;
                              onPermissionChange(effectiveModuleIndex, action.key);
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default RolesPermissions;