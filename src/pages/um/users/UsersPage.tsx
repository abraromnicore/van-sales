import { useState, useEffect } from 'react';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Archive, Eye, List, Pencil, Plus, ShieldCheck, ShieldMinus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DASHBOARD_ROUTE,
  EDIT_USER_ROUTE,
  USERS_ROUTE,
  VIEW_USER_ROUTE,
} from '@utils/constant/app-route.constants.ts';
import { Button } from '@components/button/Button.tsx';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { useUsersList } from '@hooks/um/users/useUsersList.ts';
import type { UserType } from '@/types/um/users/user.type';
import { UserAvatar } from '@components/common/UserAvatar.tsx';
import { CustomDialog } from '@components/dialog/CustomDialog';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody';
import { useDeactivateUser } from '@hooks/um/users/useDeactivateUser';
import { useActivateUser } from '@hooks/um/users/useActivateUser';
import { useArchiveUser } from '@hooks/um/users/useArchiveUser';
import { useForm, FormProvider } from 'react-hook-form';
import { CalendarRangeControl } from '@components/multi-date-select/CustomDateRange';
import { SelectControl } from '@components/forms/SelectControl';
import { useAppToast } from '@hooks/common/useAppToast';
import { useCreateUser } from '@hooks/um/users/useCreateUser';
import { UserForm } from '@/forms/um/users/CreateUserForm';
import { useRolesList } from '@hooks/um/roles/useRolesList';

