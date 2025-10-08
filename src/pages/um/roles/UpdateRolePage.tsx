import { Card } from '@components/card/Card.tsx';
import { CardHeader } from '@components/card/CardHeader.tsx';
import { useParams } from 'react-router-dom';
import { UpdateRoleForm } from '@/forms/um/roles/UpdateRoleForm.tsx';

export const UpdateRolePage = () => {
  const { id } = useParams();
  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <Card>
        <CardHeader title={'Roles Permissions'}></CardHeader>
        <UpdateRoleForm id={id} />
      </Card>
    </div>
  );
};