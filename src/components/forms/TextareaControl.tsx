import { Controller } from 'react-hook-form';
import { InputTextarea, type InputTextareaProps } from 'primereact/inputtextarea';

type TextareaControlProps = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rules?: any;
  required?: boolean;
  prefixString?: string;
  prefixIcon?: React.ReactNode;
  prefixButton?: React.ReactNode;
  postfixString?: string;
  postfixIcon?: React.ReactNode;
  postfixButton?: React.ReactNode;
  textareaProps?: InputTextareaProps;
};

export const TextareaControl = (props: TextareaControlProps) => {
  const {
    control,
    name,
    label,
    placeholder = '',
    className = '',
    disabled = false,
    rules = {},
    required = false,
    prefixString,
    prefixIcon,
    prefixButton,
    postfixString,
    postfixIcon,
    postfixButton,
    textareaProps = {},
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
            <div className={`p-inputgroup ${className}`}>
              {/* Prefix Button */}
              {prefixButton && (
                <span className="p-inputgroup-addon p-0">
                  {prefixButton}
                </span>
              )}

              {/* Prefix String */}
              {prefixString && (
                <span className="p-inputgroup-addon">
                  {prefixString}
                </span>
              )}

              {/* Prefix Icon */}
              {prefixIcon && (
                <span className="p-inputgroup-addon">
                  {prefixIcon}
                </span>
              )}

              {/* Textarea Field */}
              <InputTextarea
                id={name}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                {...textareaProps}
              />

              {/* Postfix Icon */}
              {postfixIcon && (
                <span className="p-inputgroup-addon">
                  {postfixIcon}
                </span>
              )}

              {/* Postfix String */}
              {postfixString && (
                <span className="p-inputgroup-addon">
                  {postfixString}
                </span>
              )}

              {/* Postfix Button */}
              {postfixButton && (
                <span className="p-inputgroup-addon p-0">
                  {postfixButton}
                </span>
              )}
            </div>

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
