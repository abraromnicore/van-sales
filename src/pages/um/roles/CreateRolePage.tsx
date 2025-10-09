import { Card } from '@components/card/Card.tsx';
import { CreateRoleForm } from '@/forms/um/roles/CreateRoleForm.tsx';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, ROLES_ROUTE } from '@utils/constant/app-route.constants.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { CardBody } from '@components/card/CardBody.tsx';
import { useCreateRole } from '@hooks/um/roles/useCreateRole.ts';

export const CreateRolePage = () => {
  useMetadata({
    pageTitle: 'Create Role',
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
      },
      {
        label: 'Create',
        route: '',
        active: true,
      },
    ],
  });
  const { control, submitHandler, isValid } = useCreateRole();
  return (
    <PageLayout>
      <Card>
        <CardBody>
          <CreateRoleForm control={control} submitHandler={submitHandler} isValid={isValid} />
        </CardBody>
      </Card>
    </PageLayout>
  );
};