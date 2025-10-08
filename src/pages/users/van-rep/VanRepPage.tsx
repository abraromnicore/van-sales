import * as React from 'react';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable.tsx';
import { CustomDialog } from '@components/dialog/CustomDialog.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { DialogHeader } from '@components/dialog/DialogHeader.tsx';
import { DialogBody } from '@components/dialog/DialogBody.tsx';
import { useDriversList } from '@hooks/drivers/useDriversList.ts';
import InputControl from '@components/forms/InputControl.tsx';
import { useForm } from 'react-hook-form';
import SubmitButton from '@components/ui/SubmitButton';
import { DialogFooter } from '@components/dialog/DialogFooter.tsx';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Plus } from 'lucide-react';

export const VanRepPage = () => {
  const { drivers } = useDriversList(true);
  const [showCreateUser, setShowCreateUser] = React.useState(false);
  const [showEditUser, setShowEditUser] = React.useState(false);
  const [showUserDetails, setShowUserDetails] = React.useState(false);
  const tieredMenu: MenuItem[] = [
    {
      label: 'View',
      icon: <Eye />,
      command: () => onView(),
    },
    {
      label: 'Create',
      icon: <Plus />,
      command: () => onCreate(),
    },
    {
      label: 'Edit',
      icon: <Pencil />,
      command: () => onEdit(),
    },
  ];
  const columns: ColumMeta[] = [
    {
      field: 'driverId',
      header: 'Driver ID',
    },
    {
      field: 'firstName',
      header: 'First Name',
    },
    {
      field: 'lastName',
      header: 'Last Name',
    },
    {
      field: 'dateOfBirth',
      header: 'Date of Birth',
    },
    {
      field: 'gender',
      header: 'Gender',
    },
  ];

  const onCreate = () => {
    setShowCreateUser(true);
  };
  const onEdit = () => {
    setShowEditUser(true);
  };
  const onView = () => {
    setShowUserDetails(true);
  };

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrUsername: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      status: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <CustomTable columns={columns} data={drivers} menuModel={tieredMenu} />
      <CustomDialog
        onHide={() => setShowCreateUser(false)}
        visible={showCreateUser}
      >
        <DialogHeader
          onHide={() => setShowCreateUser(false)}
          title={'Create Driver'}
        />
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputControl
                  label="First Name"
                  name="firstName"
                  placeholder="Enter first name"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
                <InputControl
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
                <InputControl
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputControl
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton
                isSubmitting={false}
                isEditMode={false}
                disabled={false}
              />
            </div>
          </form>
        </DialogBody>
      </CustomDialog>

      <CustomDialog onHide={() => setShowEditUser(false)} visible={showEditUser}>
        <DialogHeader
          onHide={() => setShowEditUser(false)}
          title={'Edit Driver'}
        />
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                Edit Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputControl
                  label="First Name"
                  name="firstName"
                  placeholder="Enter first name"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
                <InputControl
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
                <InputControl
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
                {/*<SelectDropdown
                  label="Gender"
                  name="gender"
                  control={control}
                  errors={errors}
                  options={genderOptions}
                  isDisabled={false}
                />*/}
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                Edit Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputControl
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  register={register}
                  errors={errors}
                  isDisabled={false}
                />
                {/*<SelectDropdown
                  label="Account Status"
                  name="status"
                  control={control}
                  errors={errors}
                  options={statusOptions}
                />*/}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton
                isSubmitting={false}
                isEditMode={false}
                disabled={false}
              />
            </div>
          </form>
        </DialogBody>
      </CustomDialog>

      <CustomDialog
        onHide={() => setShowUserDetails(false)}
        visible={showUserDetails}
      >
        <DialogHeader
          onHide={() => setShowUserDetails(false)}
          title={'Driver Details'}
        />
        <DialogBody>
          <div className="p-6 flex flex-col items-center">
            {/* Profile Picture */}
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=John%2BDoe"
              alt="John Doe"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
            />

            {/* Name */}
            <h2 className="mt-4 text-2xl font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">
              Driver ID: <span className="font-medium">DLB001</span>
            </p>

            {/* Divider */}
            <div className="w-full border-t border-gray-200 my-4"></div>

            {/* Details */}
            <div className="space-y-3 text-sm w-full">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Date of Birth</span>
                <span className="text-gray-800">2005-05-12</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Gender</span>
                <span className="text-gray-800">Male</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email</span>
                <span className="text-gray-800">john.doe@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Status</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                  Inactive
                </span>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Link
            to={'/'}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Details
          </Link>
          <span className="text-neutral-500 dark:text-neutral-400">
            Secondary text
          </span>
        </DialogFooter>
      </CustomDialog>

      {/* <DialogCard
        onHide={() => setShowCreateUser(false)}
        visible={showCreateUser}
      >
        <DialogHeader
          onHide={() => setShowCreateUser(false)}
          title={'Create Driver'}
        />
        <CardBody>
          <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            et iure quos similique sit. Animi blanditiis eius mollitia obcaecati
            saepe.
          </p>
        </CardBody>
        <CardFooter>
          <Link
            to={'/'}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Details
          </Link>
          <span className="text-neutral-500 dark:text-neutral-400">
            Secondary text
          </span>
        </CardFooter>
      </DialogCard> */}
    </>
  );
};