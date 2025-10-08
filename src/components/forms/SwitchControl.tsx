import { Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';

type SwitchControlProps = {
  control: any;
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export const SwitchControl = (props: SwitchControlProps) => {
  const {
    control,
    name,
    label,
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
            <InputSwitch
              id={name}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.value)}
              disabled={disabled}
              className={fieldState.error ? 'p-invalid' : ''}
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