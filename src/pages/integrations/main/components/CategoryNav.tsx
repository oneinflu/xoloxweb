import React from 'react';
import { 
  CreditCard, 
  MessageCircle, 
  Mail, 
  Truck, 
  Phone, 
  DollarSign, 
  BarChart3, 
  Code, 
  Webhook,
  Search,
  Plus,
  Upload
} from 'lucide-react';
import { IntegrationCategory, CategoryInfo } from '../types/integration';

interface CategoryNavProps {
  categories: CategoryInfo[];
  activeCategory: IntegrationCategory | 'all';
  onCategoryChange: (category: IntegrationCategory | 'all') => void;
  catalogSearchQuery: string;
  onCatalogSearchChange: (query: string) => void;
  onRequestConnector: () => void;
  onUploadConnector: () => void;
  userPermission: { role: string };
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  catalogSearchQuery,
  onCatalogSearchChange,
  onRequestConnector,
  onUploadConnector,
  userPermission
}) => {
  const getCategoryIcon = (category: IntegrationCategory) => {
    const iconMap = {
      payments: CreditCard,
      whatsapp: MessageCircle,
      email: Mail,
      logistics: Truck,
      telecalling: Phone,
      loan: DollarSign,
      analytics: BarChart3,
      'custom-api': Code,
      webhooks: Webhook,
    };
    return iconMap[category] || Code;
  };

  const allCategoriesCount = categories.reduce((acc, cat) => ({
    installed: acc.installed + cat.installedCount,
    available: acc.available + cat.availableCount
  }), { installed: 0, available: 0 });

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          
          {/* Catalog Search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={catalogSearchQuery}
                onChange={(e) => onCatalogSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-auto"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onRequestConnector}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Request Connector</span>
                <span className="sm:hidden">Request</span>
              </button>
              
              {userPermission.role === 'super-admin' && (
                <button
                  onClick={onUploadConnector}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload Connector</span>
                  <span className="sm:hidden">Upload</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2">
          {/* All Category */}
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeCategory === 'all'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-100 border border-transparent'
            }`}
          >
            <span>All</span>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
              {allCategoriesCount.installed}/{allCategoriesCount.available}
            </span>
          </button>

          {/* Individual Categories */}
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.id);
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  {category.installedCount}/{category.availableCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;