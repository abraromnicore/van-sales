import { useState } from 'react';
import { Card } from 'primereact/card';
import { PageLayout } from '@layouts/Pagelayout';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable';
import { CalendarRangeControl } from '@components/multi-date-select/CustomDateRange';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/button/Button';
import { SelectControl } from '@components/forms/SelectControl';

export const VanSalesAuditLogPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const methods = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
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
  const userOptions = [
    { label: 'Super Admin', value: 'superAdmin' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'IT Admin', value: 'itAdmin' },
    { label: 'Van Rep', value: 'vanRepx' },
    { label: 'Finance Manager', value: 'financeManager' },
    { label: 'Manager', value: 'manager' },

  ];
  const onSubmit = (data: any) => console.log('Form data:', data);

  return (
    <PageLayout>
      <div className="p-6">
        <Card title={`Audit Logs Van Sales`} className="shadow-md">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
            <div className="flex gap-3 items-center">
              <div className="p-6 !pl-0 space-y-4">
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
            </div>
          </div>
          <CustomTable
            data={logs}
            columns={userLogColumns}
            setSelectedItem={setSelectedItem}
          />
        </Card>
      </div>
    </PageLayout>
  );
};