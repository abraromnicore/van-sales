import { useState, useMemo } from 'react';
import { Clock, DollarSign, PhoneCall } from 'lucide-react';
import PageLayout from '../layout/pageLayout';
import { DataTable } from '../../components/tables/data-table';
import {
  collectionsLeaderboardColumns,
  mockCollectionsData,
} from './columns/collectionsLeaderboardColumns';
import { ReusableBarChart, useChartConfig } from '../../components/charts';
import {
  ReusablePieChart,
  usePieChartConfig,
} from '../../components/charts/pieCharts';
import type { CollectionData } from '../analyticsReporting/collectionReports';

const CollectionsLeaderboard: React.FC = () => {
  const pieData: CollectionData[] = [
    { type: 'Cash', amount: 45600, color: '#10b981' },
    { type: 'Cheque', amount: 32400, color: '#3b82f6' },
    { type: 'Pending', amount: 28900, color: '#8b5cf6' },
  ];

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Your actual collections data would come from an API call or props
  const collectionsData = mockCollectionsData; // Replace with your actual data

  // Calculate pagination
  const totalPages = Math.ceil(collectionsData.length / limit);
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return collectionsData.slice(startIndex, startIndex + limit);
  }, [collectionsData, page, limit]);

  // Chart configuration using the reusable chart hook
  const collectionsChartConfig = useChartConfig(
    'collections',
    'Collections vs Target',
    collectionsData,
    {
      height: 256, // h-64 equivalent
      // You can add any custom overrides here if needed
    },
  );

  // Create chart config using the hook
  const chartConfig = usePieChartConfig(
    'Collections by Payment Type',
    pieData,
    'collections', // using preset
  );

  return (
    <PageLayout
      title="Collection Leaderboard"
      description="Track collections across your team"
    >
      <div className="space-y-6 p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Collections</p>
                <p className="text-2xl font-bold">₹6.40L</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Cash Collections</p>
                <p className="text-2xl font-bold">₹3.32L</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Cheque Collections</p>
                <p className="text-2xl font-bold">₹1.91L</p>
              </div>
              <PhoneCall className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">₹1.17L</p>
              </div>
              <Clock className="w-8 h-8 text-amber-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReusablePieChart
            data={pieData}
            config={chartConfig}
            showBreakdown={false}
          />

          {/* Collections Chart - Using ReusableBarChart */}
          <ReusableBarChart {...collectionsChartConfig} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Collections Leaderboard
              </h3>
            </div>
          </div>

          <DataTable
            columns={collectionsLeaderboardColumns}
            data={currentPageData}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default CollectionsLeaderboard;
