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
  required?: boolean;
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
    required = false,
  } = props;

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500 ml-1">*</span>}
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
              className={`w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                fieldState.error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />

            {fieldState.error && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-red-600 font-medium">
                  {fieldState.error.message}
                </p>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};