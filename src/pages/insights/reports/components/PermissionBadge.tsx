import { Eye, Edit, Shield } from 'react-feather';
import type { Permission } from '../types/dashboard.ts';

interface PermissionBadgeProps {
  permission: Permission;
  className?: string;
}

const permissionConfig = {
  view: {
    icon: Eye,
    label: 'View',
    className: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  },
  edit: {
    icon: Edit,
    label: 'Edit',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  },
  admin: {
    icon: Shield,
    label: 'Admin',
    className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  }
};

export default function PermissionBadge({ permission, className = '' }: PermissionBadgeProps) {
  const config = permissionConfig[permission];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}