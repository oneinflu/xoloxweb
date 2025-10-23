import { useState } from 'react';
import { Menu } from '@headlessui/react';
import {
  AngleRightIcon,
  PlusIcon,
  ChevronDownIcon,
  HorizontaLDots,
  EnvelopeIcon,
  LockIcon,
  AlertIcon,
  CheckCircleIcon,
  UserCircleIcon,
} from '../../icons';
import Badge from '../../components/ui/badge/Badge';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../../components/ui/table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  team: string;
  lastActive: string;
  conversion: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'Admin',
    status: 'active',
    team: 'Sales',
    lastActive: '2 hours ago',
    conversion: 85,
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Manager',
    status: 'active',
    team: 'Marketing',
    lastActive: '1 day ago',
    conversion: 72,
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'User',
    status: 'inactive',
    team: 'Support',
    lastActive: '3 days ago',
    conversion: 45,
  },
  {
    id: '4',
    name: 'Alex Kumar',
    email: 'alex.kumar@example.com',
    role: 'Manager',
    status: 'active',
    team: 'Sales',
    lastActive: '5 mins ago',
    conversion: 92,
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    role: 'User',
    status: 'active',
    team: 'Marketing',
    lastActive: '1 hour ago',
    conversion: 68,
  },
];

const AllUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === mockUsers.length
        ? []
        : mockUsers.map(user => user.id)
    );
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          All Users
        </h1>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>Dashboard</span>
          <AngleRightIcon className="w-4 h-4 mx-2" />
          <span>Users</span>
          <AngleRightIcon className="w-4 h-4 mx-2" />
          <span>All Users</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
        {/* Total Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <UserCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-green-600 dark:text-green-400">↑ 12%</span>
              <span className="text-gray-500 dark:text-gray-400">vs last week</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">156</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
        </div>

        {/* Active Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-green-600 dark:text-green-400">↑ 8%</span>
              <span className="text-gray-500 dark:text-gray-400">vs last week</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">87</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Active Users (Today)</p>
        </div>

        {/* Inactive Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-red-600 dark:text-red-400">↑ 3%</span>
              <span className="text-gray-500 dark:text-gray-400">vs last week</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">12</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Inactive Users</p>
        </div>

        {/* Pending Invitations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <EnvelopeIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-600 dark:text-yellow-400">↓ 5%</span>
              <span className="text-gray-500 dark:text-gray-400">vs last week</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">8</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Invitations</p>
        </div>

        {/* Teams Count */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <UserCircleIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-purple-600 dark:text-purple-400">↑ 2%</span>
              <span className="text-gray-500 dark:text-gray-400">vs last week</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">6</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Teams Count</p>
        </div>

        {/* Roles Count */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <LockIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-500 dark:text-gray-400">No change</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">7</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Roles Count</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search and Filters - Left Side */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>

            <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">Team</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="support">Support</option>
            </select>
          </div>
        </div>

        {/* Actions - Right Side */}
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          {/* Bulk Actions */}
          <Menu as="div" className="relative">
            <Menu.Button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
              Bulk Actions
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} w-full text-left px-4 py-2 text-gray-900 dark:text-white`}>
                    Activate
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} w-full text-left px-4 py-2 text-gray-900 dark:text-white`}>
                    Deactivate
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} w-full text-left px-4 py-2 text-red-600 dark:text-red-400`}>
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>

          {/* Export Button */}
          <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
            Export
          </button>

          {/* Add User Button */}
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="divide-y divide-gray-200 dark:divide-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableCell isHeader className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === mockUsers.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Team
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Active
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Conversion
                </TableCell>
                <TableCell isHeader className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      size="sm"
                      variant="light"
                      color={user.status === 'active' ? 'success' : 'light'}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.team}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.lastActive}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 dark:text-white mr-2">
                        {user.conversion}%
                      </span>
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${user.conversion}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Menu as="div" className="relative">
                      <Menu.Button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <HorizontaLDots className="w-5 h-5" />
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} w-full text-left px-4 py-2 text-gray-900 dark:text-white`}>
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} w-full text-left px-4 py-2 text-red-600 dark:text-red-400`}>
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;