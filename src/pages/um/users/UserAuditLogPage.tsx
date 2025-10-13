import { useState } from 'react';
import { PageLayout } from '@layouts/Pagelayout';
import { CustomTable, type ColumMeta } from '@components/tables/CustomTable';
import { CustomDialog } from '@components/dialog/CustomDialog';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader';
import { USERS_ROUTE } from '@utils/constant/app-route.constants';
import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { CalendarRangeControl } from '@components/multi-date-select/CustomDateRange';
import { SelectControl } from '@components/forms/SelectControl';
import { Button } from '@components/button/Button';

export const UserAuditLogPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleViewRole, setVisibleViewRole] = useState<boolean>(true);
  const navigate = useNavigate()
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
      timestamp: '2025-10-12T10:45:00Z',
      details: 'Role changed from "User" → "Manager"',
    },
    {
      id: 2,
      targetUser: 'Smith Harcules',
      action: 'Account Archived',
      changedBy: 'Super Admin',
      timestamp: '2025-10-11T14:22:00Z',
      details: 'User deactivated due to exit from company',
    },
    {
      id: 3,
      targetUser: 'Smith Harcules',
      action: 'Account Activate',
      changedBy: 'IT Admin',
      timestamp: '2025-10-10T09:30:00Z',
      details: 'Initial role set to "User"',
    },
  ];
    const userOptions=[
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Alex Johnson', value: 'Alex Johnson' },
  ]
    const userLogColumns: ColumMeta[] = [
    { field: 'action', header: 'Action' },
    { field: 'changedBy', header: 'Changed By' },
    {
      field: 'timestamp',
      header: 'Date & Time',
      body: (rowData) => new Date(rowData.timestamp).toLocaleString(),
    },
    { field: 'details', header: 'Details' },
  ];
  
  const exportCSV = () => {
    const csv = logs
      .map((l) => `${l.targetUser},${l.action},${l.changedBy},${l.timestamp},${l.details}`)
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_audit_log.csv';
    a.click();
  };
    const onSubmit = (data: any) => console.log('Form data:', data);

  return (
  <PageLayout>
    <CustomDialog size="xl" onHide={() => setVisibleViewRole(false)} visible={visibleViewRole}>
          <CustomDialogHeader
    onHide={() => navigate(USERS_ROUTE)}
    title={`Audit Log For ${logs[0].targetUser}`}
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
                                label='Submit'
                                variant='primary'
                                className='mb-1'
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
}
