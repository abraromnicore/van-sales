import type { UserType } from '@/types/um/users/user.type';
import type { RoleType } from '@/types/um/roles/role.type';
import { ProfilePictureControl } from '@components/forms/ProfilePictureControl.tsx';
import { useState } from 'react';

type ViewUserFormProps = {
  userToView: UserType;
  userRole: RoleType | any;
}

export const ViewUserForm = (props: ViewUserFormProps) => {
  const { userToView, userRole } = props;

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Personal Information
            </h3>

            <div className="mb-6">
              <ProfilePictureControl
                control={null}
                name="profilePicture"
                label="Profile Picture"
                mode="view"
                currentImage={userToView.profilePicture || null}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {userToView.firstName}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {userToView.lastName}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {userToView.username}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {userToView.email}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {formatGender(userToView.gender)}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {formatDate(userToView.dateOfBirth)}
                </div>
              </div>
            </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          Account Information
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Account Status</label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                userToView.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : userToView.status === 'inactive'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {formatStatus(userToView.status)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">User Role</label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
              {userRole?.roleName || userToView.roleName}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};