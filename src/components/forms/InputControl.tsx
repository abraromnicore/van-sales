import { Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

type TextInputControlProps = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  rules?: any;
};

export const InputControl = (props: TextInputControlProps) => {
  const {
    control,
    name,
    label,
    placeholder = '',
    className = '',
    disabled = false,
    type = 'text',
    rules = {},
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
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <InputText
              id={name}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              placeholder={placeholder}
              type={type}
              className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
              disabled={disabled}
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