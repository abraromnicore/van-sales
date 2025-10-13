import { useState } from 'react';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Eye, Pencil, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  CREATE_ROLE_ROUTE,
  DASHBOARD_ROUTE,
  EDIT_ROLE_ROUTE,
  ROLES_ROUTE,
} from '@utils/constant/app-route.constants.ts';
import type { RoleType } from '@/types/um/roles/role.type.ts';
import { Button } from '@components/button/Button.tsx';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { useRolesList } from '@hooks/um/roles/useRolesList.ts';
import { CustomDialog } from '@components/dialog/CustomDialog.tsx';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader.tsx';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody.tsx';
import { ViewRolePage } from '@pages/um/roles/ViewRolePage.tsx';

export const RolesPage = () => {
  useMetadata({
    pageTitle: 'Roles',
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
        label: 'Roles',
        route: ROLES_ROUTE,
        active: true,
      },
    ],
  });
  const { roles } = useRolesList(true);
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
      field: 'roleName',
      header: 'Role Name',
    },
  ];
  const [visibleViewRole, setVisibleViewRole] = useState<boolean>(false);

  const onCreate = () => navigate(CREATE_ROLE_ROUTE);
  const onEdit = () => navigate(EDIT_ROLE_ROUTE.replace('{roleId}', selectedItem?.id));
  const onView = () => setVisibleViewRole(true);

  const HeaderActions = () => {
    return (
      <>
        <Button label={'Create Role'} icon={<Plus />} onClick={onCreate} />
      </>
    );
  };

  return (
    <PageLayout headerActions={<HeaderActions />}>
      <CustomTable className={`bg-vsruiable`} setSelectedItem={setSelectedItem} columns={columns} data={roles} menuModel={tieredMenu} />
      <CustomDialog size={'full'} onHide={() => setVisibleViewRole(false)} visible={visibleViewRole}>
        <CustomDialogHeader onHide={() => setVisibleViewRole(false)} title={'View Role'} />
        <CustomDialogBody>
          <ViewRolePage selectedItem={selectedItem} />
        </CustomDialogBody>
        <CustomDialogBody>
          <Button label={'Close'} onClick={() => setVisibleViewRole(false)} />
        </CustomDialogBody>
      </CustomDialog>
    </PageLayout>
  );
};