import * as React from 'react';
import { CustomDialog } from '@components/dialog/CustomDialog.tsx';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody.tsx';
import { CustomDialogHeader } from '@components/dialog/CustomDialogHeader.tsx';
import { SelectControl } from '@components/forms/SelectControl.tsx';
import { Button } from '@components/button/Button.tsx';
import { useForm } from 'react-hook-form';
import MapView from '@components/MapView.tsx';

type Option = {
  label: string;
  value: string;
};

type TerritoryChangeDialogProps = {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: { country: string; city: string; area: string }) => void;
  title?: string;
  countries?: Option[];
  cities?: Option[];
  areas?: Option[];
  showMap?: boolean;
  mapContent?: React.ReactNode;
};

const DEFAULT_COUNTRIES: Option[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
];

const DEFAULT_CITIES: Option[] = [
  { label: 'New York', value: 'ny' },
  { label: 'Los Angeles', value: 'la' },
  { label: 'Chicago', value: 'chi' },
  { label: 'Houston', value: 'hou' },
];

const DEFAULT_AREAS: Option[] = [
  { label: 'Territory A — Northeast Metro', value: 'territory-a' },
  { label: 'Territory B — Central Plains', value: 'territory-b' },
  { label: 'Territory C — Western Coastal', value: 'territory-c' },
  { label: 'Territory D — Southern Gulf', value: 'territory-d' },
];

export const TerritoryChangeDialog: React.FC<TerritoryChangeDialogProps> = ({ visible,onHide, onSubmit, title = 'Change Territory', countries = DEFAULT_COUNTRIES, cities = DEFAULT_CITIES, areas = DEFAULT_AREAS, showMap = true,
                                                                            }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      country: '',
      city: '',
      area: '',
    },
  });

  const handleClose = () => {
    reset();
    onHide();
  };

  const handleFormSubmit = (data: { country: string; city: string; area: string }) => {
    onSubmit(data);
    reset();
  };

  return (
    <CustomDialog size="xl" onHide={handleClose} visible={visible} dismissableMask={false}>
      <CustomDialogHeader onHide={handleClose} title={title} />
      <CustomDialogBody>
        <div>
          {/* Three Select Controls in a Row with Visual Connectors */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-end gap-4">
            <div className="min-w-[300px]">
              <SelectControl
                className={`max-w-[300px]`}
                control={control}
                name="country"
                label="Country"
                options={countries}
                placeholder="Select country"
                required={true}
              />
            </div>

            {/* Arrow Connector */}
            <div className="flex items-center pb-3">
              <div className="text-gray-400 text-xl font-bold">→</div>
            </div>

            <div className="min-w-[300px]">
              <SelectControl
                className={`max-w-[300px]`}
                control={control}
                name="city"
                label="City"
                options={cities}
                placeholder="Select city"
                required={true}
              />
            </div>

            {/* Arrow Connector */}
            <div className="flex items-center pb-3">
              <div className="text-gray-400 text-xl font-bold">→</div>
            </div>

            <div className="min-w-[300px]">
              <SelectControl
                className={`max-w-[300px]`}
                control={control}
                name="area"
                label="Area"
                options={areas}
                placeholder="Select area"
                required={true}
              />
            </div>
          </div>

          {/* Map View */}
          {showMap && (
            <div className="mt-6">
              <MapView title="Select Territory Point" />
            </div>
          )}
        </div>
      </CustomDialogBody>
      <CustomDialogBody>
        <div className="flex flex-row gap-4">
          <Button label="Close" onClick={handleClose} />
          <Button label="Submit" onClick={handleSubmit(handleFormSubmit)} />
        </div>
      </CustomDialogBody>
    </CustomDialog>
  );
};