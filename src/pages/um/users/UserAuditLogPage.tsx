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
import { Card } from '@components/app-cards/card/Card.tsx';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';
import { CardHeader } from '@components/app-cards/card/CardHeader.tsx';
import { userLogs as logs } from '@/sample-data/create-user';

export const VanSalesAuditLogPage = () => {
  useMetadata({
    pageTitle: 'Users Audit Logs',
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
        label: 'Users Logs',
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
    <PageLayout>
      <Card styleClass={'mb-[24px]'}>
        <CardHeader title="Filter Logs" icon={<Filter />} />
        <CardBody>
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
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CustomTable
            data={filteredLogs}
            columns={userLogColumns}
            setSelectedItem={setSelectedItem}
          />
        </CardBody>
      </Card>
    </PageLayout>
  );
};