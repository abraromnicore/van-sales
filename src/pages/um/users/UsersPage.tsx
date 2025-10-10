import { useState } from 'react';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Eye, Pencil, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  CREATE_USER_ROUTE,
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
  const tieredMenu: MenuItem[] = [
    {
      label: 'View',
      icon: <Eye />,
      command: () => onView(),
    },
    {
      label: 'Edit',
      icon: <Pencil />,
      command: () => onEdit(),
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
    </PageLayout>
  );
};