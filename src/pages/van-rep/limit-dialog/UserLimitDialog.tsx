import * as React from 'react';
import { CustomDialog } from '@components/dialog/CustomDialog.tsx';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody.tsx';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader.tsx';
import { SelectControl } from '@components/forms/SelectControl.tsx';
import { InputControl } from '@components/forms/InputControl.tsx';
import CalendarControl2 from '@components/forms/CalendarControl2.tsx';
import { Button } from '@components/button/Button.tsx';
import { useForm } from 'react-hook-form';
import { Calendar, DollarSign, Package } from 'lucide-react';

type Option = {
  label: string;
  value: string;
};

type UserLimitDialogProps = {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: any) => void;
  title?: string;
  selectedUser?: any;
};

export const UserLimitDialog: React.FC<UserLimitDialogProps> = ({
  visible,
  onHide,
  onSubmit,
  title = 'Configure User Limit',
  selectedUser,
}) => {
  const [showForm, setShowForm] = React.useState(false);
  
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      limitType: '',
      limitValue: '',
      effectiveFrom: null as Date | null,
      effectiveTo: null as Date | null,
      remarks: '',
    },
  });

  const limitType = watch('limitType');

  const limitTypeOptions: Option[] = [
    { label: 'Order Value Limit', value: 'order_value' },
    { label: 'Order Quantity Limit', value: 'order_quantity' },
    { label: 'Load Value Limit', value: 'load_value' },
    { label: 'Load Quantity Limit', value: 'load_quantity' },
  ];

  // Check if user has existing load limit
  const hasExistingLimit = selectedUser?.loadLimit?.status === 'Assigned';
  const isExpired = selectedUser?.loadLimit?.status === 'Expired';
  const isNotAssigned = selectedUser?.loadLimit?.status === 'Not Assigned';

  // Populate form with existing data when user has assigned limit
  React.useEffect(() => {
    if (hasExistingLimit && selectedUser?.loadLimit) {
      const limit = selectedUser.loadLimit;
      reset({
        limitType: limit.limitType || '',
        limitValue: limit.limitValue?.toString() || '',
        effectiveFrom: limit.effectiveFrom ? new Date(limit.effectiveFrom) : null,
        effectiveTo: limit.effectiveTo ? new Date(limit.effectiveTo) : null,
        remarks: limit.remarks || '',
      });
      setShowForm(true);
    } else if (isExpired || isNotAssigned) {
      setShowForm(false);
    }
  }, [selectedUser, hasExistingLimit, isExpired, isNotAssigned, reset]);

  const handleClose = () => {
    reset();
    setShowForm(false);
    onHide();
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    setShowForm(false);
  };

  const handleAssignLimit = () => {
    setShowForm(true);
  };

  const getLimitValueLabel = () => {
    switch (limitType) {
      case 'order_value':
      case 'load_value':
        return 'Limit Value ($)';
      case 'order_quantity':
      case 'load_quantity':
        return 'Limit Quantity';
      default:
        return 'Limit Value';
    }
  };

  const getLimitValuePlaceholder = () => {
    switch (limitType) {
      case 'order_value':
      case 'load_value':
        return 'Enter maximum value in dollars';
      case 'order_quantity':
      case 'load_quantity':
        return 'Enter maximum quantity';
      default:
        return 'Enter limit value';
    }
  };

  const getLimitValuePrefixIcon = () => {
    switch (limitType) {
      case 'order_value':
      case 'load_value':
        return <DollarSign size={18} />;
      case 'order_quantity':
      case 'load_quantity':
        return <Package size={18} />;
      default:
        return null;
    }
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (selectedUser) {
      return `${selectedUser.name} (${selectedUser.repId})`;
    }
    return 'Selected User';
  };

  // Sample limit history data
  const getSampleLimitHistory = () => {
    if (selectedUser?.repId === 'VR001') {
      return [
        {
          id: 1,
          limitType: 'Order Value Limit',
          limitValue: '$8,000',
          effectiveFrom: '2024-01-01',
          effectiveTo: '2024-03-31',
          status: 'Expired',
          createdBy: 'Admin User',
          createdAt: '2023-12-15',
          remarks: 'Initial limit setting for Q1 2024'
        },
        {
          id: 2,
          limitType: 'Load Quantity Limit',
          limitValue: '50 units',
          effectiveFrom: '2024-04-01',
          effectiveTo: null,
          status: 'Active',
          createdBy: 'Supervisor',
          createdAt: '2024-03-20',
          remarks: 'Updated limit for increased demand'
        },
        {
          id: 3,
          limitType: 'Order Value Limit',
          limitValue: '$12,000',
          effectiveFrom: '2024-06-01',
          effectiveTo: null,
          status: 'Active',
          createdBy: 'Admin User',
          createdAt: '2024-05-25',
          remarks: 'Increased limit for summer season'
        }
      ];
    }
    // Add history for VR002 (Not Assigned) to test the case
    if (selectedUser?.repId === 'VR002') {
      return [
        {
          id: 1,
          limitType: 'Order Value Limit',
          limitValue: '$5,000',
          effectiveFrom: '2023-06-01',
          effectiveTo: '2023-12-31',
          status: 'Expired',
          createdBy: 'Admin User',
          createdAt: '2023-05-20',
          remarks: 'Previous limit that expired'
        }
      ];
    }
    // Add history for VR003 (Expired) to test the case
    if (selectedUser?.repId === 'VR003') {
      return [
        {
          id: 1,
          limitType: 'Load Quantity Limit',
          limitValue: '30 units',
          effectiveFrom: '2024-01-01',
          effectiveTo: '2024-03-31',
          status: 'Expired',
          createdBy: 'Supervisor',
          createdAt: '2023-12-20',
          remarks: 'Q1 2024 limit - expired'
        },
        {
          id: 2,
          limitType: 'Order Value Limit',
          limitValue: '$6,000',
          effectiveFrom: '2023-09-01',
          effectiveTo: '2023-12-31',
          status: 'Expired',
          createdBy: 'Admin User',
          createdAt: '2023-08-25',
          remarks: 'Previous expired limit'
        }
      ];
    }
    return [];
  };

  return (
    <CustomDialog onHide={handleClose} visible={visible} dismissableMask={false}>
      <CustomDialogHeader 
        onHide={handleClose} 
        title={`${title} - ${getUserDisplayName()}`} 
      />
      <CustomDialogBody>
        <div className="space-y-6">
          {/* Show form if user has existing limit or form is manually opened */}
          {showForm ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                {hasExistingLimit ? 'Update Limit Configuration' : 'Configure User Limit'}
              </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SelectControl
                control={control}
                name="limitType"
                label="Limit Type"
                options={limitTypeOptions}
                placeholder="Select limit type"
                required={true}
              />
              
              <InputControl
                control={control}
                name="limitValue"
                label={getLimitValueLabel()}
                placeholder={getLimitValuePlaceholder()}
                type="number"
                required={true}
                prefixIcon={getLimitValuePrefixIcon()}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <CalendarControl2
                name="effectiveFrom"
                control={control}
                label="Effective From"
                prefixIcon={<Calendar size={18} />}
                placeholder="Select start date"
                required={true}
                calendarProps={{
                  dateFormat: 'dd/mm/yy',
                  yearNavigator: true,
                  monthNavigator: true,
                  yearRange: '2020:2030'
                }}
              />
              
              <CalendarControl2
                name="effectiveTo"
                control={control}
                label="Effective To"
                prefixIcon={<Calendar size={18} />}
                placeholder="Select end date (optional)"
                calendarProps={{
                  dateFormat: 'dd/mm/yy',
                  yearNavigator: true,
                  monthNavigator: true,
                  yearRange: '2020:2030'
                }}
              />
            </div>

            <div className="mt-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  {...control.register('remarks')}
                  placeholder="Enter any additional notes or comments"
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 resize-none"
                />
              </div>
            </div>
          </div>
          ) : (
            /* Show message and button when no limit is assigned or expired */
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {isExpired ? 'Load Limit Expired' : 'No Load Limit Assigned'}
                </h3>
                
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {isExpired 
                    ? 'This user\'s load limit has expired. Click below to assign a new limit.'
                    : 'This user doesn\'t have a load limit assigned yet. Click below to configure one.'
                  }
                </p>

                {selectedUser?.loadLimit?.status && (
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 max-w-md mx-auto">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Current Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedUser.loadLimit.status === 'Assigned' 
                            ? 'bg-green-100 text-green-800' 
                            : selectedUser.loadLimit.status === 'Expired'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedUser.loadLimit.status}
                        </span>
                      </div>
                      {selectedUser.loadLimit.limitType && (
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Last Limit Type:</span>
                          <span className="text-gray-800">{selectedUser.loadLimit.limitType}</span>
                        </div>
                      )}
                      {selectedUser.loadLimit.effectiveTo && (
                        <div className="flex justify-between">
                          <span className="font-medium">Expired On:</span>
                          <span className="text-gray-800">{selectedUser.loadLimit.effectiveTo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  type="button"
                  variant="primary"
                  label={isExpired ? 'Assign New Limit' : 'Assign Load Limit'}
                  onClick={handleAssignLimit}
                  className="px-8 py-3"
                />
              </div>
            </div>
          )}

          {/* Limit History Section - Show if user has history data OR has assigned/expired limits */}
          {(getSampleLimitHistory().length > 0 || hasExistingLimit || isExpired) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Limit History
              </h3>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {getSampleLimitHistory().length > 0 ? (
                  <div className="space-y-4">
                    {getSampleLimitHistory().map((limit) => (
                      <div key={limit.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              limit.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {limit.status}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{limit.limitType}</span>
                          </div>
                          <span className="text-lg font-semibold text-blue-600">{limit.limitValue}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Effective From:</span> {limit.effectiveFrom}
                          </div>
                          <div>
                            <span className="font-medium">Effective To:</span> {limit.effectiveTo || 'No end date'}
                          </div>
                          <div>
                            <span className="font-medium">Created By:</span> {limit.createdBy}
                          </div>
                          <div>
                            <span className="font-medium">Created At:</span> {limit.createdAt}
                          </div>
                        </div>
                        
                        {limit.remarks && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <span className="text-sm font-medium text-gray-700">Remarks:</span>
                            <p className="text-sm text-gray-600 mt-1">{limit.remarks}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-sm">No limit history available for this user</p>
                    <p className="text-xs text-gray-400 mt-1">Previous limit configurations will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CustomDialogBody>
      
      <CustomDialogBody>
        <div className="flex flex-row gap-4 justify-end">
          <Button 
            type="button"
            variant="secondary"
            label="Cancel" 
            onClick={handleClose} 
          />
          {showForm && (
            <Button 
              type="button"
              variant="primary"
              label={hasExistingLimit ? 'Update Limit' : 'Save Limit'} 
              onClick={handleSubmit(handleFormSubmit)} 
            />
          )}
        </div>
      </CustomDialogBody>
    </CustomDialog>
  );
};
