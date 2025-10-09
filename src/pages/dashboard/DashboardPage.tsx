import { Card } from '@components/card/Card';
import { CardBody } from '@components/card/CardBody';
import { CardHeader } from '@components/card/CardHeader';
import { ReusableBarChart } from '@components/charts/barCharts';
import { useChartConfig } from '@components/charts/hooks/useChartConfig';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Package,
  MapPin,
  DollarSign,
} from 'lucide-react';

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
      <ReusableBarChart {...salesChartConfig} />
    </div>
  );
};
