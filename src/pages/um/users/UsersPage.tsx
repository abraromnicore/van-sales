import { useState } from 'react';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Eye, Pencil, Trash2, Archive, List, Plus, ShieldMinus, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  CREATE_USER_ROUTE,
  DASHBOARD_ROUTE,
  EDIT_USER_ROUTE,
  USER_LOGS_ROUTE,
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
  console.log(selectedItem, `selected item:`)
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
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          );
        } else if (statusLower === 'inactive' || statusLower === 'deactivated' || statusLower === 'deactivate') {
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Inactive
            </span>
          );
        } else if (statusLower === 'archived' || statusLower === 'archive') {
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Archived
            </span>
          );
        } else if (statusLower === 'pending') {
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
  const onCreate = () => navigate(CREATE_USER_ROUTE);
  const onEdit = () => navigate(EDIT_USER_ROUTE.replace('{userId}', selectedItem?.id || ''));
  const onView = () => navigate(VIEW_USER_ROUTE.replace('{userId}', selectedItem?.id || ''));
  const onDelete = () => setDialogAction('delete');
  const onDeactivate = () => setDialogAction('deactivate');
  const onArchive = () => setDialogAction('archive');
  const onActivate = () => setDialogAction('activate');
  const onLogs = () => {
  navigate(USER_LOGS_ROUTE.replace('{userId}', selectedItem?.id || ''));
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
    </PageLayout>
  );
};