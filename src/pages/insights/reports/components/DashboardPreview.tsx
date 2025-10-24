import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Dashboard } from '../types/dashboard';
import PermissionBadge from './PermissionBadge';

interface DashboardPreviewProps {
  dashboard: Dashboard;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export default function DashboardPreview({ dashboard, onClose, anchorEl }: DashboardPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    function handleScroll() {
      onClose();
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [onClose]);

  if (!anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();
  const previewStyle = {
    position: 'fixed' as const,
    zIndex: 9999,
    left: `${rect.left + rect.width / 2}px`,
    top: `${rect.top - 10}px`,
    transform: 'translate(-50%, -100%)',
  };

  return createPortal(
    <div
      ref={previewRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-96"
      style={previewStyle}
    >
      <div className="relative">
        <img
          src={dashboard.thumbnail}
          alt={dashboard.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <div className="absolute top-2 right-2 space-x-1">
          {dashboard.isPrivate && (
            <span className="bg-gray-900 bg-opacity-50 text-white px-2 py-0.5 rounded text-xs">
              Private
            </span>
          )}
          {dashboard.isShared && (
            <span className="bg-blue-900 bg-opacity-50 text-white px-2 py-0.5 rounded text-xs">
              Shared
            </span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {dashboard.name}
      </h3>
      
      {dashboard.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {dashboard.description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <img
            src={dashboard.owner.avatar}
            alt={dashboard.owner.name}
            className="w-6 h-6 rounded-full"
          />
          <span>{dashboard.owner.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          {dashboard.permissions.map((perm, idx) => (
            <PermissionBadge key={idx} permission={perm.permission} />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}