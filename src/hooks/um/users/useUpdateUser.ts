import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/store/hooks.ts';
import { USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import type { UserType } from '@/types/um/users/user.type';
import { updateUser } from '@/store/features/um/user/userSlice';
import { useRolesList } from '../roles/useRolesList';
import { useUsersList } from './useUsersList';
import { useEffect } from 'react';
import { createUserSchema } from '@/schemas/um/users/user.schema.ts';

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess } = useAppToast();
  const { roles } = useRolesList();
  const { users } = useUsersList(true);
  const { id } = useParams<{ id: string }>();

  const userToUpdate = users.find(user => user.id === id);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(createUserSchema, { abortEarly: false }),
    mode: 'onChange',
        defaultValues: {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          gender: undefined,
          dateOfBirth: undefined,
          status: undefined,
          roleId: '',
          profilePicture: null,
        },
  });

  useEffect(() => {
    if (userToUpdate && roles.length > 0) {
      const userRole = roles.find(role => role.roleName === userToUpdate.roleName);
      
      console.log('=== Role Mapping Debug ===');
      console.log('User to update:', userToUpdate);
      console.log('User role name:', userToUpdate.roleName);
      console.log('Available roles:', roles);
      console.log('Found user role:', userRole);
      console.log('Role ID to set:', userRole?.id);
      console.log('========================');
      
          reset({
            firstName: userToUpdate.firstName,
            lastName: userToUpdate.lastName,
            username: userToUpdate.username,
            email: userToUpdate.email,
            gender: userToUpdate.gender as 'male' | 'female' | 'other',
            dateOfBirth: userToUpdate.dateOfBirth ? new Date(userToUpdate.dateOfBirth) : undefined,
            status: userToUpdate.status as 'active' | 'inactive' | 'pending',
            roleId: userRole?.id || '',
            profilePicture: userToUpdate.profilePicture || null,
          });
    }
  }, [userToUpdate, roles, reset]);

  const onSubmit = async (formData: any) => {
    if (!userToUpdate) {
      console.error('User not found');
      return;
    }

    try {
      const formattedDate =
        formData.dateOfBirth instanceof Date
          ? formData.dateOfBirth.toISOString().split('T')[0]
          : formData.dateOfBirth;

      const selectedRole = roles.find((r) => r.id === formData.roleId);

      const payload: UserType = {
        id: userToUpdate.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: userToUpdate.password, // Keep existing password
        gender: formData.gender,
        dateOfBirth: formattedDate,
        status: formData.status,
        roleName: selectedRole ? selectedRole.roleName : '',
      };

      console.log('=== Update Payload ===');
      console.log(payload);

      const response = await dispatch(updateUser(payload)).unwrap();
      console.log('API Response:', response);

      showSuccess('Update User', 'User updated successfully.');
      navigate(USERS_ROUTE);
    } catch (error) {
      console.error('Error updating user:', error);
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
    userToUpdate,
    isLoading: !userToUpdate || roles.length === 0,
  };
};