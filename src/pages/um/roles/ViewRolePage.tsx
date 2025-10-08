import { Card } from '@components/card/Card.tsx';
import { CardHeader } from '@components/card/CardHeader.tsx';
import { ViewRoleForm } from '@/forms/um/roles/ViewRoleForm.tsx';
import { useParams } from 'react-router-dom';

export const ViewRolePage = () => {
  const { id } = useParams();

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <Card>
        <CardHeader title={'Roles Permissions'}></CardHeader>
        <ViewRoleForm id={id} />
      </Card>
    </div>
  );
};