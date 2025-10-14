import { CreateRoleForm } from '@/forms/um/roles/CreateRoleForm.tsx';

type UpdateRoleFormProps = {
  control: any;
  submitHandler: (e: any) => void;
  isValid: boolean;
}

export const UpdateRoleForm = (props: UpdateRoleFormProps) => {
  const { control, submitHandler, isValid } = props;
  return <CreateRoleForm control={control} submitHandler={submitHandler} isValid={isValid}  />;
};