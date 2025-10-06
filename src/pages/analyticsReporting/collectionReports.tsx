import { useState, useMemo } from 'react';
import { DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import PageLayout from '../layout/pageLayout';
import { DataTable } from '../../components/tables/data-table';
import {
  overdueAccountsColumns,
  overdueData,
} from './columns/overdueAccountsColumns';
import {
  ReusablePieChart,
  usePieChartConfig,
} from '../../components/charts/pieCharts';

export interface CollectionData {
  type: string;
  amount: number;
  color: string;
  [key: string]: string | number; // Index signature for Recharts compatibility
}

const CollectionReports: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Your existing data
  // const collectionsData = [
  //   { type: 'Cash', amount: 45600, color: '#10b981' },
  //   { type: 'Cheque', amount: 32400, color: '#3b82f6' },
  //   { type: 'Bank Transfer', amount: 28900, color: '#8b5cf6' },
  //   { type: 'Credit Card', amount: 15800, color: '#f59e0b' },
  // ];
  // Mock data for Collections
  const collectionsData: CollectionData[] = [
    { type: 'Cash', amount: 45600, color: '#10b981' },
    { type: 'Cheque', amount: 32400, color: '#3b82f6' },
    { type: 'Bank Transfer', amount: 28900, color: '#8b5cf6' },
    { type: 'Credit Card', amount: 15800, color: '#f59e0b' },
  ];

  // Create chart config using the hook
  const chartConfig = usePieChartConfig(
    'Collections by Payment Type',
    collectionsData,
    'collections', // using preset
  );

  // Calculate pagination
  const totalPages = Math.ceil(overdueData.length / limit);
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return overdueData.slice(startIndex, startIndex + limit);
  }, [overdueData, page, limit]);

  const renderCollectionsReport = () => (
    <div className="space-y-6 mt-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Collections
              </p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                $122.7K
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Overdue Amount
              </p>
              <p className="text-2xl font-semibold text-red-600 mt-1">$29.8K</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Collection Rate
              </p>
              <p className="text-2xl font-semibold text-green-600 mt-1">
                80.4%
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Discrepancies</p>
              <p className="text-2xl font-semibold text-orange-600 mt-1">
                $2.1K
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        {/* Collections by Type */}
        <ReusablePieChart
          data={collectionsData}
          config={chartConfig}
          showBreakdown={true}
        />
      </div>

      {/* Overdue Accounts DataTable */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Overdue Accounts
            </h3>
          </div>
        </div>

        <DataTable
          columns={overdueAccountsColumns}
          data={currentPageData}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <PageLayout
          title="Collection Reports"
          description="Comprehensive insights into collections"
        >
          <div className="p-4">{renderCollectionsReport()}</div>
        </PageLayout>
      </div>
    </div>
  );
};

export default CollectionReports;
