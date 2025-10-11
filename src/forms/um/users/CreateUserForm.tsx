import { useAppToast } from '@hooks/common/useAppToast.ts';
import { confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';
import { USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { Button } from '@components/button/Button.tsx';
import { InputControl } from '@components/forms/InputControl.tsx';
import { SelectControl } from '@components/forms/SelectControl.tsx';
import { CalendarControl } from '@components/forms/CalendarControl.tsx';
import { PasswordControl } from '@components/forms/PasswordControl.tsx';
import { ProfilePictureControl } from '@components/forms/ProfilePictureControl.tsx';
import { mapRolesToSelectOptions } from '@utils/utils';

type UserFormProps = {
  control: any;
  submitHandler: (e: any) => void;
  isValid?: boolean;
  getValues?: any;
  errors?: any;
  roles?: any[];
  rolesLoading?: boolean;
  mode?: 'create' | 'update';
  isLoading?: boolean;
}

export const UserForm = (props: UserFormProps) => {
  const navigate = useNavigate();
  const { 
    control, 
    submitHandler, 
    isValid, 
    roles = [], 
    rolesLoading = false,
    mode = 'create',
    isLoading = false
  } = props;
  const { showError } = useAppToast();
  
  const roleOptions = mapRolesToSelectOptions(roles);
  const onSubmit = (e: any) => {
    if (!isValid) {
      const action = mode === 'create' ? 'Create' : 'Update';
      showError(`${action} User`, 'Please fill in all required fields correctly');
      return;
    }
    submitHandler(e);
  };

  const acceptClose = () => {
    navigate(USERS_ROUTE);
  };

  const confirmCancel = () => {
    confirmDialog({
      message: 'Your Changes will be lost.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: acceptClose,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {mode === 'create'  && <div className="mb-4">
        <p className="text-gray-600">Fill in the details below to create a new user account.</p>
      </div>}

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
          Personal Information
        </h3>
        
        <div className="mb-6">
          <ProfilePictureControl
            control={control}
            name="profilePicture"
            label="Profile Picture"
            mode={mode}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputControl
            control={control}
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
            required={true}
          />
          <InputControl
            control={control}
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
            required={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <InputControl
            control={control}
            name="username"
            label="Username"
            placeholder="Enter username"
            required={true}
          />
          <InputControl
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter email address"
            required={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <PasswordControl
            control={control}
            name="password"
            label="Password"
            placeholder="Enter password"
            required={true}
          />
          <PasswordControl
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            required={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <SelectControl
            control={control}
            name="gender"
            label="Gender"
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' }
            ]}
            placeholder="Select gender"
            required={true}
          />
          <CalendarControl
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="Select date of birth"
            maxDate={new Date()}
            yearRange="1900:2024"
            required={true}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          Account Information
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelectControl
            control={control}
            name="status"
            label="Account Status"
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Pending', value: 'pending' }
            ]}
            placeholder="Select status"
            required={true}
          />
          <SelectControl
            control={control}
            name="roleId"
            label="User Role"
            options={roleOptions}
            placeholder={rolesLoading ? "Loading roles..." : "Select role"}
            disabled={rolesLoading}
            required={true}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-200">
        <Button 
          type={'button'}
          variant={'secondary'}
          label={'Cancel'}
          onClick={confirmCancel}
          className="w-full sm:w-auto"
        />
        <Button 
          type={'button'}
          variant={'primary'}
          label={mode === 'create' ? 'Create User' : 'Update User'}
          onClick={onSubmit}
          disabled={isLoading || rolesLoading}
          className="w-full sm:w-auto"
        />
      </div>

      {(isLoading || rolesLoading) && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-700">
              {rolesLoading ? 'Loading roles...' : 'Processing...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};