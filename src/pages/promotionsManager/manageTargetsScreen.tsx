import { useState } from 'react';
import { Calendar, Filter, Plus, Download, Upload, TrendingUp, TrendingDown, Target, BarChart3, ChevronRight, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as React from 'react';
import { performanceColumns, samplePerformanceData } from './columns/performanceColumns';
import { DataTable } from '../../components/tables/data-table';
import { ReusableBarChart, useChartConfig } from '../../components/charts';
import PageLayout from '../layout/pageLayout';

interface TargetData {
  id: string;
  name: string;
  type: 'Region' | 'Territory' | 'Supervisor' | 'Salesman' | 'Outlet';
  target: number;
  achieved: number;
  unit: string;
  locked: boolean;
  children?: TargetData[];
}

interface HistoricalData {
  period: string;
  target: number;
  achieved: number;
}

const ManageTargetsScreen: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('Month');
  const [targetType, setTargetType] = useState('Value');
  const [breadcrumb, setBreadcrumb] = useState<TargetData[]>([]);
  const [showAssignmentPanel, setShowAssignmentPanel] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const historicalData: HistoricalData[] = [
    { period: 'Jan', target: 1000000, achieved: 850000 },
    { period: 'Feb', target: 1000000, achieved: 920000 },
    { period: 'Mar', target: 1000000, achieved: 1050000 },
    { period: 'Apr', target: 1100000, achieved: 980000 },
    { period: 'May', target: 1100000, achieved: 1080000 },
    { period: 'Jun', target: 1200000, achieved: 1150000 }
  ];

  const [currentData, setCurrentData] = useState<TargetData[]>(samplePerformanceData);
  // In your component, add this configuration
  const achievementChartConfig = useChartConfig(
    'achievement', // or appropriate type from your ChartType
    'Achievement Distribution',
    currentData.slice(0, 5),
    {
      height: 300,
      formatValue: (value: number) => formatCurrency(value),
      xAxisProps: {
        style: { fontSize: '12px' }
      },
      yAxisProps: {
        style: { fontSize: '12px' }
      }
    }
  );

  const calculateAchievement = (target: number, achieved: number): number => {
    return target > 0 ? Math.round((achieved / target) * 100) : 0;
  };

  const getProgressBarColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleDrillDown = (item: TargetData) => {
    if (item.children && item.children.length > 0) {
      setBreadcrumb([...breadcrumb, item]);
      setCurrentData(item.children);
      setPage(1); // Reset to first page on drill down
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setBreadcrumb([]);
      setCurrentData(samplePerformanceData);
    } else {
      const newBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(newBreadcrumb);
      setCurrentData(breadcrumb[index].children || []);
    }
    setPage(1); // Reset to first page
  };

  const totalTarget = currentData.reduce((sum, item) => sum + item.target, 0);
  const totalAchieved = currentData.reduce((sum, item) => sum + item.achieved, 0);
  const overallAchievement = calculateAchievement(totalTarget, totalAchieved);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Calculate pagination
  const totalPages = Math.ceil(currentData.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentPageData = currentData.slice(startIndex, endIndex);

  return (
    <div >
        <PageLayout title='Manage Targets & Performance' description='Define targets and track performance across your sales organization'>
          <div className='p-4'>
            {/* Control Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="border-none outline-none bg-transparent text-sm font-medium"
                  >
                    <option>Month</option>
                    <option>Quarter</option>
                    <option>Year</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  <Target className="w-4 h-4 text-gray-500" />
                  <select
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                    className="border-none outline-none bg-transparent text-sm font-medium"
                  >
                    <option>Value</option>
                    <option>Volume</option>
                    <option>Outlet Coverage</option>
                  </select>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowAssignmentPanel(!showAssignmentPanel)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Assign Target
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4" />
                  Bulk Upload
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Total Target</h3>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalTarget)}</p>
              <p className="text-xs text-gray-500 mt-1">{timePeriod} Target</p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Achieved</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAchieved)}</p>
              <p className="text-xs text-gray-500 mt-1">Current Achievement</p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Achievement %</h3>
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <p className={`text-2xl font-bold ${overallAchievement >= 90 ? 'text-green-600' : overallAchievement >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                {overallAchievement}%
              </p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${getProgressBarColor(overallAchievement)}`} style={{ width: `${Math.min(overallAchievement, 100)}%` }} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Variance</h3>
                {totalAchieved >= totalTarget ? <TrendingUp className="w-5 h-5 text-green-600" /> : <TrendingDown className="w-5 h-5 text-red-600" />}
              </div>
              <p className={`text-2xl font-bold ${totalAchieved >= totalTarget ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalAchieved - totalTarget)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Target vs Actual</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Historical Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="period" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} name="Target" />
                  <Line type="monotone" dataKey="achieved" stroke="#10b981" strokeWidth={2} name="Achieved" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <ReusableBarChart {...achievementChartConfig} />
          </div>

          {/* Breadcrumb Navigation */}
          {breadcrumb.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => handleBreadcrumbClick(-1)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  All Regions
                </button>
                {breadcrumb.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <button
                      onClick={() => handleBreadcrumbClick(index)}
                      className={`${index === breadcrumb.length - 1 ? 'text-gray-900 font-semibold' : 'text-blue-600 hover:text-blue-800'}`}
                    >
                      {item.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Performance DataTable */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {breadcrumb.length > 0
                      ? `${breadcrumb[breadcrumb.length - 1].name} - Performance Details`
                      : 'Overall Performance'}
                  </h3>
                </div>
                {currentData.some(item => item.children && item.children.length > 0) && (
                  <div className="text-sm text-gray-500">
                    Click on items with children to drill down
                  </div>
                )}
              </div>
            </div>

            {/* Render items that have children as clickable cards above the table */}
            {currentData.some(item => item.children && item.children.length > 0) && (
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Drill Down Options</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentData.filter(item => item.children && item.children.length > 0).map((item) => {
                    const achievement = calculateAchievement(item.target, item.achieved);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleDrillDown(item)}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <ChevronRight className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${achievement >= 90 ? 'text-green-600' : achievement >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {achievement}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.children?.length} items
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Replace with your actual DataTable component */}
            <DataTable
              columns={performanceColumns} // Use performanceColumns here
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
    </div>
  );
};

export default ManageTargetsScreen;