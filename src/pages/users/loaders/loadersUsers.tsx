import {
    Users,
    AlertCircle,
    CheckCircle,
    RefreshCw
} from 'lucide-react';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '../../layout/pageLayout';
import { DataTable } from '../../../components/tables/data-table';
import { columns } from './columns';
import CreateUserDialog, { type UserData } from '../../../components/dialog/CreateUserDialog';

// API function to fetch students from db.json
const fetchLoaders = async (): Promise<UserData[]> => {
    const response = await fetch('/db.json');
    if (!response.ok) {
        throw new Error('Failed to fetch students');
    }
    const data = await response.json();
    return data.loaders;
};

const LoaderUsers: React.FC = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(5);

    // TanStack Query to fetch students
    const {
        data: loaders = [],
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ['loaders'],
        queryFn: fetchLoaders,
    });

    // Calculate pagination
    const totalPages = Math.ceil(loaders.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const currentPageData = loaders.slice(startIndex, endIndex);

    // Handle refresh
    const handleRefresh = () => {
        refetch();
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen">
                <PageLayout
                    title="Users Management (Loaders)"
                    description="Monitor team performance and daily operations"
                    lastUpdated="Loading..."
                    onRefresh={handleRefresh}
                >
                    <div className="flex items-center justify-center h-64">
                        <div className="flex items-center space-x-2">
                            <RefreshCw className="h-6 w-6 animate-spin" />
                            <span>Loading students...</span>
                        </div>
                    </div>
                </PageLayout>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen">
                <PageLayout
                    title="Users Management (Loaders)"
                    description="Monitor team performance and daily operations"
                    lastUpdated="Error occurred"
                    onRefresh={handleRefresh}
                >
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Failed to load
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {error instanceof Error ? error.message : 'Something went wrong'}
                            </p>
                            <button
                                onClick={handleRefresh}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </PageLayout>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <PageLayout
                title="Users Management (Loaders)"
                description="Monitor team performance and daily operations"
                lastUpdated={isFetching ? "Refreshing..." : "Just now"}
                onRefresh={handleRefresh}
            >
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 pb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Loaders</p>
                                <p className="text-3xl font-bold text-gray-900">{loaders.length}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Loaders</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {loaders.filter(s => s.userId.status === 'active').length}
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Inactive Loaders</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {loaders.filter(s => s.userId.status === 'inactive').length}
                                </p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                    </div>

                </div>
                <div className=' py-4 px-4 flex justify-end'>
                    <CreateUserDialog userType='loader' />
                </div>
                {/* Data Table */}
                <div className="relative">
                    {isFetching && (
                        <div className="absolute top-0 right-0 z-10 bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm flex items-center space-x-1">
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            <span>Refreshing...</span>
                        </div>
                    )}
                    <DataTable
                        columns={columns}
                        data={currentPageData}
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                        limit={limit}
                        setLimit={setLimit}
                    />
                </div>
            </PageLayout>
        </div>
    );
};

export default LoaderUsers;