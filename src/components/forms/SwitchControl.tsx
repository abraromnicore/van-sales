import { Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';

type SwitchControlProps = {
  control?: any; // made optional
  name: string;
  value?: boolean; // used for view-only mode
  label?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean; // explicit read-only flag
};

export const SwitchControl = (props: SwitchControlProps) => {
  const {
    control,
    name,
    label,
    value = false,
    className = '',
    disabled = false,
    readOnly = false,
  } = props;

  const commonClasses = `transition ${className} ${
    readOnly ? 'pointer-events-none opacity-100' : ''
  }`;

  // ✅ If no control provided → render static (view) mode
  if (!control) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="font-medium text-sm text-gray-700"
          >
            {label}
          </label>
        )}
        <InputSwitch
          id={name}
          checked={!!value}
          disabled={true}
          className={commonClasses}
        />
      </div>
    );
  }

  // ✅ If control exists → use react-hook-form
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-sm text-gray-700"
        >
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
              disabled={disabled || readOnly}
              className={`${commonClasses} ${
                fieldState.error ? 'p-invalid' : ''
              }`}
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