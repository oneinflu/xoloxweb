import { useState, useRef } from 'react';
import { Share2, Star, Clock, MoreVertical } from 'react-feather';
import type { Dashboard } from '../types/dashboard';

interface DashboardCardProps {
  dashboard: Dashboard;
  onOpen: (id: string) => void;
  onShare: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onSchedule: (id: string) => void;
}

export default function DashboardCard({
  dashboard,
  onOpen,
  onShare,
  onToggleFavorite,
  onSchedule
}: DashboardCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="relative"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Card Header */}
        <div className="relative h-32 rounded-t-lg overflow-hidden">
          <img
            src={dashboard.thumbnail}
            alt={dashboard.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
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

        {/* Card Content */}
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <h3 
              className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-brand-600"
              onClick={() => onOpen(dashboard.id)}
            >
              {dashboard.name}
            </h3>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => onShare(dashboard.id)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button
                    onClick={() => onToggleFavorite(dashboard.id)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {dashboard.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  <button
                    onClick={() => onSchedule(dashboard.id)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <img
                src={dashboard.owner.avatar}
                alt={dashboard.owner.name}
                className="w-4 h-4 rounded-full mr-1"
              />
              <span>{dashboard.owner.name}</span>
            </div>
            <span>
              {new Date(dashboard.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}