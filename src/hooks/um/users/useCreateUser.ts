import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/schemas/um/users/user.schema.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import type { UserType } from '@/types/um/users/user.type';
import { createUser } from '@/store/features/um/user/userSlice';
import { useRolesList } from '../roles/useRolesList';

export const useCreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess } = useAppToast();
  const { roles } = useRolesList()
  const {
    control,
    handleSubmit,
    getValues, 
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(userSchema, { abortEarly: false }),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      dateOfBirth: undefined,
      status: '',
      roleId: '',
      profilePicture: null,
    },
  });

const onSubmit = async (formData: any) => {
  try {

    const formattedDate =
      formData.dateOfBirth instanceof Date
        ? formData.dateOfBirth.toISOString().split('T')[0]
        : formData.dateOfBirth;
    const selectedRole = roles.find((r) => r.id === formData.roleId);
    const payload: Omit<UserType, 'id'> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      dateOfBirth: formattedDate,
      status: formData.status,
      roleName: selectedRole ? selectedRole.roleName : '',
    };

    console.log('=== Final Payload ===');
    console.log(payload);

    const response = await dispatch(createUser(payload)).unwrap();
    console.log('API Response:', response);
    showSuccess('Create User', 'User created successfully.');
    navigate(USERS_ROUTE);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};


  const submitHandler = handleSubmit(onSubmit);

  return {
    control,
    errors,
    submitHandler,
    isValid,
    touchedFields,
    getValues,
  };

};