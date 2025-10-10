import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { useNavigate } from 'react-router-dom';
import { useViewUser } from '@hooks/um/users/useViewUser';
import { ViewUserForm } from '@/forms/um/users/ViewUserForm';
import { Button } from '@components/button/Button.tsx';

export const ViewUserPage = () => {
  useMetadata({
    pageTitle: 'View User',
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
        label: 'View',
        route: '',
        active: true,
      },
    ],
  });
  
  const navigate = useNavigate();
  
  const { 
    userToView, 
    userRole, 
    isLoading 
  } = useViewUser();

  // Show loading state if user or roles are not loaded
  if (isLoading || !userToView) {
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
                View User: {userToView.firstName} {userToView.lastName}
              </h1>
              <p className="text-gray-600">View user information and account details</p>
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

        {/* View User Form */}
        <ViewUserForm 
          userToView={userToView}
          userRole={userRole}
        />
      </div>
    </PageLayout>
  );
};