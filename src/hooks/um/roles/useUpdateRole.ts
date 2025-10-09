import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { roleSchema } from '@/schemas/um/roles/role.schema.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { updateRole } from '@/store/features/um/role/roleSlice.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { ROLES_ROUTE } from '@utils/constant/app-route.constants.ts';

export const useUpdateRole = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useAppToast();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(roleSchema, { abortEarly: false }),
    mode: 'onChange',
  });

  const isTouched = Object.keys(touchedFields).length > 0;

  const onSubmit = async (payload: any) => {
    try {
      const response = await dispatch(updateRole(payload)).unwrap();
      showSuccess('Update Role', 'Role updated successfully.');
      navigate(ROLES_ROUTE);
      return response;
    } catch (e: any) {
      showError('Update Role', 'Unable to update role');
      throw e;
    }
  };

  const submitHandler = handleSubmit(onSubmit);

  return {
    control,
    errors,
    submitHandler,
    isValid,
    reset,
    isTouched
  };

};