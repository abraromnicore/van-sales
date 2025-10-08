import { Card } from '@components/card/Card.tsx';
import { CardHeader } from '@components/card/CardHeader.tsx';
import { CreateRoleForm } from '@/forms/um/roles/CreateRoleForm.tsx';

export const CreateRolePage = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <Card>
        <CardHeader title={'Roles Permissions'}></CardHeader>
        <CreateRoleForm />
      </Card>
    </div>
  );
};