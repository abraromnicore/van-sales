import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

type SelectControlProps = {
  control: any;
  name: string;
  label: string;
  optionLabel: string;
  optionValue: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  options: any[];
}

export const SelectControl = (props: SelectControlProps) => {
  const {
    control,
    name,
    label,
    options,
    placeholder = 'Select an option',
    className = '',
    disabled = false,
  } = props;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="font-medium text-sm text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Dropdown
              id={name}
              value={field.value}
              options={options}
              onChange={(e) => field.onChange(e.value)}
              placeholder={placeholder}
              className={fieldState.error ? 'p-invalid w-full' : 'w-full'}
              disabled={disabled}
              showClear
            />
            {fieldState.error && (
              <small className="p-error text-xs">
                {fieldState.error.message}
              </small>
            )}
          </>
        )}
      />
    </div>
  );
};