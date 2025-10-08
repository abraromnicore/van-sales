import { useState } from 'react';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { useDriversList } from '@hooks/drivers/useDriversList.ts';
import { Eye, Pencil, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  CREATE_ROLE_ROUTE,
  DASHBOARD_ROUTE,
  EDIT_ROLE_ROUTE,
  ROLES_ROUTE,
  VIEW_ROLE_ROUTE,
} from '@utils/constant/app-route.constants.ts';
import type { RoleType } from '@/types/um/roles/role.type.ts';
import { Button } from '@components/button/Button.tsx';
import { Breadcrumbs } from '@components/common/Breadcrumbs.tsx';
import { useBreadcrumbs } from '@hooks/common/useBreadcrumbs.ts';

export const RolesPage = () => {
  useBreadcrumbs([
    {
      label: 'Dashboard',
      path: DASHBOARD_ROUTE,
    },
    {
      label: 'User Management',
      path: '',
    },
    {
      label: 'Roles',
      path: ROLES_ROUTE,
    },
  ]);
  const { drivers } = useDriversList(true);
  const [selectedItem, setSelectedItem] = useState<RoleType>();
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
  const columns: ColumMeta[] = [
    {
      field: 'driverId',
      header: 'Driver ID',
    },
    {
      field: 'firstName',
      header: 'First Name',
    },
    {
      field: 'lastName',
      header: 'Last Name',
    },
    {
      field: 'dateOfBirth',
      header: 'Date of Birth',
    },
    {
      field: 'gender',
      header: 'Gender',
    },
  ];

  const onCreate = () => navigate(CREATE_ROLE_ROUTE);
  const onEdit = () => navigate(EDIT_ROLE_ROUTE.replace('{roleId}', selectedItem?.id));
  const onView = () => navigate(VIEW_ROLE_ROUTE.replace('{roleId}', selectedItem?.id));

  return (
    <>
      <div className={'flex justify-between gap-6 mb-6'}>
        <Breadcrumbs />
        <Button label={'Create Role'} icon={<Plus />} onClick={onCreate} />
      </div>
      <CustomTable setSelectedItem={setSelectedItem} columns={columns} data={drivers} menuModel={tieredMenu} />
    </>
  );
};