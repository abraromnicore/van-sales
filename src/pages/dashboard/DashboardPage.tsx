import { Card } from '@components/card/Card';
import { CardBody } from '@components/card/CardBody';
import { CardHeader } from '@components/card/CardHeader';
import { ReusableBarChart, useChartConfig } from '@components/charts/barCharts';
import { ReusablePieChart, usePieChartConfig } from '@components/charts/pieCharts';
import { Clock, DollarSign, Eye, MapPin, Package, TrendingDown, TrendingUp } from 'lucide-react';
import { Can } from '@casl/react';
import { Action } from '@/casl/actions.ts';
import { Subject } from '@/casl/subjects.ts';
import { ability } from '@/casl/defineAbility.ts';

// Mock data for testing
const salesData = [
  {
    id: 1,
    name: 'Ahmed Khan',
    sales: 245000,
    target: 200000,
    region: 'North',
    team: 'Alpha',
    achievement: 122.5,
    rank: 1,
  },
  {
    id: 2,
    name: 'Sarah Ali',
    sales: 198000,
    target: 180000,
    region: 'South',
    team: 'Beta',
    achievement: 110.0,
    rank: 2,
  },
  {
    id: 3,
    name: 'Muhammad Asif',
    sales: 176000,
    target: 160000,
    region: 'East',
    team: 'Alpha',
    achievement: 110.0,
    rank: 3,
  },
  {
    id: 4,
    name: 'Fatima Sheikh',
    sales: 165000,
    target: 170000,
    region: 'West',
    team: 'Gamma',
    achievement: 97.1,
    rank: 4,
  },
  {
    id: 5,
    name: 'Hassan Malik',
    sales: 142000,
    target: 150000,
    region: 'Central',
    team: 'Beta',
    achievement: 94.7,
    rank: 5,
  },
  {
    id: 6,
    name: 'Zara Qureshi',
    sales: 138000,
    target: 140000,
    region: 'North',
    team: 'Gamma',
    achievement: 98.6,
    rank: 6,
  },
  {
    id: 7,
    name: 'Omar Farooq',
    sales: 125000,
    target: 130000,
    region: 'South',
    team: 'Alpha',
    achievement: 96.2,
    rank: 7,
  },
  {
    id: 8,
    name: 'Aisha Malik',
    sales: 118000,
    target: 125000,
    region: 'East',
    team: 'Beta',
    achievement: 94.4,
    rank: 8,
  },
  {
    id: 9,
    name: 'Bilal Ahmed',
    sales: 102000,
    target: 120000,
    region: 'West',
    team: 'Gamma',
    achievement: 85.0,
    rank: 9,
  },
  {
    id: 10,
    name: 'Nadia Khan',
    sales: 95000,
    target: 110000,
    region: 'Central',
    team: 'Alpha',
    achievement: 86.4,
    rank: 10,
  },
];

export const notifications = [
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
  {
    id: 6,
    type: 'warning',
    message: 'Route deviation detected - Ahmad Hassan',
    time: '2m ago',
    priority: 'high',
  },
  {
    id: 7,
    type: 'error',
    message: 'Pending settlement: Rs. 8,500',
    time: '15m ago',
    priority: 'high',
  },
  {
    id: 8,
    type: 'success',
    message: 'Daily collection target achieved',
    time: '1h ago',
    priority: 'medium',
  },
  {
    id: 9,
    type: 'warning',
    message: 'Customer complaint - Route 3',
    time: '2h ago',
    priority: 'medium',
  },
  {
    id: 10,
    type: 'info',
    message: 'New order received - Route 5',
    time: '3h ago',
    priority: 'low',
  },
];

const collectionsData = [
  { type: 'Cash', amount: 45600, color: '#10b981' },
  { type: 'Cheque', amount: 32400, color: '#3b82f6' },
  { type: 'Bank Transfer', amount: 28900, color: '#8b5cf6' },
  { type: 'Credit Card', amount: 15800, color: '#f59e0b' },
];