export const UserPage = () => {
  useMetadata({
    pageTitle: 'Users',
    breadcrumbs: [
      {
        label: 'Dashboard',
        route: DASHBOARD_ROUTE,
      },
      {
        label: 'User Management',
        route: '',
      },
      {
        label: 'Users',
        route: USERS_ROUTE,
        active: true,
      },
    ],
  });
  const { users } = useUsersList(true);
  const [selectedItem, setSelectedItem] = useState<UserType>();
  const navigate = useNavigate();
  const { deactivateUser } = useDeactivateUser();
  const { activateUser } = useActivateUser();
  const { archiveUser } = useArchiveUser();
  const [dialogAction, setDialogAction] = useState<null | 'delete' | 'deactivate' | 'archive' | 'logs' | 'activate'>(null);
  const [showUserLogsModal, setShowUserLogsModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const { showError } = useAppToast();
  
  // Create user hooks
  const { control, submitHandler, isValid, errors, getValues } = useCreateUser();
  const { roles, loading: rolesLoading } = useRolesList();
  
  const methods = useForm({
    defaultValues: {
      startDate: null, 
      endDate: null,
      filterByAction: '',
    },
  });
  
  const { reset } = methods;
  
  // Sample logs data - in real app, this would come from API
  const logs = [{
    id: 2352,
    targetUser: selectedItem?.username || 'User',
    action: 'Role Updated',
    changedBy: 'Admin User',
    changedByRole: 'superAdmin',
    timestamp: '2025-01-12T10:45:00Z',
    details: 'Role changed from "User" → "Manager"',
  }, {
    id: 2351,
    targetUser: selectedItem?.username || 'User',
    action: 'Account Archived',
    changedBy: 'Super Admin',
    changedByRole: 'superAdmin',
    timestamp: '2025-01-11T14:22:00Z',
    details: 'User deactivated due to exit from company',
  }, {
    id: 2350,
    targetUser: selectedItem?.username || 'User',
    action: 'Account Activated',
    changedBy: 'IT Admin',
    changedByRole: 'itAdmin',
    timestamp: '2025-01-10T09:30:00Z',
    details: 'Initial role set to "User"',
  }, {
    id: 2349,
    targetUser: selectedItem?.username || 'User',
    action: 'Password Changed',
    changedBy: selectedItem?.username || 'User',
    changedByRole: 'vanRep',
    timestamp: '2025-01-09T16:15:00Z',
    details: 'Password updated successfully',
  }, {
    id: 2348,
    targetUser: selectedItem?.username || 'User',
    action: 'Profile Updated',
    changedBy: selectedItem?.username || 'User',
    changedByRole: 'vanRep',
    timestamp: '2025-01-08T11:20:00Z',
    details: 'Email address updated from old@email.com to new@email.com',
  }];
  
  const actionOptions = [
    { label: 'Role Updated', value: 'Role Updated' },
    { label: 'Account Archived', value: 'Account Archived' },
    { label: 'Account Activated', value: 'Account Activated' },
    { label: 'Password Changed', value: 'Password Changed' },
    { label: 'Profile Updated', value: 'Profile Updated' }
  ];
  
  // Initialize filtered logs with all logs
  useEffect(() => {
    setFilteredLogs(logs);
  }, [selectedItem]);
  
  const isDeactivated = selectedItem?.status === 'deactivated' || selectedItem?.status === 'deactivate';
  const tieredMenu: MenuItem[] = [
    {
      label: 'View',
      icon: <Eye size={16} />,
      command: () => onView(),
    },
    {
      label: 'Edit',
      icon: <Pencil size={16} />,
      command: () => onEdit(),
    },
    {
      label: 'Delete',
      icon: <Trash2 size={16} />,
      command: () => onDelete(),
    },
    {
      label: isDeactivated ? 'Activate' : 'Deactivate',
      icon: isDeactivated ? <ShieldCheck size={16} /> : <ShieldMinus size={16} />,
      command: () =>
        isDeactivated ? onActivate() : onDeactivate(),
    },
    {
      label: 'Archive History',
      icon: <Archive size={16} />,
      command: () => onArchive(),
    },
    {
      label: 'Logs',
      icon: <List size={16} />,
      command: () => onLogs(),
    },
  ];


  const userColumns: ColumMeta[] = [
    {
      field: 'avatar',
      header: 'User',
      body: (rowData: UserType) => <UserAvatar user={rowData} size="sm" showName={true} />,
    },
    {
      field: 'id',
      header: 'User ID',
      style: { minWidth: '100px', width: '100px' },
    },
    {
      field: 'username',
      header: 'Username',
      style: { minWidth: '120px', width: '120px' },
    },
    {
      field: 'email',
      header: 'Email',
      style: { minWidth: '200px', width: '200px' },
    },
    {
      field: 'gender',
      header: 'Gender',
      style: { minWidth: '100px', width: '100px' },
    },
    {
      field: 'dateOfBirth',
      header: 'Date of Birth',
      style: { minWidth: '170px', width: '170px' },
      body: (rowData: UserType) => {
        if (!rowData.dateOfBirth) return '-';
        const date = new Date(rowData.dateOfBirth);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    {
      field: 'status',
      header: 'Status',
      style: { minWidth: '100px', width: '100px' },
      body: (rowData: UserType) => {
        const getStatusBadge = (status: string) => {
          const statusLower = status?.toLowerCase() || '';

          if (statusLower === 'active' || statusLower === 'activated') {
            return (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
            );
          } else if (statusLower === 'inactive' || statusLower === 'deactivated' || statusLower === 'deactivate') {
            return (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Inactive
            </span>
            );
          } else if (statusLower === 'archived' || statusLower === 'archive') {
            return (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Archived
            </span>
            );
          } else if (statusLower === 'pending') {
            return (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
            );
          } else {
            return (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || 'Unknown'}
            </span>
            );
          }
        };

        return getStatusBadge(rowData.status);
      },
    },
    {
      field: 'roleName',
      header: 'Role',
      style: { minWidth: '120px', width: '120px' },
    },
  ];
  
  const userLogColumns: ColumMeta[] = [
    { 
      field: 'action', 
      header: 'Action' 
    }, 
    {
      field: 'changedBy',
      header: 'Changed By',
    }, 
    {
      field: 'timestamp', 
      header: 'Date & Time', 
      style: { minWidth: '180px', width: '180px' }, 
      body: (rowData: any) => {
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
    }
  ];

  const exportCSV = () => {
    const headers = ['ID', 'Action', 'Changed By', 'Date & Time', 'Details'];
    const csvContent = [headers.join(','), ...filteredLogs.map(log => [log.id, `"${log.action}"`, `"${log.changedBy}"`, `"${new Date(log.timestamp).toLocaleString()}"`, `"${log.details}"`].join(','))].join('\n');

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

    console.log('Form data:', data);

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
  };

  const handleReset = () => {
    reset();
    setFilteredLogs(logs);
  };

  const onCreate = () => setShowCreateUserModal(true);
  const onEdit = () => navigate(EDIT_USER_ROUTE.replace('{userId}', selectedItem?.id || ''));
  const onView = () => navigate(VIEW_USER_ROUTE.replace('{userId}', selectedItem?.id || ''));
  const onDelete = () => setDialogAction('delete');
  const onDeactivate = () => setDialogAction('deactivate');
  const onArchive = () => setDialogAction('archive');
  const onActivate = () => setDialogAction('activate');
  const onLogs = () => {
    setShowUserLogsModal(true);
  };


  const HeaderActions = () => {
    return (
      <>
        <Button label={'Create User'} icon={<Plus />} onClick={onCreate} />
      </>
    );
  };

  return (
    <PageLayout headerActions={<HeaderActions />}>
      <div className="overflow-x-auto">
        <CustomTable setSelectedItem={setSelectedItem} columns={userColumns} data={users} menuModel={tieredMenu} />
      </div>
      <CustomDialog
        size="md"
        visible={!!dialogAction}
        onHide={() => setDialogAction(null)}
        dismissableMask={false}
      >
        <CustomDialogHeader
          onHide={() => setDialogAction(null)}
          title={
            dialogAction === 'delete'
              ? 'Delete User'
              : dialogAction === 'deactivate'
                ? 'Deactivate User'
                : 'Archive History'
          }
        />

        <CustomDialogBody>
          <p className="text-gray-700">
            {dialogAction === 'delete' && 'Are you sure you want to delete this user? This action cannot be undone.'}
            {dialogAction === 'deactivate' && 'Are you sure you want to deactivate this user? They will no longer have access to the system.'}
            {dialogAction === 'activate' && 'Are you sure you want to active this user? The user longer have access to the system.'}
            {dialogAction === 'archive' && 'Are you sure you want to archive this user’s history for record keeping?'}
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              label="Cancel"
              className="p-button-text"
              onClick={() => setDialogAction(null)}
            />
            <Button
              label={
                dialogAction === 'delete'
                  ? 'Delete'
                  : dialogAction === 'deactivate'
                    ? 'Deactivate'
                    : dialogAction === 'activate'
                      ? 'Activate'
                      : 'Archive'
              }
              className={
                dialogAction === 'delete'
                  ? 'p-button-danger'
                  : dialogAction === 'deactivate'
                    ? 'p-button-warning'
                    : dialogAction === 'activate'
                      ? 'p-button-success'
                      : 'p-button-secondary'
              }
              onClick={() => {
                if (dialogAction === 'delete') {
                  console.log('User deleted');
                }
                if (dialogAction === 'deactivate') {
                  deactivateUser(selectedItem);
                }
                if (dialogAction === 'activate') {
                  activateUser(selectedItem);
                }
                if (dialogAction === 'archive') {
                  archiveUser(selectedItem);
                }

                setDialogAction(null);
              }}
            />

          </div>
        </CustomDialogBody>
      </CustomDialog>

      {/* User Logs Modal */}
      <CustomDialog
        size="xl"
        visible={showUserLogsModal}
        onHide={() => setShowUserLogsModal(false)}
        dismissableMask={false}
      >
        <CustomDialogHeader
          onHide={() => setShowUserLogsModal(false)}
          title={`Audit Logs for ${selectedItem?.username || 'User'}`}
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
                    name="filterByAction"
                    label="Filter by Action"
                    options={actionOptions}
                    placeholder="Filter by Action"
                    required={false}
                    className="!py-0"
                  />
                  <Button
                    type="submit"
                    label="Submit"
                    variant="primary"
                    className="mb-1"
                  />
                  <Button
                    label="Reset"
                    variant="outline"
                    className="mb-1"
                    onClick={handleReset}
                  />
                  <Button
                    label="Export CSV"
                    variant="outline"
                    className="mb-1"
                    onClick={exportCSV}
                  />
                </form>
              </FormProvider>
            </div>
            <CustomTable
              data={filteredLogs.length > 0 ? filteredLogs : logs}
              columns={userLogColumns}
              setSelectedItem={() => {}}
            />
          </div>
        </CustomDialogBody>
      </CustomDialog>

      {/* Create User Modal */}
      <CustomDialog
        size="xl"
        visible={showCreateUserModal}
        onHide={() => setShowCreateUserModal(false)}
        dismissableMask={false}
      >
        <CustomDialogHeader
          onHide={() => setShowCreateUserModal(false)}
          title="Create User"
        />
        <CustomDialogBody>
          <UserForm
            control={control}
            submitHandler={submitHandler}
            isValid={isValid}
            getValues={getValues}
            errors={errors}
            roles={roles}
            rolesLoading={rolesLoading}
            mode="create"
          />
        </CustomDialogBody>
      </CustomDialog>
    </PageLayout>
  );
};