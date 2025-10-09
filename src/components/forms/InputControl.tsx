import { Controller } from 'react-hook-form';

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
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <input
              id={name}
              type={type}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 ${
                fieldState.error
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500 p-invalid'
                  : 'border-gray-300'
              }`}
            />

            {fieldState.error && (
              <p className="text-xs text-red-500 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};