type KPICardProps = {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
};
// KPI Card Component
const KPICard: React.FC<KPICardProps> = ({
                                           title,
                                           value,
                                           icon: Icon,
                                           trend,
                                           trendValue,
                                           color = 'blue',
                                         }) => {

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <>
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
              <Icon className="w-6 h-6" />
            </div>
            {trend && (
              <div
                className={`flex items-center text-sm ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {trendValue}
              </div>
            )}
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </CardBody>
      </Card>
    </>
  );
};

// Main Dashboard Component
export const DashboardPage: React.FC = () => {
  // Chart configuration using the hook
  const salesChartConfig = useChartConfig(
    'sales',
    'Sales vs Target of Van Rep',
    salesData,
    {
      height: 320,
      // You can add any custom overrides here
    },
  );

  // Create chart config using the hook
  const chartConfig = usePieChartConfig(
    'Collections by Payment Type',
    collectionsData,
    'collections', // using preset
  );

  const dashboardData = {
    liveTracking: {
      totalVans: 15,
      onRoute: 12,
      atWarehouse: 2,
      idle: 1,
    },
    pendingApprovals: {
      vanLoadRequests: 3,
      emergencyLoadRequests: 1,
      creditApprovals: 2,
      returnApprovals: 1,
      discountRequests: 2,
    },
    alerts: [
      {
        id: 'ALT-001',
        type: 'route_deviation',
        severity: 'high' as const,
        vanId: 'VAN-LHR-03',
        repName: 'Imran Ahmed',
        message: 'Van deviated 5km from planned route',
        timestamp: '2025-10-09T14:15:00Z',
      },
      {
        id: 'ALT-002',
        type: 'stock_variance',
        severity: 'medium' as const,
        vanId: 'VAN-LHR-07',
        repName: 'Sara Malik',
        message: 'Stock variance detected: PKR 15,000',
        timestamp: '2025-10-09T13:50:00Z',
      },
    ],
    salesAnalytics: {
      today: {
        totalSales: 2450000,
        cashSales: 1200000,
        creditSales: 1250000,
        target: 3000000,
        achievement: 81.67,
        ordersCount: 245,
        avgOrderValue: 10000,
      },
      weekly: {
        dailyBreakdown: [
          { day: 'Mon', sales: 2800000, target: 3000000 },
          { day: 'Tue', sales: 2950000, target: 3000000 },
          { day: 'Wed', sales: 2850000, target: 3000000 },
          { day: 'Thu', sales: 3000000, target: 3000000 },
          { day: 'Fri', sales: 2900000, target: 3000000 },
        ],
      },
      topProducts: [
        {
          sku: 'SKU-001',
          name: 'Premium Tea 500g',
          unitsSold: 450,
          revenue: 450000,
        },
        {
          sku: 'SKU-012',
          name: 'Cooking Oil 5L',
          unitsSold: 320,
          revenue: 640000,
        },
        {
          sku: 'SKU-007',
          name: 'Basmati Rice 10kg',
          unitsSold: 150,
          revenue: 300000,
        },
      ],
    },
    inventory: {
      vanStock: {
        totalLoaded: 3500000,
        totalRemaining: 1450000,
        utilizationRate: 58.57,
      },
    },
    routePerformance: {
      totalRoutes: 15,
      completed: 0,
      inProgress: 12,
      notStarted: 3,
      onTimePerformance: 86.7,
    },
    collectionMetrics: {
      cashCollection: 1200000,
      chequeCollection: 450000,
      bankTransfer: 440000,
      outstandingReceivables: 8500000,
      overdueAccounts: 23,
    },
    promotionTracking: {
      topPromotions: [
        {
          id: 'PROMO-001',
          name: 'Buy 10 Get 1 Free',
          applied: 18,
          incrementalSales: 180000,
        },
        {
          id: 'PROMO-002',
          name: '5% Off Invoice > 5000',
          applied: 12,
          incrementalSales: 120000,
        },
      ],
    },
  };

  const totalApprovals = Object.values(dashboardData.pendingApprovals).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Today's Sales"
          value={`PKR ${(
            dashboardData.salesAnalytics.today.totalSales / 1000000
          ).toFixed(2)}M`}
          icon={DollarSign}
          trend="up"
          trendValue="+12%"
          color="green"
        />
        <KPICard
          title="Orders Today"
          value={dashboardData.salesAnalytics.today.ordersCount}
          icon={Package}
          color="blue"
        />
        <KPICard
          title="Active Vans"
          value={`${dashboardData.liveTracking.onRoute}/${dashboardData.liveTracking.totalVans}`}
          icon={MapPin}
          color="purple"
        />
        <KPICard
          title="Pending Approvals"
          value={totalApprovals}
          icon={Clock}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
        <div className="md:col-span-2 ">
          <Card>
            <CardHeader title="Vans Tracking" />
            <CardBody>
              {/* <MapView /> */}
              Google Maps Show Here
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader title="Alerts" />
            <CardBody>
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {notifications.slice(0, 6).map((notification) => (
                    <div key={notification.id}>
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
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        {/* Collections by Type */}
        <ReusablePieChart
          data={collectionsData}
          config={chartConfig}
          showBreakdown={true}
        />
      </div>

      <div className="mt-6">
        <ReusableBarChart {...salesChartConfig} />
      </div>
    </div>
  );
};