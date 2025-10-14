import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

type SelectControlProps = {
  control: any;
  name: string;
  label?: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  options: any[];
  required?: boolean;
}

export const SelectControl = (props: SelectControlProps) => {
  const {
    control,
    name,
    label,
    optionLabel = 'label',
    optionValue = 'value',
    options,
    placeholder = 'Select an option',
    className = '',
    disabled = false,
    required = false,
  } = props;

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <style dangerouslySetInnerHTML={{
              __html: `
                #${name} .p-dropdown-clear-icon {
                  margin-right: 0.5rem !important;
                }
                #${name} .p-dropdown-trigger {
                  margin-left: 0.5rem !important;
                }z
              `
            }} />
            <Dropdown
              id={name}
              value={field.value}
              options={options}
              optionLabel={optionLabel}
              optionValue={optionValue}
              onChange={(e) => field.onChange(e.value)}
              placeholder={placeholder}
              className={`w-full ${fieldState.error ? 'border-red-300' : 'border-gray-300'} rounded-lg border px-4`}
              disabled={disabled}
              showClear
              panelClassName="rounded-lg border border-gray-200 shadow-lg"
            />
            {fieldState.error && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <small className="text-xs text-red-600 font-medium">
                  {fieldState.error.message}
                </small>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};