import {
  AlertCircle,
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  MapPin,
  MoreVertical,
  Package,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import * as React from 'react';

interface TeamMember {
  id: number;
  name: string;
  visits: number;
  totalVisits: number;
  productivity: number;
  revenue: number;
  rank: number;
  status: 'active' | 'break' | 'offline';
}

interface Notification {
  id: number;
  type: 'warning' | 'info' | 'error' | 'success';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

export const DashboardPage: React.FC = () => {
  const teamData: TeamMember[] = [
    {
      id: 1,
      name: 'Ahmad Hassan',
      visits: 28,
      totalVisits: 30,
      productivity: 93.3,
      revenue: 15420,
      rank: 1,
      status: 'active',
    },
    {
      id: 2,
      name: 'Sarah Ali',
      visits: 25,
      totalVisits: 28,
      productivity: 89.3,
      revenue: 13850,
      rank: 2,
      status: 'active',
    },
    {
      id: 3,
      name: 'Omar Khan',
      visits: 22,
      totalVisits: 26,
      productivity: 84.6,
      revenue: 12100,
      rank: 3,
      status: 'break',
    },
    {
      id: 4,
      name: 'Fatima Sheikh',
      visits: 20,
      totalVisits: 25,
      productivity: 80.0,
      revenue: 11200,
      rank: 4,
      status: 'active',
    },
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'warning',
      message: 'Route deviation detected - Ahmad Hassan',
      time: '2m ago',
      priority: 'high',
    },
    {
      id: 2,
      type: 'error',
      message: 'Pending settlement: Rs. 8,500',
      time: '15m ago',
      priority: 'high',
    },
    {
      id: 3,
      type: 'success',
      message: 'Daily collection target achieved',
      time: '1h ago',
      priority: 'medium',
    },
    {
      id: 4,
      type: 'warning',
      message: 'Customer complaint - Route 3',
      time: '2h ago',
      priority: 'medium',
    },
    {
      id: 5,
      type: 'info',
      message: 'New order received - Route 5',
      time: '3h ago',
      priority: 'low',
    },
  ];

  const CircularProgress: React.FC<{
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }> = ({
          percentage = 10,
          size = 140,
          strokeWidth = 12,
          color = '#4f46e5',
        }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">
              {percentage}%
            </div>
            <div className="text-sm text-slate-500 font-medium">Complete</div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'break':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'offline':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getNotificationStyles = (type: string, priority: string) => {
    const baseStyles =
      'flex items-start space-x-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm cursor-pointer';

    const typeStyles = {
      warning: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
      error: 'bg-red-50 border-red-200 hover:bg-red-100',
      success: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
      info: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    };

    const priorityBorder = priority === 'high' ? 'border-l-4' : '';

    return `${baseStyles} ${
      typeStyles[type as keyof typeof typeStyles]
    } ${priorityBorder}`;
  };

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      warning: <AlertCircle className="h-5 w-5 text-amber-600" />,
      error: <AlertCircle className="h-5 w-5 text-red-600" />,
      success: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      info: <Bell className="h-5 w-5 text-blue-600" />,
    };
    return (
      iconMap[type as keyof typeof iconMap] || (
        <Bell className="h-5 w-5 text-slate-500" />
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                +2
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-600 mb-1">
                Active Reps
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                12
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                +15
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-600 mb-1">
                Total Orders
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                87
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-50 rounded-xl">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-700 rounded-full">
                8/10
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-600 mb-1">
                Routes Active
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">8</p>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                +8.5%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-600 mb-1">Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">
                Rs. 19.5K
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Sales Progress - Takes up 8 columns on xl screens */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Target className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Today's Sales Performance
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Target progress and revenue breakdown
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8.5% vs yesterday
                    </div>
                    <button
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex justify-center items-center">
                    <CircularProgress
                      percentage={78}
                      size={180}
                      strokeWidth={16}
                      color="#4f46e5"
                    />
                  </div>

                  <div className="space-y-4">
                    <div
                      className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                        <span className="text-sm font-semibold text-slate-700">
                          Monthly Target
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-slate-900">
                          Rs. 25,000
                        </span>
                        <div className="flex items-center text-xs text-red-600">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          -2%
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-blue-700">
                          Total Revenue
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-blue-900">
                          Rs. 19,500
                        </span>
                        <div className="flex items-center text-xs text-emerald-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12%
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex justify-between items-center p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-indigo-700">
                          Today's Sales
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-indigo-900">
                          Rs. 5,200
                        </span>
                        <div className="flex items-center text-xs text-emerald-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +8.5%
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          Remaining to target
                        </span>
                        <span className="font-semibold text-slate-900">
                          Rs. 5,500 (22%)
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                          style={{ width: '78%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications - Takes up 4 columns on xl screens */}
          <div className="xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-fit">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Bell className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Alerts & Notifications
                      </h3>
                      <p className="text-sm text-slate-600">
                        Recent system alerts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {
                        notifications.filter((n) => n.priority === 'high')
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {notifications.slice(0, 6).map((notification) => (
                    <div
                      key={notification.id}
                      className={getNotificationStyles(
                        notification.type,
                        notification.priority,
                      )}
                    >
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-slate-500 font-medium">
                            {notification.time}
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              notification.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : notification.priority === 'medium'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <button
                    className="w-full flex items-center justify-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>View All Notifications</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collections and Returns Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Collections Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Collections Summary
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Today's collection breakdown
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.3%
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div
                className="flex items-center justify-between p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <CheckCircle className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 mb-1">
                      Cash Collections
                    </p>
                    <p className="text-2xl font-bold text-emerald-900">
                      Rs. 15,240
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-emerald-700 mb-1">
                    62% of total
                  </div>
                  <div className="w-12 h-2 bg-emerald-200 rounded-full">
                    <div className="w-8 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-5 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Clock className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-700 mb-1">
                      Cheque Collections
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      Rs. 8,950
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-blue-700 mb-1">
                    36% of total
                  </div>
                  <div className="w-12 h-2 bg-blue-200 rounded-full">
                    <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-5 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <AlertCircle className="h-7 w-7 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-700 mb-1">
                      Pending Collections
                    </p>
                    <p className="text-2xl font-bold text-amber-900">
                      Rs. 3,120
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-amber-700 mb-1">
                    2% of total
                  </div>
                  <div className="w-12 h-2 bg-amber-200 rounded-full">
                    <div className="w-1 h-2 bg-amber-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">
                    Total Collections
                  </span>
                  <span className="text-2xl font-bold text-slate-900">
                    Rs. 27,310
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Returns Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <Package className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Returns Overview
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Product returns and damages
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -2.1%
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-4xl font-bold text-slate-900 mb-2">24</p>
                <p className="text-sm font-semibold text-slate-600">
                  Total Returns Today
                </p>
                <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-slate-500">
                  <span>↑ 3 from yesterday</span>
                  <span>•</span>
                  <span>Avg: 21/day</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-xl font-bold text-red-900 mb-1">
                    Rs. 2,840
                  </p>
                  <p className="text-xs font-semibold text-red-700">
                    Return Value
                  </p>
                  <p className="text-xs text-red-600 mt-1">1.2% of sales</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-xl font-bold text-orange-900 mb-1">8</p>
                  <p className="text-xs font-semibold text-orange-700">
                    Damaged Items
                  </p>
                  <p className="text-xs text-orange-600 mt-1">33% of returns</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">
                    Most Returned Categories
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-slate-700 font-medium">
                        Soft Drinks
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">
                        8 units
                      </span>
                      <div className="w-8 h-2 bg-slate-200 rounded-full">
                        <div className="w-6 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-slate-700 font-medium">
                        Snacks
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">
                        5 units
                      </span>
                      <div className="w-8 h-2 bg-slate-200 rounded-full">
                        <div className="w-4 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-slate-700 font-medium">
                        Dairy Products
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">
                        3 units
                      </span>
                      <div className="w-8 h-2 bg-slate-200 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance Section */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Team Performance Snapshot
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Real-time sales representative performance
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-800 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {teamData.map((member, index) => (
                  <div
                    key={member.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                      index === 0
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm ${
                          index === 0
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900 shadow-amber-200'
                            : index === 1
                              ? 'bg-slate-300 text-slate-700 shadow-slate-200'
                              : index === 2
                                ? 'bg-orange-300 text-orange-800 shadow-orange-200'
                                : 'bg-slate-200 text-slate-600 shadow-slate-100'
                        }`}
                      >
                        #{member.rank}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <p className="font-bold text-slate-900 text-lg">
                            {member.name}
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(
                              member.status,
                            )}`}
                          >
                            {member.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 font-medium">
                          {member.visits}/{member.totalVisits} visits completed
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
                      <div className="grid grid-cols-2 gap-6 sm:flex sm:space-x-8">
                        <div className="text-center sm:text-right">
                          <p className="text-sm font-semibold text-slate-900 mb-1">
                            {member.productivity}%
                          </p>
                          <p className="text-xs text-slate-500 font-medium">
                            Productivity
                          </p>
                        </div>
                        <div className="text-center sm:text-right">
                          <p className="text-sm font-bold text-slate-900 mb-1">
                            Rs. {member.revenue.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500 font-medium">
                            Revenue
                          </p>
                        </div>
                      </div>

                      <div className="w-full sm:w-20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-500 font-medium">
                            Progress
                          </span>
                          <span className="text-xs text-slate-600 font-bold">
                            {member.productivity}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                          <div
                            className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                              member.productivity >= 90
                                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                : member.productivity >= 80
                                  ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                                  : member.productivity >= 70
                                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                                    : 'bg-gradient-to-r from-red-400 to-red-500'
                            }`}
                            style={{ width: `${member.productivity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-2xl font-bold text-emerald-900 mb-1">
                      87.8%
                    </p>
                    <p className="text-sm font-semibold text-emerald-700">
                      Avg Productivity
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-2xl font-bold text-blue-900 mb-1">95</p>
                    <p className="text-sm font-semibold text-blue-700">
                      Total Visits
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-2xl font-bold text-purple-900 mb-1">
                      Rs. 52.5K
                    </p>
                    <p className="text-sm font-semibold text-purple-700">
                      Team Revenue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-slate-900">94.5%</p>
            <p className="text-sm text-slate-600 font-medium">
              Route Completion
            </p>
            <div className="mt-2 text-xs text-emerald-600">
              +2.1% vs yesterday
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-slate-900">2.1%</p>
            <p className="text-sm text-slate-600 font-medium">Return Rate</p>
            <div className="mt-2 text-xs text-red-600">+0.3% vs yesterday</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-slate-900">Rs. 312</p>
            <p className="text-sm text-slate-600 font-medium">
              Avg Order Value
            </p>
            <div className="mt-2 text-xs text-emerald-600">
              +Rs. 18 vs yesterday
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-slate-900">156</p>
            <p className="text-sm text-slate-600 font-medium">New Customers</p>
            <div className="mt-2 text-xs text-blue-600">+12 vs yesterday</div>
          </div>
        </div>
      </div>
    </div>
  );
};