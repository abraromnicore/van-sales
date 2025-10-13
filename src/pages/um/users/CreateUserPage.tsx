import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { CustomDialog } from '@components/dialog/CustomDialog';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '@hooks/um/users/useCreateUser';
import { UserForm } from '@/forms/um/users/CreateUserForm';
import { useRolesList } from '@hooks/um/roles/useRolesList';

export const CreateUserPage = () => {
  useMetadata({
    pageTitle: 'Create User',
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
      },
      {
        label: 'Create',
        route: '',
        active: true,
      },
    ],
  });
  const navigate = useNavigate();
  const [visibleViewRole, setVisibleViewRole] = useState<boolean>(true);

  const { control, submitHandler, isValid, errors, getValues } = useCreateUser();
  const { roles, loading: rolesLoading } = useRolesList();
  return (
    <PageLayout>
      <CustomDialog size={'xl'} onHide={() => navigate(USERS_ROUTE)} visible={visibleViewRole} dismissableMask={false}>
        <CustomDialogHeader onHide={() => navigate(USERS_ROUTE)} title={'Create User'} />
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