import { Calendar, RefreshCw } from 'lucide-react';
import * as React from 'react';

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  lastUpdated?: string;
  onRefresh?: () => void;
  showDate?: boolean;
  date?: string;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
  lastUpdated = "2 minutes ago",
  onRefresh,
  showDate = true,
  date = "Sep 24, 2025",
  className = ""
}) => {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      // Default refresh behavior - you could add a loading state here
      console.log('Refreshing page...');
    }
  };

  return (
    <div className={`min-h-screen  ${className}`}>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-17 z-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-slate-600 text-sm">{description}</p>
                  {lastUpdated && (
                    <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500">
                      <Calendar className="h-4 w-4" />
                      <span>Last updated: {lastUpdated}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRefresh}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Refresh page"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              {showDate && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-slate-500 font-medium">Today</p>
                  <p className="text-lg font-bold text-slate-900">{date}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-8xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;