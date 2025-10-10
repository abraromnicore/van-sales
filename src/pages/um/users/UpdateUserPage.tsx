import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '@/forms/um/users/CreateUserForm';
import { useUpdateUser } from '@hooks/um/users/useUpdateUser';
import { useRolesList } from '@hooks/um/roles/useRolesList';
import { Button } from '@components/button/Button.tsx';

export const UpdateUserPage = () => {
  useMetadata({
    pageTitle: 'Update User',
    breadcrumbs: [
      {
        label: 'Dashboard',
        route: DASHBOARD_ROUTE,
      },
      {
        label: 'User Management',
        route: '',
      },
      {
        label: 'Users',
        route: USERS_ROUTE,
      },
      {
        label: 'Update',
        route: '',
        active: true,
      },
    ],
  });
  
  const navigate = useNavigate();
  
  const { 
    control, 
    submitHandler, 
    isValid, 
    errors, 
    getValues, 
    userToUpdate, 
    isLoading 
  } = useUpdateUser();
  
  const { roles, loading: rolesLoading } = useRolesList();

  // Show loading state if user or roles are not loaded
  if (isLoading || !userToUpdate) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading user data...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Update User: {userToUpdate.firstName} {userToUpdate.lastName}
              </h1>
              <p className="text-gray-600">Edit user information and account details</p>
            </div>
            <Button
              type="button"
              variant="secondary"
              label="Back to Users"
              onClick={() => navigate(USERS_ROUTE)}
              className="px-4 py-2"
            />
          </div>
        </div>

        {/* User Form */}
        <UserForm 
          control={control} 
          submitHandler={submitHandler} 
          isValid={isValid} 
          getValues={getValues} 
          errors={errors}
          roles={roles}
          rolesLoading={rolesLoading}
          mode="update"
          isLoading={isLoading}
        />
      </div>
    </PageLayout>
  );
};