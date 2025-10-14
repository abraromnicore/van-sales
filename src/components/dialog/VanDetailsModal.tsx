import * as React from 'react';
import { CustomDialog } from '@components/dialog/CustomDialog';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody';
import { CustomDialogFooter } from '@components/dialog/CustomDialogFooter';
import { Button } from '@components/button/Button';
import { Truck, Package2, Gauge, MapPin, Calendar } from 'lucide-react';

interface VanDetailsModalProps {
  visible: boolean;
  onHide: () => void;
  vanDetails: {
    vanId: string;
    registrationNumber: string;
    brand: string;
    model: string;
    year: number;
    capacity: number;
    currentLoad: number;
    odometerStart: number;
    odometerCurrent: number;
    distanceTraveled: number;
    fuelType: string;
    lastServiceDate: string;
    status: string;
  };
}

export const VanDetailsModal: React.FC<VanDetailsModalProps> = ({
  visible,
  onHide,
  vanDetails,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_use':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <CustomDialog
      visible={visible}
      onHide={onHide}
      size="lg"
    >
      <CustomDialogHeader>
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Van Details - {vanDetails.vanId}
          </h3>
        </div>
      </CustomDialogHeader>

      <CustomDialogBody>
        <div className="space-y-6">
          {/* Van Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {vanDetails.brand} {vanDetails.model}
              </h2>
              <p className="text-gray-600">{vanDetails.year} • {vanDetails.registrationNumber}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(vanDetails.status)}`}>
                  {formatStatus(vanDetails.status)}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {vanDetails.fuelType}
                </span>
              </div>
            </div>
          </div>

          {/* Van Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capacity & Load */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package2 className="w-5 h-5 text-gray-600" />
                Capacity & Load
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Capacity</span>
                  <span className="font-semibold">{vanDetails.capacity.toLocaleString()} units</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Current Load</span>
                  <span className="font-semibold">{vanDetails.currentLoad.toLocaleString()} units</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Load Percentage</span>
                  <span className="font-semibold">
                    {((vanDetails.currentLoad / vanDetails.capacity) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Odometer & Distance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-gray-600" />
                Odometer & Distance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Start Reading</span>
                  <span className="font-semibold">{vanDetails.odometerStart.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Current Reading</span>
                  <span className="font-semibold">{vanDetails.odometerCurrent.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Distance Traveled</span>
                  <span className="font-semibold text-green-600">{vanDetails.distanceTraveled} km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Last Service</span>
                <span className="font-semibold">{vanDetails.lastServiceDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Fuel Type</span>
                <span className="font-semibold">{vanDetails.fuelType}</span>
              </div>
            </div>
          </div>
        </div>
      </CustomDialogBody>

      <CustomDialogFooter>
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={onHide}
            label="Close"
          />
        </div>
      </CustomDialogFooter>
    </CustomDialog>
  );
};
