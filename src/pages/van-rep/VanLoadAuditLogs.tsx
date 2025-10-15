import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE } from '@utils/constant/app-route.constants.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { useState } from 'react';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';
import { CustomTable } from '@components/tables/CustomTable.tsx';
import { Card } from '@components/app-cards/card/Card.tsx';
import { CardHeader } from '@components/app-cards/card/CardHeader.tsx';
import { useForm } from 'react-hook-form';
import { Button } from '@components/button/Button';
import { SelectControl } from '@components/forms/SelectControl';
import { Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import { useAppToast } from '@hooks/common/useAppToast';
import { CardFooter } from '@components/app-cards/card/CardFooter.tsx';
import CalendarControl2 from '@components/forms/CalendarControl2.tsx';


export const VanLoadAuditLogs = () => {
  useMetadata({
    pageTitle: 'Van Load Audit Logs',
    breadcrumbs: [
      {
        label: 'Dashboard',
        route: DASHBOARD_ROUTE,
      },
      {
        label: 'Van Representative',
        route: '',
      },
      {
        label: 'Van Load Audit Logs',
        route: '',
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
      filterByVan: '',
      filterByRole: '',
    },
  });

  const [setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useAppToast();

  const vanLoadAuditLogs = [
    {
      id: 5010,
      timestamp: '2025-10-14T09:15:00Z',
      action: 'Load Request Created',
      vanId: 'VAN-1023',
      performedBy: 'Ali Raza',
      role: 'Van Representative',
      status: 'Pending Approval',
      details: 'Requested load for route #A23 (12 items, 2 pallets).',
    },
    {
      id: 5009,
      timestamp: '2025-10-14T10:05:00Z',
      action: 'Load Approved',
      vanId: 'VAN-1023',
      performedBy: 'Sarah Khan',
      role: 'Supervisor',
      status: 'Approved',
      details: 'Approved van load request for route #A23.',
    },
    {
      id: 5008,
      timestamp: '2025-10-14T12:30:00Z',
      action: 'Load Adjustment',
      vanId: 'VAN-1023',
      performedBy: 'Ali Raza',
      role: 'Van Representative',
      status: 'Adjusted',
      details: 'Adjusted product quantity: "Coca-Cola 1.5L" from 50 → 45 due to stock limit.',
    },
    {
      id: 5007,
      timestamp: '2025-10-14T15:00:00Z',
      action: 'Load Unloaded',
      vanId: 'VAN-1023',
      performedBy: 'Ali Raza',
      role: 'Van Representative',
      status: 'Completed',
      details: 'Unload completed at warehouse return point. All items verified.',
    },
    {
      id: 5006,
      timestamp: '2025-10-13T16:45:00Z',
      action: 'Load Request Created',
      vanId: 'VAN-2041',
      performedBy: 'Bilal Ahmed',
      role: 'Van Representative',
      status: 'Pending Approval',
      details: 'Requested load for route #B18 (15 items).',
    },
    {
      id: 5005,
      timestamp: '2025-10-13T17:10:00Z',
      action: 'Load Rejected',
      vanId: 'VAN-2041',
      performedBy: 'Omar Siddiqui',
      role: 'Supervisor',
      status: 'Rejected',
      details: 'Load request rejected — stock not available for "Nestlé Water 500ml".',
    },
    {
      id: 5004,
      timestamp: '2025-10-13T18:30:00Z',
      action: 'Load Request Re-Submitted',
      vanId: 'VAN-2041',
      performedBy: 'Bilal Ahmed',
      role: 'Van Representative',
      status: 'Pending Approval',
      details: 'Re-submitted load request with updated items (reduced quantity).',
    },
    {
      id: 5003,
      timestamp: '2025-10-12T09:40:00Z',
      action: 'Load Approved',
      vanId: 'VAN-1108',
      performedBy: 'Asma Javed',
      role: 'Supervisor',
      status: 'Approved',
      details: 'Approved morning load request for route #C05.',
    },
    {
      id: 5002,
      timestamp: '2025-10-12T15:10:00Z',
      action: 'Load Unloaded',
      vanId: 'VAN-1108',
      performedBy: 'Adeel Khan',
      role: 'Van Representative',
      status: 'Completed',
      details: 'Unload completed — 1 missing carton reported for "Pepsi 500ml".',
    },
  ];

  const [filteredLogs, setFilteredLogs] = useState(vanLoadAuditLogs);

  const vanLoadAuditLogColumns = [
    {
      field: 'vanId',
      header: 'VanID',
    },
    {
      field: 'timestamp',
      header: 'Date & Time',
      body: (rowData:any) => {
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
      field: 'action',
      header: 'Action',
    },
    {
      field: 'performedBy',
      header: 'PerformedBy',
    },
    {
      field: 'role',
      header: 'Role',
    },
    {
      field: 'status',
      header: 'Status',
    },
    {
      field: 'details',
      header: 'Details',
      style: { minWidth: '200px', width: '200px' },
    },
  ];

  const vanOptions = [
    { label: 'All Vans', value: '' },
    { label: 'VAN-1023', value: 'VAN-1023' },
    { label: 'VAN-2041', value: 'VAN-2041' },
    { label: 'VAN-1108', value: 'VAN-1108' },
  ];

  const roleOptions = [
    { label: 'All Roles', value: '' },
    { label: 'Van Representative', value: 'Van Representative' },
    { label: 'Supervisor', value: 'Supervisor' },
  ];

  const exportCSV = () => {
    const headers = ['ID', 'Van ID', 'Date & Time', 'Action', 'Performed By', 'Role', 'Status', 'Details'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.id,
        `"${log.vanId}"`,
        `"${new Date(log.timestamp).toLocaleString()}"`,
        `"${log.action}"`,
        `"${log.performedBy}"`,
        `"${log.role}"`,
        `"${log.status}"`,
        `"${log.details}"`,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `van_load_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
      let filtered = [...vanLoadAuditLogs];

      if (data.filterByVan) {
        filtered = filtered.filter(log => log.vanId === data.filterByVan);
      }

      if (data.filterByRole) {
        filtered = filtered.filter(log => log.role === data.filterByRole);
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
    setFilteredLogs(vanLoadAuditLogs);
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card styleClass={'mb-[24px]'}>
        <CardHeader title="Filter Logs" icon={<Filter size={20} className={`mt-0.5`} />} />
        <CardBody>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`flex flex-col gap-2 w-full`}>
                  <CalendarControl2
                    name="startDate"
                    control={control}
                    prefixIcon={<Calendar size={18} />}
                    placeholder="From date"
                  />
                  <CalendarControl2
                    name="endDate"
                    control={control}
                    prefixIcon={<Calendar size={18} />}
                    placeholder="To date"
                  />
                </div>
                <SelectControl
                  control={control}
                  name="filterByVan"
                  label="Filter by Van"
                  options={vanOptions}
                  placeholder="Select van"
                />
                <SelectControl
                  control={control}
                  name="filterByRole"
                  label="Filter by Role"
                  options={roleOptions}
                  placeholder="Select role"
                />
              </div>
        </CardBody>
        <CardFooter>
          <div className="w-full flex flex-col justify-end items-center sm:flex-row gap-4 ">
            <Button
              type="button"
              variant="danger"
              label="Reset Filters"
              icon={<RefreshCw size={16} />}
              onClick={handleReset}
            />
            <Button
              type="submit"
              variant="primary"
              label="Apply Filters"
              icon={<Filter size={16} />}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="outline"
              label="Export CSV"
              icon={<Download size={16} />}
              onClick={exportCSV}
            />
          </div>
        </CardFooter>
      </Card>
    </form>


      <Card>
        <CardBody>
          <CustomTable
            data={filteredLogs}
            columns={vanLoadAuditLogColumns}
            setSelectedItem={setSelectedItem}
          />
        </CardBody>
      </Card>
    </PageLayout>

  );
};