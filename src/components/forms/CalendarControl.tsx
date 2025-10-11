import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';

type CalendarControlProps = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dateFormat?: string;
  showIcon?: boolean;
  maxDate?: Date;
  minDate?: Date;
  yearNavigator?: boolean;
  monthNavigator?: boolean;
  yearRange?: string;
  required?: boolean;
};

export const CalendarControl = (props: CalendarControlProps) => {
  const {
    control,
    name,
    label,
    placeholder = 'Select date',
    className = '',
    disabled = false,
    dateFormat = 'dd/mm/yy',
    showIcon = true,
    maxDate,
    minDate,
    yearNavigator = true,
    monthNavigator = true,
    yearRange = '1900:2030',
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
            <Calendar
              id={name}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              dateFormat={dateFormat}
              placeholder={placeholder}
              showIcon={showIcon}
              maxDate={maxDate}
              minDate={minDate}
              yearNavigator={yearNavigator}
              monthNavigator={monthNavigator}
              yearRange={yearRange}
              disabled={disabled}
              className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
              inputClassName={`w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                fieldState.error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
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
