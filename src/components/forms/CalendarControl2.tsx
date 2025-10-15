import { Controller, type Control,  type FieldValues, type Path, type RegisterOptions } from 'react-hook-form';
import { Calendar, type CalendarProps } from 'primereact/calendar';

interface CalendarControlProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  prefixString?: string;
  prefixIcon?: React.ReactNode;
  prefixButton?: React.ReactNode;
  postfixString?: string;
  postfixIcon?: React.ReactNode;
  postfixButton?: React.ReactNode;
  rules?: RegisterOptions<T>;
  placeholder?: string;
  className?: string;
  calendarProps?: CalendarProps;
  required?: boolean;
}

const CalendarControl2 = <T extends FieldValues>({
                                                  name,
                                                  control,
                                                  label,
                                                  prefixString,
                                                  prefixIcon,
                                                  prefixButton,
                                                  postfixString,
                                                  postfixIcon,
                                                  postfixButton,
                                                  rules,
                                                  placeholder,
                                                  className = '',
                                                  calendarProps = {},
                                                  required = false,
                                                }: CalendarControlProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col space-y-2">
          {label && (
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className={`p-inputgroup rounded-lg border border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 ${fieldState.error ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-500' : ''} ${className}`}>
            {/* Prefix Button */}
            {prefixButton && (
              <span className="p-inputgroup-addon p-0 border-0 ">
                {prefixButton}
              </span>
            )}

            {/* Prefix String */}
            {prefixString && (
              <span className="p-inputgroup-addon border-0  px-3">
                {prefixString}
              </span>
            )}

            {/* Prefix Icon */}
            {prefixIcon && (
              <span className="p-inputgroup-addon border-0  px-3">
                {prefixIcon}
              </span>
            )}

            {/* Calendar Input */}
            <Calendar
              id={field.name}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              placeholder={placeholder}
              className="w-full border-0"
              inputClassName="w-full px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0 disabled:bg-gray-50 disabled:text-gray-500"
              {...calendarProps}
            />

            {/* Postfix Icon */}
            {postfixIcon && (
              <span className="p-inputgroup-addon border-0  px-3">
                {postfixIcon}
              </span>
            )}

            {/* Postfix String */}
            {postfixString && (
              <span className="p-inputgroup-addon border-0  px-3">
                {postfixString}
              </span>
            )}

            {/* Postfix Button */}
            {postfixButton && (
              <span className="p-inputgroup-addon p-0 border-0 ">
                {postfixButton}
              </span>
            )}
          </div>

          {/* Error Message */}
          {fieldState.error && (
            <div className="flex items-center space-x-1 mt-1">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-red-600 font-medium">
                {fieldState.error.message}
              </p>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default CalendarControl2;