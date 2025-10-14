import { useState } from 'react';
import { PageLayout } from '@layouts/Pagelayout';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable';
import { CustomDialog } from '@components/dialog/CustomDialog';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader';
import { CalendarRangeControl } from '@components/multi-date-select/CustomDateRange';
import { useForm } from 'react-hook-form';
import { Button } from '@components/button/Button';
import { SelectControl } from '@components/forms/SelectControl';
import { USERS_ROUTE } from '@utils/constant/app-route.constants';
import { Download, Filter, RefreshCw } from 'lucide-react';
import { useAppToast } from '@hooks/common/useAppToast';
import { useNavigate } from 'react-router-dom';

export const UserAuditLogPage = () => {
  const [setSelectedItem] = useState<any>(null);
  const [visibleViewRole, setVisibleViewRole] = useState<boolean>(true);
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
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
      targetUser: 'Smith Harcules',
      action: 'Account Archived',
      changedBy: 'Super Admin',
      changedByRole: 'superAdmin',
      timestamp: '2025-01-11T14:22:00Z',
      details: 'User deactivated due to exit from company',
    },
    {
      id: 2350,
      targetUser: 'Smith Harcules',
      action: 'Account Activated',
      changedBy: 'IT Admin',
      changedByRole: 'itAdmin',
      timestamp: '2025-01-10T09:30:00Z',
      details: 'Initial role set to "User"',
    },
    {
      id: 2349,
      targetUser: 'Smith Harcules',
      action: 'Password Changed',
      changedBy: 'Smith Harcules',
      changedByRole: 'vanRep',
      timestamp: '2025-01-09T16:15:00Z',
      details: 'Password updated successfully',
    },
    {
      id: 2348,
      targetUser: 'Smith Harcules',
      action: 'Profile Updated',
      changedBy: 'Smith Harcules',
      changedByRole: 'vanRep',
      timestamp: '2025-01-08T11:20:00Z',
      details: 'Email address updated from old@email.com to new@email.com',
    },
  ];
  const userOptions = [
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Alex Johnson', value: 'Alex Johnson' },
  ];
  const userLogColumns: ColumMeta[] = [
    { field: 'action', header: 'Action' },
    { field: 'changedBy', header: 'Changed By' },
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
      style: { minWidth: '250px', width: '250px' }
    },
  ];

  const exportCSV = () => {
    const headers = ['ID', 'Action', 'Changed By', 'Date & Time', 'Details'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.id,
        `"${log.action}"`,
        `"${log.changedBy}"`,
        `"${new Date(log.timestamp).toLocaleString()}"`,
        `"${log.details}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSubmit = (data: any) => {
    // Validate date range
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
      <CustomDialog size="xl" onHide={() => setVisibleDialog(false)} visible={visibleDialog}>
        <CustomDialogHeader
          onHide={() => navigate(USERS_ROUTE)}
          title={`Audit Logs for ${logs[0]?.targetUser || 'User'}`}
        />
        <CustomDialogBody>
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="flex items-end space-x-4 p-6 bg-white rounded-md shadow-sm"
                >
                  <CalendarRangeControl
                    control={methods.control}
                    nameStart="startDate"
                    nameEnd="endDate"
                    labelStart="From Date"
                    labelEnd="To Date"
                    required
                  />
                  <SelectControl
                    control={methods.control}
                    name="filterbyRole"
                    label="Filter by Role"
                    options={userOptions}
                    placeholder="Filter by Role"
                    required={true}
                    className="!py-0"
                  />
                  <Button
                    type="submit"
                    label="Submit"
                    variant="primary"
                    className="mb-1"
                  />
                  <Button
                    label="Export CSV"
                    // icon="pi pi-download"
                    className="p-button-sm p-button-outlined mb-1"
                    onClick={exportCSV}
                  />
                </form>
              </FormProvider>
            </div>
            <CustomTable
              data={logs}
              columns={userLogColumns}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </CustomDialogBody>
      </CustomDialog>
    </PageLayout>
  );
};