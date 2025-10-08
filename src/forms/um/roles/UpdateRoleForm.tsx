import { CreateRoleForm } from '@/forms/um/roles/CreateRoleForm.tsx';
import { useUpdateRole } from '@hooks/um/roles/useUpdateRole.ts';

type UpdateRoleFormProps = {
  id: string | undefined
}

export const UpdateRoleForm = (props: UpdateRoleFormProps) => {
  const { control, submitHandler } = useUpdateRole();
  const { id } = props;

  return <CreateRoleForm id={id} />;
};