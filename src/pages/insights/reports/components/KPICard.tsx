import { Pin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Info, MoreVertical, TrendingDown, TrendingUp } from 'react-feather';

interface KPICardProps {
  title: string;
  value: string | number;
  delta: number;
  sparklineData?: number[];
  info?: string;
  isPinned?: boolean;
  onPin?: () => void;
  className?: string;
}

export default function KPICard({
  title,
  value,
  delta,
  sparklineData = [],
  info,
  isPinned = false,
  onPin,
  className = ''
}: KPICardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDeltaPositive = delta > 0;
  const formattedDelta = Math.abs(delta).toFixed(1);

  // Handle clicking outside of menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenInNewReport = () => {
    console.log('Opening in new report:', title);
    setIsMenuOpen(false);
  };

  const handleCreateAlert = () => {
    console.log('Creating alert for:', title);
    setIsMenuOpen(false);
  };

  const handleAddToDashboard = () => {
    console.log('Adding to dashboard:', title);
    setIsMenuOpen(false);
  };

  return (
    <div className={`relative group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {/* Pin Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPin?.();
        }}
        className={`absolute top-2 right-8 z-10 p-1.5 rounded-full transition-all
          ${isPinned ? 'bg-brand-100 text-brand-600' : 'bg-transparent text-gray-400'}
          opacity-0 group-hover:opacity-100`}
      >
        <Pin className="w-4 h-4" />
      </button>

      {/* Card Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
            {info && (
              <div className="relative group/tooltip">
                <Info className="w-4 h-4 text-gray-400" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-20">
                  {info}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </div>
            )}
          </div>

          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-30 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleOpenInNewReport}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Open in new report
                </button>
                <button
                  onClick={handleCreateAlert}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Create Alert
                </button>
                <button
                  onClick={handleAddToDashboard}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Add to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Metric Value and Delta */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</span>
          <div className={`flex items-center text-sm ${isDeltaPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isDeltaPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span>{formattedDelta}%</span>
          </div>
        </div>

        {/* Sparkline */}
        {sparklineData.length > 0 && (
          <div className="h-10 mt-2">
            <div className="flex items-end h-full space-x-0.5">
              {sparklineData.map((dataPoint, index) => {
                const max = Math.max(...sparklineData);
                const height = `${(dataPoint / max) * 100}%`;
                return (
                  <div
                    key={index}
                    className="flex-1 bg-opacity-20 rounded-sm transition-all hover:bg-opacity-40"
                    style={{
                      height,
                      backgroundColor: isDeltaPositive ? '#10B981' : '#EF4444'
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}