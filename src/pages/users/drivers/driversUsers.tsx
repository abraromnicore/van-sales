import {
    Users,
    AlertCircle,
    CheckCircle,
    RefreshCw
} from 'lucide-react';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '../../layout/pageLayout';
import { columns } from './columns';
import { DataTable } from '@components/tables/data-table.tsx';

// API function to fetch students from db.json
const fetchDrivers = async (): Promise<UserData[]> => {
    const response = await fetch('/db.json');
    if (!response.ok) {
        throw new Error('Failed to fetch students');
    }
    const data = await response.json();
    return data.drivers;
};

const DriverUsers: React.FC = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(5);

    // TanStack Query to fetch students
    const {
        data: drivers = [],
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ['drivers'],
        queryFn: fetchDrivers,
    });

    // Calculate pagination
    const totalPages = Math.ceil(drivers.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const currentPageData = drivers.slice(startIndex, endIndex);

    return (
      <DataTable
        columns={columns}
        data={currentPageData}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
      />
    );
};

export default DriverUsers;