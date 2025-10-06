import { useState, useMemo } from 'react';
import { TrendingUp, Package, CheckCircle, XCircle,  AlertTriangle, Info } from 'lucide-react';
import PageLayout from '../layout/pageLayout';
import { DataTable } from '../../components/tables/data-table';
import ReusableBarChart from '../../components/charts/ReusableBarChart';
import { useChartConfig } from '../../components/charts';
import { returnDetailColumns, returnsByItem } from './columns/returnDetailColumns';

const ReturnAdjustments: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);


  // Calculate totals
  const totalReturns = returnsByItem.reduce((sum, item) => sum + item.quantity, 0);
  const validReturns = returnsByItem.filter(item => item.isValid).reduce((sum, item) => sum + item.quantity, 0);
  const invalidReturns = returnsByItem.filter(item => !item.isValid).reduce((sum, item) => sum + item.quantity, 0);

  // Prepare data for Returns by Reason chart (aggregated)
  const returnsByReasonChartData = useMemo(() => {
    const reasonData = returnsByItem.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.reason);
      if (existing) {
        existing.quantity += curr.quantity;
      } else {
        acc.push({
          name: curr.reason,
          quantity: curr.quantity
        });
      }
      return acc;
    }, [] as Array<{ name: string; quantity: number }>);
    
    // Sort by quantity descending
    return reasonData.sort((a, b) => b.quantity - a.quantity);
  }, [returnsByItem]);

  // Prepare data for Returns by Sales Rep chart (valid vs invalid)
  const returnsBySalesRepChartData = useMemo(() => {
    const groupedData = returnsByItem.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.salesRep);
      if (existing) {
        existing.valid += curr.isValid ? curr.quantity : 0;
        existing.invalid += curr.isValid ? 0 : curr.quantity;
      } else {
        acc.push({
          name: curr.salesRep,
          valid: curr.isValid ? curr.quantity : 0,
          invalid: curr.isValid ? 0 : curr.quantity,
        });
      }
      return acc;
    }, [] as Array<{ name: string; valid: number; invalid: number }>);
    
    // Sort by total returns descending
    return groupedData.sort((a, b) => (b.valid + b.invalid) - (a.valid + a.invalid));
  }, [returnsByItem]);

  // USE THE HOOK PATTERN
  const returnsByReasonChartConfig = useChartConfig(
    'returns',
    'Returns by Reason',
    returnsByReasonChartData,
    {
      xAxisProps: { angle: -45, textAnchor: 'end', height: 100 }
    }
  );

  const returnsBySalesRepChartConfig = useChartConfig(
    'returnsStacked',
    'Returns by Sales Rep (Valid vs Invalid)',
    returnsBySalesRepChartData,
    {
      xAxisProps: { angle: -45, textAnchor: 'end', height: 100 }
    }
  );

  // Calculate pagination
  const totalPages = Math.ceil(returnsByItem.length / limit);
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return returnsByItem.slice(startIndex, startIndex + limit);
  }, [returnsByItem, page, limit]);

  const renderReturnsReport = () => (
    <div className="space-y-6 mt-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Returns</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{totalReturns} items</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <Package className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valid Returns</p>
              <p className="text-2xl font-semibold text-green-600 mt-1">{validReturns} items</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Invalid Returns</p>
              <p className="text-2xl font-semibold text-red-600 mt-1">{invalidReturns} items</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Return Rate</p>
              <p className="text-2xl font-semibold text-orange-600 mt-1">8.2%</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts using ReusableBarChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReusableBarChart {...returnsByReasonChartConfig} />
        <ReusableBarChart {...returnsBySalesRepChartConfig} />
      </div>

      {/* Returns Detail DataTable */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">Detailed Returns Report</h3>
          </div>
        </div>

        <DataTable
          columns={returnDetailColumns}
          data={currentPageData}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
        />
      </div>

      {/* Adjustment Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Adjustment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Sales Impact (Valid Returns)</p>
            <p className="text-xl font-semibold text-red-600 mt-1">-$32,750</p>
            <p className="text-xs text-gray-500 mt-1">Due to damaged/expired items</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Rejected Claims</p>
            <p className="text-xl font-semibold text-green-600 mt-1">$14,200</p>
            <p className="text-xs text-gray-500 mt-1">Invalid return claims rejected</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Net Adjustment</p>
            <p className="text-xl font-semibold text-orange-600 mt-1">-$18,550</p>
            <p className="text-xs text-gray-500 mt-1">Final impact on sales figures</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div >
      <div>
        <PageLayout title='Return Adjustments' description='Comprehensive insights into returns'>
          <div className='p-4'>{renderReturnsReport()}</div>
        </PageLayout>
      </div>
    </div>
  );
};

export default ReturnAdjustments;