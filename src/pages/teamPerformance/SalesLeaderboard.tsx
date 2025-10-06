import { useState, useMemo } from 'react';
import {
    Users, Target, Trophy, DollarSign
} from 'lucide-react';
import PageLayout from '../layout/pageLayout';
import { DataTable } from '../../components/tables/data-table';
import { mockSalesData, salesLeaderboardColumns } from './columns/salesLeaderboardColumns';
import { ReusableBarChart, useChartConfig } from '../../components/charts';

const SalesLeaderboard: React.FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    // Your actual sales data would come from an API call or props
    const salesData = mockSalesData; // Replace with your actual data

    // Calculate pagination
    const totalPages = Math.ceil(salesData.length / limit);
    const currentPageData = useMemo(() => {
        const startIndex = (page - 1) * limit;
        return salesData.slice(startIndex, startIndex + limit);
    }, [salesData, page, limit]);

    // Chart configuration using the hook
    const salesChartConfig = useChartConfig(
        'sales',
        'Sales vs Target Comparison',
        salesData,
        {
            height: 320,
            // You can add any custom overrides here
        }
    );

    return (
        <PageLayout title='Sales Leaderboard' description='Track sales performance across your team'>
            <div className="space-y-6 p-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Total Sales</p>
                                <p className="text-2xl font-bold">₹9.26L</p>
                            </div>
                            <DollarSign className="w-8 h-8 text-blue-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Target Achievement</p>
                                <p className="text-2xl font-bold">106.9%</p>
                            </div>
                            <Target className="w-8 h-8 text-green-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Top Performer</p>
                                <p className="text-xl font-bold">Ahmed Khan</p>
                            </div>
                            <Trophy className="w-8 h-8 text-purple-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm">Active Reps</p>
                                <p className="text-2xl font-bold">5</p>
                            </div>
                            <Users className="w-8 h-8 text-orange-200" />
                        </div>
                    </div>
                </div>

                {/* Reusable Chart Component */}
                <ReusableBarChart {...salesChartConfig} />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">Sales Leaderboard</h3>
                        </div>
                    </div>

                    <DataTable
                        columns={salesLeaderboardColumns}
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

export default SalesLeaderboard;