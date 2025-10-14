import { useState } from 'react';
import { PageLayout } from '@layouts/Pagelayout';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable';
import { CalendarRangeControl } from '@components/multi-date-select/CustomDateRange';
import { useForm } from 'react-hook-form';
import { Button } from '@components/button/Button';
import { SelectControl } from '@components/forms/SelectControl';
import { Download, Filter, RefreshCw } from 'lucide-react';
import { useAppToast } from '@hooks/common/useAppToast';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, LOGS_ROUTE, UM_ROUTE } from '@utils/constant/app-route.constants.ts';

export const VanSalesAuditLogPage = () => {
  useMetadata({
    pageTitle: 'Van Sales Audit Logs',
    breadcrumbs: [
      {
        label: 'Dashboard',
        route: DASHBOARD_ROUTE,
      },
      {
        label: 'User Management',
        route: UM_ROUTE,
      },
      {
        label: 'Van Sales Log',
        route: LOGS_ROUTE,
        active: true,
      },
    ],
  });
  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      filterByRole: '',
      filterByAction: '',
    },
  });

  const logs = [
    {
      id: 2352,
      targetUser: 'Smith Harcules',
      action: 'Role Updated',
      changedBy: 'Admin User',
      changedByRole: 'superAdmin',
      timestamp: '2025-01-12T10:45:00Z',
      details: 'Role changed from "User" → "Manager"',
    },
    {
      id: 2351,
      targetUser: 'John Doe',
      action: 'Account Archived',
      changedBy: 'Super Admin',
      changedByRole: 'superAdmin',
      timestamp: '2025-01-11T14:22:00Z',
      details: 'User deactivated due to exit from company',
    },
    {
      id: 2350,
      targetUser: 'Jane Smith',
      action: 'Account Activated',
      changedBy: 'IT Admin',
      changedByRole: 'itAdmin',
      timestamp: '2025-01-10T09:30:00Z',
      details: 'Initial role set to "User"',
    },
    {
      id: 2349,
      targetUser: 'Mike Johnson',
      action: 'Password Changed',
      changedBy: 'Mike Johnson',
      changedByRole: 'vanRep',
      timestamp: '2025-01-09T16:15:00Z',
      details: 'Password updated successfully',
    },
    {
      id: 2348,
      targetUser: 'Sarah Wilson',
      action: 'Profile Updated',
      changedBy: 'Sarah Wilson',
      changedByRole: 'manager',
      timestamp: '2025-01-08T11:20:00Z',
      details: 'Email address updated from old@email.com to new@email.com',
    },
    {
      id: 2347,
      targetUser: 'David Brown',
      action: 'Role Updated',
      changedBy: 'Finance Manager',
      changedByRole: 'financeManager',
      timestamp: '2025-01-07T15:30:00Z',
      details: 'Role changed from "User" → "Finance Manager"',
    },
    {
      id: 2346,
      targetUser: 'Lisa Davis',
      action: 'Account Activated',
      changedBy: 'Supervisor',
      changedByRole: 'supervisor',
      timestamp: '2025-01-06T12:15:00Z',
      details: 'New user account created',
    },
  ];

  const [setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const { showError } = useAppToast();
  const userLogColumns: ColumMeta[] = [
    {
      field: 'id',
      header: 'ID',
      style: { minWidth: '80px', width: '80px' },
    },
    {
      field: 'targetUser',
      header: 'Target User',
      style: { minWidth: '150px', width: '150px' },
    },
    {
      field: 'action',
      header: 'Action',
      style: { minWidth: '140px', width: '140px' },
    },
    {
      field: 'changedBy',
      header: 'Changed By',
      style: { minWidth: '130px', width: '130px' },
    },
    {
      field: 'timestamp',
      header: 'Date & Time',
      style: { minWidth: '180px', width: '180px' },
      body: (rowData) => {
        const date = new Date(rowData.timestamp);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {date.toLocaleDateString()}
            </span>
            <span className="text-xs text-gray-500">
              {date.toLocaleTimeString()}
            </span>
          </div>
        );
      },
    },
    {
      field: 'details',
      header: 'Details',
      style: { minWidth: '250px', width: '250px' },
    },
  ];


  const exportCSV = () => {
    const headers = ['ID', 'Target User', 'Action', 'Changed By', 'Date & Time', 'Details'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.id,
        `"${log.targetUser}"`,
        `"${log.action}"`,
        `"${log.changedBy}"`,
        `"${new Date(log.timestamp).toLocaleString()}"`,
        `"${log.details}"`,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const userOptions = [
    { label: 'All Roles', value: '' },
    { label: 'Super Admin', value: 'superAdmin' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'IT Admin', value: 'itAdmin' },
    { label: 'Van Rep', value: 'vanRep' },
    { label: 'Finance Manager', value: 'financeManager' },
    { label: 'Manager', value: 'manager' },
  ];

  const actionOptions = [
    { label: 'All Actions', value: '' },
    { label: 'Role Updated', value: 'Role Updated' },
    { label: 'Account Archived', value: 'Account Archived' },
    { label: 'Account Activated', value: 'Account Activated' },
    { label: 'Password Changed', value: 'Password Changed' },
    { label: 'Profile Updated', value: 'Profile Updated' },
  ];
  const onSubmit = (data: any) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      if (start > end) {
        showError('Date Validation', 'Start date must be before end date.');
        return;
      }
    }

    setIsLoading(true);
    console.log('Form data:', data);

    setTimeout(() => {
      let filtered = [...logs];

      if (data.filterByRole) {
        filtered = filtered.filter(log => log.changedByRole === data.filterByRole);
      }

      if (data.filterByAction) {
        filtered = filtered.filter(log => log.action === data.filterByAction);
      }

      if (data.startDate && data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        filtered = filtered.filter(log => {
          const logDate = new Date(log.timestamp);
          return logDate >= startDate && logDate <= endDate;
        });
      }

      setFilteredLogs(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    reset();
    setFilteredLogs(logs);
  };

  return (
    <PageLayout className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Van Sales Audit Logs</h1>
        <p className="text-gray-600">
          Monitor and track all user activities and system changes across the application.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center mb-6">
          <Filter className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Filter Logs</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <CalendarRangeControl
                control={control}
                nameStart="startDate"
                nameEnd="endDate"
                labelStart="From Date"
                labelEnd="To Date"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SelectControl
              control={control}
              name="filterByRole"
              label="Filter by Role"
              options={userOptions}
              placeholder="Select role"
              className=""
            />
            <SelectControl
              control={control}
              name="filterByAction"
              label="Filter by Action"
              options={actionOptions}
              placeholder="Select action"
              className=""
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              label="Reset Filters"
              icon={<RefreshCw size={18} />}
              onClick={handleReset}
              className="w-full sm:w-auto"
            />
            <Button
              type="submit"
              variant="primary"
              label="Apply Filters"
              icon={<Filter size={18} />}
              disabled={isLoading}
              className="w-full sm:w-auto"
            />
            <Button
              type="button"
              variant="outline"
              label="Export CSV"
              icon={<Download size={18} />}
              onClick={exportCSV}
              className="w-full sm:w-auto"
            />
          </div>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-blue-800">
                Showing {filteredLogs.length} audit log entries
              </span>
          </div>
          <div className="text-xs text-blue-600">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Audit Log Entries</h3>
          <p className="text-sm text-gray-600 mt-1">
            Complete history of user actions and system changes
          </p>
        </div>

        <div className="overflow-x-auto">
          <CustomTable
            data={filteredLogs}
            columns={userLogColumns}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-700">Processing filters...</span>
          </div>
        </div>
      )}
    </PageLayout>
  );
};