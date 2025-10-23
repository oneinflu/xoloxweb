/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AngleLeftIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  PaperPlaneIcon,
  CloseIcon,
  HorizontaLDots,
  PlusIcon,
  ChevronDownIcon,
  LockIcon,
  FileIcon,
} from '../../icons';

type InviteMode = 'single' | 'bulk' | 'manual';


const InviteUser = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<InviteMode>('single');

  return (
    <div className="p-6 space-y-6">
      {/* Page Header / Context Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link 
            to="/users" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <AngleLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Link>
          <div className="flex items-center justify-between flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Invite / Register New User
            </h1>
            
            {/* Invite Options Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Invite User
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                  <button
                    onClick={() => {
                      setActiveTab('single');
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                    Single Invite
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('bulk');
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FileIcon className="w-4 h-4" />
                    Bulk Invite
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('manual');
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <LockIcon className="w-4 h-4" />
                    Register Manually
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>

      {/* Invite Forms */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'single' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Single User Invite</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700">
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Send Invite
            </button>
          </div>
        )}

        {activeTab === 'bulk' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Bulk User Invite</h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <div className="space-y-2">
                <FileIcon className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download template: <button className="text-blue-600 hover:underline">CSV Template</button>
                </p>
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload and Send Invites
            </button>
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Manual Registration</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700">
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700"
                />
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Account
            </button>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Requests Sent */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <PaperPlaneIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400">↑ 12%</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">247</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Invitations Sent</p>
        </div>

        {/* Requests Received */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <EnvelopeIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400">↑ 8%</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">32</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Join Requests</p>
        </div>

        {/* Requests Approved */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400">↑ 15%</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">189</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Approved Users</p>
        </div>

        {/* Requests Rejected */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <CloseIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm text-red-600 dark:text-red-400">↓ 3%</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">15</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Rejected Requests</p>
        </div>
      </div>

      {/* Pending Join Requests Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Join Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requested Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Sample Request 1 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" 
                        alt="User avatar"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Sarah Wilson</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Product Designer</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">sarah.wilson@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">Designer</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                      <CloseIcon className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <HorizontaLDots className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
              {/* Sample Request 2 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src="https://ui-avatars.com/api/?name=Sarah+Smith&background=4F46E5&color=fff" 
                        alt="User avatar"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Michael Chen</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">michael.chen@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">Developer</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                      <CloseIcon className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <HorizontaLDots className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

     
    </div>
  );
};

export default InviteUser;