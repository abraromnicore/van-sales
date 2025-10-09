import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { roleSchema } from '@/schemas/um/roles/role.schema.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { ROLES_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { createRole } from '@/store/features/um/role/roleSlice.ts';
import type { RoleType } from '@/types/um/roles/role.type.ts';
import { useEffect } from 'react';
import { setPermissions } from '@utils/permissions.utils.ts';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess } = useAppToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(roleSchema, { abortEarly: false }),
    mode: 'onTouched',
  });

  const onSubmit = async (formData: any) => {
    const payload: Omit<RoleType, 'id'> = formData;
    console.log(formData);
    navigate(ROLES_ROUTE);
    showSuccess('Create Role', 'Role Created Successfully.');
    const response = await dispatch(createRole(payload)).unwrap();
    console.log(response);
  };

  const submitHandler = handleSubmit(onSubmit);

  useEffect(() => {
    setPermissions()
  }, []);

  return {
    control,
    errors,
    submitHandler,
    isValid,
    touchedFields,
  };

};