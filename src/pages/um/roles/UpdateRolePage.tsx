import { Card } from '@components/app-cards/card/Card.tsx';
import { UpdateRoleForm } from '@/forms/um/roles/UpdateRoleForm.tsx';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';
import { useUpdateRole } from '@hooks/um/roles/useUpdateRole.ts';
import { useGetSingleRole } from '@hooks/um/roles/useGetSingleRole.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import type { RoleType } from '@/types/um/roles/role.type.ts';

export const UpdateRolePage = () => {
  const { control, submitHandler, isValid, reset } = useUpdateRole();
  const { id } = useParams();
  const { role, loading } = useGetSingleRole(id);

  useEffect(() => {
    if (!loading) {
      reset(role as RoleType);
    }
  }, [role, loading]);

  return (
    <PageLayout>
      <Card>
        <CardBody>
          <UpdateRoleForm control={control} submitHandler={submitHandler} isValid={isValid} />
        </CardBody>
      </Card>
    </PageLayout>
  );
};