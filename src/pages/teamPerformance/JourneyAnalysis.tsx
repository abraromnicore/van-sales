import { useState, useMemo } from 'react';
import { Target, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import PageLayout from '../layout/pageLayout';
import { DataTable } from '../../components/tables/data-table';
import {
  journeyLeaderboardColumns,
  mockJourneyData,
} from './columns/journeyLeaderboardColumns';
import { ReusableBarChart, useChartConfig } from '../../components/charts';

const PlannedVsActualJourney: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Your actual journey data would come from an API call or props
  const journeyData = mockJourneyData; // Replace with your actual data

  // Calculate pagination
  const totalPages = Math.ceil(journeyData.length / limit);
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return journeyData.slice(startIndex, startIndex + limit);
  }, [journeyData, page, limit]);

  // Chart configuration for journey completion using custom configuration
  const journeyChartConfig = useChartConfig(
    'sales', // Use sales as base type but customize it
    'Journey Completion Rate',
    journeyData,
    {
      height: 320, // h-80 equivalent
      bars: [
        { dataKey: 'planned', color: '#e5e7eb', name: 'Planned' },
        {
          dataKey: 'visited',
          color: '#10b981',
          name: 'Visited',
          radius: [4, 4, 0, 0],
        },
      ],
      formatValue: (value: number) => value.toString(), // Simple number formatting
      xAxisProps: { dataKey: 'rep' }, // Use 'rep' instead of 'name' for x-axis
    },
  );

  return (
    <PageLayout
      title="Journey Analysis"
      description="Track Planned vs Actual Journey Analysis across your team"
    >
      <div className="space-y-6 p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Planned</p>
                <p className="text-2xl font-bold">60</p>
              </div>
              <Target className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Visited</p>
                <p className="text-2xl font-bold">50</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Missed Visits</p>
                <p className="text-2xl font-bold">10</p>
              </div>
              <XCircle className="w-8 h-8 text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Completion</p>
                <p className="text-2xl font-bold">83.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Completion Chart - Using ReusableBarChart */}
        <ReusableBarChart {...journeyChartConfig} />

        {/* Journey Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Planned vs Actual Journey
              </h3>
            </div>
          </div>

          <DataTable
            columns={journeyLeaderboardColumns}
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

export default PlannedVsActualJourney;
