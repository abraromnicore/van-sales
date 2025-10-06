import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Package, Users, Filter, Download } from 'lucide-react';
import PageLayout from '../layout/pageLayout';
import { DataTable } from '../../components/tables/data-table';
import ReusableBarChart from '../../components/charts/ReusableBarChart';
import { useChartConfig } from '../../components/charts';
import { topCustomers, topCustomersColumns } from './columns/topCustomersColumns';

interface SalesData {
    date: string;
    sales: number;
    orders: number;
}

interface SKUData {
    name: string;
    sales: number;
    quantity: number;
}

const SalesAnalytics: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    // Mock data for Sales Analytics
    const salesTrendData: SalesData[] = [
        { date: 'Jan', sales: 45000, orders: 120 },
        { date: 'Feb', sales: 52000, orders: 135 },
        { date: 'Mar', sales: 48000, orders: 128 },
        { date: 'Apr', sales: 61000, orders: 156 },
        { date: 'May', sales: 58000, orders: 142 },
        { date: 'Jun', sales: 67000, orders: 178 },
    ];

    const topSKUs: SKUData[] = [
        { name: 'Premium Widget A', sales: 28500, quantity: 95 },
        { name: 'Standard Kit B', sales: 22300, quantity: 186 },
        { name: 'Deluxe Package C', sales: 19800, quantity: 66 },
        { name: 'Basic Unit D', sales: 15600, quantity: 312 },
        { name: 'Pro Series E', sales: 12400, quantity: 41 },
    ];

    // USE THE HOOK PATTERN for Top SKUs Chart
    const topSKUsChartConfig = useChartConfig(
        'skus',
        'Top Performing SKUs',
        topSKUs,
        {
            xAxisProps: { angle: -45, textAnchor: 'end', height: 100 }
        }
    );

    // Calculate pagination
    const totalPages = Math.ceil(topCustomers.length / limit);
    const currentPageData = useMemo(() => {
        const startIndex = (page - 1) * limit;
        return topCustomers.slice(startIndex, startIndex + limit);
    }, [topCustomers, page, limit]);

    const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode; trend: 'up' | 'down' }> =
        ({ title, value, change, icon, trend }) => (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
                        <p className={`text-sm mt-2 flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp className={`h-4 w-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
                            {change}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        {icon}
                    </div>
                </div>
            </div>
        );

    const renderSalesAnalytics = () => (
        <div className="space-y-6 mt-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Sales"
                    value="$351.4K"
                    change="+12.5% vs last month"
                    icon={<DollarSign className="h-6 w-6 text-blue-600" />}
                    trend="up"
                />
                <StatCard
                    title="Total Orders"
                    value="759"
                    change="+8.2% vs last month"
                    icon={<Package className="h-6 w-6 text-green-600" />}
                    trend="up"
                />
                <StatCard
                    title="Active Customers"
                    value="124"
                    change="+15.3% vs last month"
                    icon={<Users className="h-6 w-6 text-purple-600" />}
                    trend="up"
                />
                <StatCard
                    title="Avg Order Value"
                    value="$463"
                    change="-2.1% vs last month"
                    icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
                    trend="down"
                />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-4">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value as 'daily' | 'weekly' | 'monthly')}
                        className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                </button>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Trend Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value, name) => [name === 'sales' ? `$${value}` : value, name === 'sales' ? 'Sales' : 'Orders']} />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
                            <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Top SKUs Chart - Now using ReusableBarChart */}
                <ReusableBarChart {...topSKUsChartConfig} />
            </div>

            {/* Top Customers DataTable */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
                    </div>
                </div>

                <DataTable
                    columns={topCustomersColumns}
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
        <div >
            <div className="mx-auto">
                <PageLayout title='Sales Analytics' description='Comprehensive insights into sales performance'>
                    <div className='p-4'>{renderSalesAnalytics()}</div>
                </PageLayout>
            </div>
        </div>
    );
};

export default SalesAnalytics;