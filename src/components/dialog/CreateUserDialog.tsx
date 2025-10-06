import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog';
import { Pencil } from 'lucide-react';

import InputField from '../forms/InputField';
import ActionButton from '../ui/ActionButton';
import SubmitButton from '../ui/SubmitButton';
import SelectDropdown from '../forms/SelectDropdown';

// Import TanStack Query mutations
import { 
  useCreateUserMutation, 
  useUpdateUserMutation,
  getNextId 
} from '../../api/users/mutations';

// Types
export interface User {
  _id: string;
  email: string;
  status: 'active' | 'inactive';
}

export interface Driver {
    _id: string;
    id: string;
  driverId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  profilePic: {
    url: string;
  };
  userId: User;
}

export interface Loader {
  _id: string;
  id: string;
  loaderId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  profilePic: {
    url: string;
  };
  userId: User;
}

export type UserData = Driver | Loader;

export function formatDateToYYYYMMDD(dateInput: string | number | Date | undefined): string | null {
  if (!dateInput) return null;

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

interface CreateUserDialogProps {
  user?: UserData | null;
  onSuccess?: () => void;
  onClose?: () => void;
  isView?: boolean;
  setIsView?: (value: boolean) => void;
  userType: 'driver' | 'loader';
}

// Validation Schema
const userSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test('age', 'User must be at least 16 years old', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 16;
      }
      return age >= 16;
    }),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female'] as const, 'Please select a valid gender'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['active', 'inactive'] as const, 'Please select a valid status'),
});

type FormData = yup.InferType<typeof userSchema>;

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  user = null,
  onSuccess,
  onClose,
  isView = false,
  setIsView,
  userType,
}) => {
  const isEditMode = !!user;
  const [isOpen, setIsOpen] = useState(isEditMode ? true : false);

  // TanStack Query mutations
  const createUserMutation = useCreateUserMutation(userType);
  const updateUserMutation = useUpdateUserMutation(userType);

  // Check if any mutation is loading
  const isSubmitting = createUserMutation.isPending || updateUserMutation.isPending;
  
  // Get error from active mutation
  const serverError = createUserMutation.error?.message || updateUserMutation.error?.message || '';

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      dateOfBirth: formatDateToYYYYMMDD(user?.dateOfBirth) || '',
      gender: user?.gender || ('male' as const),
      email: user?.userId?.email || '',
      status: user?.userId?.status || 'active',
    },
    mode: 'onChange',
  });

  const resetForm = () => {
    reset();
    // Reset mutation errors
    createUserMutation.reset();
    updateUserMutation.reset();
  };

  // Options
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  // Generate user ID based on type
  const generateUserId = (firstName: string, lastName: string): string => {
    const prefix = userType === 'driver' ? 'DRV' : 'LDR';
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}${timestamp}`;
  };

  // Generate profile picture URL
  const generateProfilePicUrl = (firstName: string, lastName: string): string => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firstName + '+' + lastName)}`;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let userPayload: any;

      if (isEditMode) {
        // For updates, use existing IDs
        userPayload = {
          _id: user._id,
          ...(userType === 'driver' && {
            driverId: (user as Driver).driverId,
          }),
          ...(userType === 'loader' && {
            loaderId: (user as Loader).loaderId,
          }),
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          profilePic: {
            url: generateProfilePicUrl(data.firstName, data.lastName),
          },
          userId: {
            _id: user.userId._id,
            email: data.email,
            status: data.status,
          },
        };

        await updateUserMutation.mutateAsync({ 
          id: user.id, 
          userData: userPayload 
        });
      } else {
        // For new users, generate new IDs
        const nextId = await getNextId(userType);
        const nextUserId = `user${Date.now()}`;
        
        userPayload = {
          _id: nextId,
          ...(userType === 'driver' && {
            driverId: generateUserId(data.firstName, data.lastName),
          }),
          ...(userType === 'loader' && {
            loaderId: generateUserId(data.firstName, data.lastName),
          }),
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          profilePic: {
            url: generateProfilePicUrl(data.firstName, data.lastName),
          },
          userId: {
            _id: nextUserId,
            email: data.email,
            status: data.status,
          },
        };

        await createUserMutation.mutateAsync(userPayload);
      }

      console.log("userPayload", userPayload);

      // Success - show success message (uncomment if you have toast)
      // toast({
      //   title: `${userType.charAt(0).toUpperCase() + userType.slice(1)} ${isEditMode ? 'Updated' : 'Created'} Successfully`,
      //   description: `${data.firstName} ${data.lastName} has been ${isEditMode ? 'updated' : 'added'} successfully.`,
      // });
      
      if (onSuccess) {
        onSuccess();
      }
      setIsOpen(false);
      resetForm();
      
    } catch (error: any) {
      // Error is handled by TanStack Query and displayed through serverError
      console.error('Error:', error.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetForm();
          onClose?.();
        }
      }}
    >
      <DialogTrigger asChild>
        <ActionButton
          isEditMode={isEditMode}
          onClick={() => setIsOpen(true)}
          label={userType.charAt(0).toUpperCase() + userType.slice(1)}
        />
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl bg-white text-black p-6 rounded-4xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-2xl pt-3 font-bold text-gray-600 text-center mb-4">
          {isEditMode 
            ? `Update ${userType.charAt(0).toUpperCase() + userType.slice(1)}` 
            : `Create ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
          <DialogDescription />
        </DialogTitle>
        
        {isView && (
          <div className="w-full flex flex-end justify-end mb-4">
            <button onClick={() => setIsView?.(false)}>
              <Pencil className="w-4 h-4 text-gray-500 mr-2" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                register={register}
                errors={errors}
                isDisabled={isView}
              />
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                register={register}
                errors={errors}
                isDisabled={isView}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                register={register}
                errors={errors}
                isDisabled={isView}
              />
              <SelectDropdown
                label="Gender"
                name="gender"
                control={control}
                errors={errors}
                options={genderOptions}
                isDisabled={isView}
              />
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter email address"
                register={register}
                errors={errors}
                isDisabled={isView}
              />
              <SelectDropdown
                label="Account Status"
                name="status"
                control={control}
                errors={errors}
                options={statusOptions}
              />
            </div>
          </div>

          {serverError && (
            <p className="text-red-500 mt-2 px-2 text-sm">{serverError}</p>
          )}

          <div className="flex justify-end pt-4">
            <SubmitButton
              isSubmitting={isSubmitting}
              isEditMode={isEditMode}
              disabled={isView}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;