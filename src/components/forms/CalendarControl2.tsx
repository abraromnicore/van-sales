import { Controller, type Control,  type FieldValues, type Path, type RegisterOptions } from 'react-hook-form';
import { Calendar, type CalendarProps } from 'primereact/calendar';

interface CalendarControlProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
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
}

const CalendarControl2 = <T extends FieldValues>({
                                                  name,
                                                  control,
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
                                                }: CalendarControlProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col">
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

            {/* Calendar Input */}
            <Calendar
              id={field.name}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              placeholder={placeholder}
              className={`w-full border border-gray-100 ${fieldState.error ? 'p-invalid' : ''}`}
              inputClassName="w-full px-3"
              {...calendarProps}
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

          {/* Error Message */}
          {fieldState.error && (
            <small className="p-error mt-1">
              {fieldState.error.message}
            </small>
          )}
        </div>
      )}
    />
  );
};

export default CalendarControl2;