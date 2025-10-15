import * as React from 'react';
import { CustomDialog } from '@components/dialog/custom-dialog/CustomDialog.tsx';
import { CustomDialogHeader } from '@components/dialog/custom-dialog/CustomDialogHeader.tsx';
import { CustomDialogBody } from '@components/dialog/custom-dialog/CustomDialogBody.tsx';
import { CustomDialogFooter } from '@components/dialog/custom-dialog/CustomDialogFooter.tsx';
import { Button } from '@components/button/Button';
import { SelectControl } from '@components/forms/SelectControl';
import { useForm } from 'react-hook-form';
import { Eye, Truck, User } from 'lucide-react';
import { VanDetailsModal } from './VanDetailsModal';

interface VanAssignmentDialogProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: { driverName: string; vanId: string }) => void;
  mode: 'assign' | 'update';
  currentDriver?: {
    name: string;
    repId: string;
  };
  currentVan?: {
    vanId: string;
    registrationNumber: string;
  };
}

export const VanAssignmentDialog: React.FC<VanAssignmentDialogProps> = ({
                                                                          visible,
                                                                          onHide,
                                                                          onSubmit,
                                                                          mode,
                                                                          currentDriver,
                                                                          currentVan,
                                                                        }) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      driverName: currentDriver?.name || '',
      vanId: currentVan?.vanId || '',
    },
  });

  const [showVanDetails, setShowVanDetails] = React.useState(false);
  const [selectedVanDetails, setSelectedVanDetails] = React.useState<any>(null);

  // Enhanced van data with brand names and shorter format
  const vanData = {
    'VAN-LHR-01': {
      vanId: 'VAN-LHR-01',
      registrationNumber: 'LES-2024-001',
      brand: 'Toyota',
      model: 'Hiace',
      year: 2024,
      capacity: 300000,
      currentLoad: 150000,
      odometerStart: 45230,
      odometerCurrent: 45300,
      distanceTraveled: 70,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-15',
      status: 'available',
    },
    'VAN-LHR-02': {
      vanId: 'VAN-LHR-02',
      registrationNumber: 'LES-2024-002',
      brand: 'Ford',
      model: 'Transit',
      year: 2024,
      capacity: 350000,
      currentLoad: 200000,
      odometerStart: 45250,
      odometerCurrent: 45320,
      distanceTraveled: 90,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-10',
      status: 'in_use',
    },
    'VAN-LHR-03': {
      vanId: 'VAN-LHR-03',
      registrationNumber: 'LES-2024-003',
      brand: 'Mercedes',
      model: 'Sprinter',
      year: 2024,
      capacity: 280000,
      currentLoad: 120000,
      odometerStart: 45180,
      odometerCurrent: 45250,
      distanceTraveled: 45,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-20',
      status: 'available',
    },
    'VAN-LHR-04': {
      vanId: 'VAN-LHR-04',
      registrationNumber: 'LES-2024-004',
      brand: 'Nissan',
      model: 'NV200',
      year: 2024,
      capacity: 320000,
      currentLoad: 180000,
      odometerStart: 45300,
      odometerCurrent: 45380,
      distanceTraveled: 110,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-05',
      status: 'available',
    },
    'VAN-LHR-05': {
      vanId: 'VAN-LHR-05',
      registrationNumber: 'LES-2024-005',
      brand: 'Isuzu',
      model: 'NPR',
      year: 2024,
      capacity: 290000,
      currentLoad: 140000,
      odometerStart: 45200,
      odometerCurrent: 45270,
      distanceTraveled: 60,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-18',
      status: 'maintenance',
    },
    'VAN-LHR-06': {
      vanId: 'VAN-LHR-06',
      registrationNumber: 'LES-2024-006',
      brand: 'Hyundai',
      model: 'H350',
      year: 2024,
      capacity: 310000,
      currentLoad: 160000,
      odometerStart: 45260,
      odometerCurrent: 45340,
      distanceTraveled: 85,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-12',
      status: 'available',
    },
    'VAN-LHR-07': {
      vanId: 'VAN-LHR-07',
      registrationNumber: 'LES-2024-007',
      brand: 'Mitsubishi',
      model: 'L300',
      year: 2024,
      capacity: 270000,
      currentLoad: 100000,
      odometerStart: 45150,
      odometerCurrent: 45220,
      distanceTraveled: 35,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-25',
      status: 'available',
    },
    'VAN-LHR-08': {
      vanId: 'VAN-LHR-08',
      registrationNumber: 'LES-2024-008',
      brand: 'Volkswagen',
      model: 'Crafter',
      year: 2024,
      capacity: 330000,
      currentLoad: 220000,
      odometerStart: 45320,
      odometerCurrent: 45400,
      distanceTraveled: 125,
      fuelType: 'Diesel',
      lastServiceDate: '2024-09-08',
      status: 'in_use',
    },
  };

  // Create dropdown options with shorter format
  const availableVans = Object.values(vanData).map(van => ({
    value: van.vanId,
    label: `${van.brand} ${van.model} #${van.vanId.split('-')[2]}`,
  }));

  const handleFormSubmit = (data: { driverName: string; vanId: string }) => {
    onSubmit(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    onHide();
  };

  const handleViewVanDetails = () => {
    const selectedVanId = watch('vanId');
    if (selectedVanId && vanData[selectedVanId as keyof typeof vanData]) {
      setSelectedVanDetails(vanData[selectedVanId as keyof typeof vanData]);
      setShowVanDetails(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600';
      case 'in_use':
        return 'text-yellow-600';
      case 'maintenance':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <CustomDialog
      visible={visible}
      onHide={onHide}
      size="md"
    >
      <CustomDialogHeader
        onHide={onHide}
        title={mode === 'assign' ? 'Assign Van to Driver' : 'Update Van Assignment'}></CustomDialogHeader>

      <CustomDialogBody>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Driver Information */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Driver Information
            </label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {currentDriver?.name || 'Driver Name'}
                </p>
                <p className="text-sm text-gray-500">
                  {currentDriver?.repId || 'Rep ID'}
                </p>
              </div>
            </div>
          </div>

          {/* Van Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {mode === 'assign' ? 'Select Van' : 'Update Van'}
              </label>
              <Button
                type="button"
                variant="outline"
                icon={<Eye className="w-4 h-4" />}
                onClick={handleViewVanDetails}
                label="View Details"
                disabled={!watch('vanId')}
              />
            </div>
            <SelectControl
              control={control}
              name="vanId"
              label=""
              placeholder={`${mode === 'assign' ? 'Select a van' : 'Choose new van'}...`}
              options={availableVans}
              disabled={false}
              className="py-2"
            />
            {watch('vanId') && vanData[watch('vanId') as keyof typeof vanData] && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {vanData[watch('vanId') as keyof typeof vanData].brand} {vanData[watch('vanId') as keyof typeof vanData].model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {vanData[watch('vanId') as keyof typeof vanData].registrationNumber}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium ${getStatusColor(vanData[watch('vanId') as keyof typeof vanData].status)}`}>
                    {vanData[watch('vanId') as keyof typeof vanData].status.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Current Assignment Info (for update mode) */}
          {mode === 'update' && currentVan && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Current Assignment
              </label>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {currentVan.vanId}
                  </p>
                  <p className="text-sm text-gray-500">
                    {currentVan.registrationNumber}
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </CustomDialogBody>

      <CustomDialogFooter>
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            label="Cancel"
          />
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit(handleFormSubmit)}
            label={mode === 'assign' ? 'Assign Van' : 'Update Van'}
          />
        </div>
      </CustomDialogFooter>

      {/* Van Details Modal */}
      {selectedVanDetails && (
        <VanDetailsModal
          visible={showVanDetails}
          onHide={() => setShowVanDetails(false)}
          vanDetails={selectedVanDetails}
        />
      )}
    </CustomDialog>
  );
};