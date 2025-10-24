import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import type { Dashboard } from '../types/dashboard';
import DashboardCard from './DashboardCard';

// Mock data for initial dashboards
const mockDashboards: Dashboard[] = [
  {
    id: '1',
    name: 'Admissions Overview',
    description: 'Complete overview of admission funnel and key metrics',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80',
    lastUpdated: new Date('2024-03-15'),
    owner: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80'
    },
    isShared: true,
    isPrivate: false,
    isFavorite: true,
    permissions: [
      { userId: '1', permission: 'admin' },
      { userId: '2', permission: 'edit' }
    ]
  },
  {
    id: '2',
    name: 'Marketing Funnel',
    description: 'Marketing campaign performance and conversion metrics',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80',
    lastUpdated: new Date('2024-03-14'),
    owner: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&q=80'
    },
    isShared: true,
    isPrivate: false,
    isFavorite: false,
    permissions: [
      { userId: '2', permission: 'admin' }
    ]
  },
  {
    id: '3',
    name: 'Counsellor Performance',
    description: 'Individual and team performance metrics for counsellors',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
    lastUpdated: new Date('2024-03-13'),
    owner: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&q=80'
    },
    isShared: true,
    isPrivate: false,
    isFavorite: false,
    permissions: [
      { userId: '3', permission: 'admin' },
      { userId: '1', permission: 'view' }
    ]
  },
  {
    id: '4',
    name: 'Financials',
    description: 'Revenue, costs, and financial projections dashboard',
    thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&h=400&fit=crop&q=80',
    lastUpdated: new Date('2024-03-12'),
    owner: {
      id: '4',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80'
    },
    isShared: false,
    isPrivate: true,
    isFavorite: true,
    permissions: [
      { userId: '4', permission: 'admin' }
    ]
  }
];

interface SavedDashboardsProps {
  className?: string;
}

export default function SavedDashboards({ className = '' }: SavedDashboardsProps) {
  const [dashboards] = useState<Dashboard[]>(mockDashboards);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const updateArrowVisibility = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      };

      container.addEventListener('scroll', updateArrowVisibility);
      updateArrowVisibility();
      
      const images = container.getElementsByTagName('img');
      Array.from(images).forEach(img => {
        img.addEventListener('load', updateArrowVisibility);
      });

      return () => {
        container.removeEventListener('scroll', updateArrowVisibility);
        Array.from(images).forEach(img => {
          img.removeEventListener('load', updateArrowVisibility);
        });
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 288; // w-72 = 18rem = 288px
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? Math.max(0, currentScroll - cardWidth)
        : currentScroll + cardWidth;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenDashboard = (id: string) => {
    console.log('Opening dashboard:', id);
  };

  const handleShareDashboard = (id: string) => {
    console.log('Sharing dashboard:', id);
  };

  const handleToggleFavorite = (id: string) => {
    console.log('Toggling favorite:', id);
  };

  const handleScheduleDashboard = (id: string) => {
    console.log('Scheduling dashboard:', id);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Saved Dashboards
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="relative group">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {dashboards.map(dashboard => (
              <div key={dashboard.id} className="flex-none w-72">
                <DashboardCard
                  dashboard={dashboard}
                  onOpen={handleOpenDashboard}
                  onShare={handleShareDashboard}
                  onToggleFavorite={handleToggleFavorite}
                  onSchedule={handleScheduleDashboard}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}