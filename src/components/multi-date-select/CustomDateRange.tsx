import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { type ReactNode, useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

type CalendarRangeControlProps = {
  control: any;
  nameStart: string;
  nameEnd: string;
  labelStart?: string;
  labelEnd?: string;
  className?: string;
  disabled?: boolean;
  dateFormat?: string;
  maxDate?: Date;
  minDate?: Date;
  required?: boolean;
  prefixStart?: ReactNode;
  postfixStart?: ReactNode;
  prefixEnd?: ReactNode;
  postfixEnd?: ReactNode;
};

export const CalendarRangeControl = (props: CalendarRangeControlProps) => {
  const {
    control,
    nameStart,
    nameEnd,
    labelStart = 'From Date',
    labelEnd = 'To Date',
    className = '',
    disabled = false,
    dateFormat = 'dd/mm/yy',
    maxDate,
    minDate,
    required = false,
    prefixStart,
    postfixStart,
    prefixEnd,
    postfixEnd,
  } = props;

  const [error, setError] = useState<string | null>(null);
  const [startValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);

  useEffect(() => {
    if (startValue && endValue && startValue > endValue) {
      setError('Start date cannot be after end date.');
    } else {
      setError(null);
    }
  }, [startValue, endValue]);

  return (
    <div className={`flex items-end space-x-4 ${className}`}>
      {/* START DATE */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-gray-700 mb-1">
          {labelStart} {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div
          className="flex items-center rounded-lg border border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
          {prefixStart && (
            <div
              className="px-3 py-[10px] text-gray-500 border-r border-gray-200 bg-gray-50 flex items-center rounded-l-lg">
              {prefixStart}
            </div>
          )}

          <div className="relative flex-1">
            <Controller
              name={nameStart}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Calendar
                    id={nameStart}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                      setStartValue(e.value as Date | null);
                    }}
                    dateFormat={dateFormat}
                    placeholder="From date"
                    showIcon={false}
                    maxDate={maxDate}
                    minDate={minDate}
                    disabled={disabled}
                    className="w-full"
                    inputClassName={`w-full px-3 py-[14px] text-sm focus:outline-none rounded-lg ${
                      fieldState.error ? 'text-red-600' : 'text-gray-700'
                    }`}
                    panelClassName="rounded-lg border border-gray-200 shadow-lg"
                  />
                  {!prefixStart && !postfixStart && (
                    <CalendarIcon
                      size={18}
                      className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                    />
                  )}
                </>
              )}
            />
          </div>

          {postfixStart && (
            <div
              className="px-3 py-[10px] text-gray-500 border-l border-gray-200 bg-gray-50 flex items-center rounded-r-lg">
              {postfixStart}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-gray-700 mb-1">
          {labelEnd} {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div
          className="flex items-center rounded-lg border border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
          {prefixEnd && (
            <div
              className="px-3 py-[10px] text-gray-500 border-r border-gray-200 bg-gray-50 flex items-center rounded-l-lg">
              {prefixEnd}
            </div>
          )}

          <div className="relative flex-1">
            <Controller
              name={nameEnd}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Calendar
                    id={nameEnd}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                      setEndValue(e.value as Date | null);
                    }}
                    dateFormat={dateFormat}
                    placeholder="To date"
                    showIcon={false}
                    maxDate={maxDate}
                    minDate={minDate}
                    disabled={disabled}
                    className="w-full"
                    inputClassName={`w-full px-3 py-[14px] text-sm focus:outline-none rounded-lg ${
                      fieldState.error ? 'text-red-600' : 'text-gray-700'
                    }`}
                    panelClassName="rounded-lg border border-gray-200 shadow-lg"
                  />
                  {!prefixEnd && !postfixEnd && (
                    <CalendarIcon
                      size={18}
                      className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                    />
                  )}
                </>
              )}
            />
          </div>

          {postfixEnd && (
            <div
              className="px-3 py-[10px] text-gray-500 border-l border-gray-200 bg-gray-50 flex items-center rounded-r-lg">
              {postfixEnd}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="absolute bottom-[-20px] left-0 flex items-center space-x-1 mt-1">
          <svg
            className="w-4 h-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <small className="text-xs text-red-600 font-medium">{error}</small>
        </div>
      )}
    </div>
  );
};