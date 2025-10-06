import * as React from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import Select, { type SingleValue, type ActionMeta } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps<T extends FieldValues> {
  label?: string;
  control: Control<T>;
  rules?: Record<string, any>;
  name: Path<T>;
  options?: Option[];
  errors?: Record<string, any>;
  imageSVG?: React.ReactNode;
  placeholder?: string;
  isDisabled?: boolean;
}

const SelectDropdown = <T extends FieldValues>({
  label,
  control,
  rules = {},
  name,
  options = [],
  errors = {},
  imageSVG,
  placeholder = "Select an option",
  isDisabled = false,
}: SelectDropdownProps<T>) => {
  const id = `select-${name}`;
  const hasError = errors[name];

  return (
    <div className="w-full">
      <div className={`
        relative flex items-center
        px-4 pt-2.5 pb-1
        bg-white 
        rounded-xl
        border-2
        transition-all duration-200
        ${hasError 
          ? 'border-red-500 focus-within:border-red-500' 
          : 'border-gray-200 hover:border-gray-300 focus-within:border-blue-500'
        }
        ${isDisabled ? 'bg-gray-50 cursor-not-allowed' : ''}
      `}>
        {imageSVG && (
          <div className="flex-shrink-0 mr-3">
            {imageSVG}
          </div>
        )}
        
        <div className="flex-1">
          {label && (
            <label htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1">
              {label}
            </label>
          )}
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <Select
                {...field}
                inputId={id}
                options={options}
                isClearable={true}
                placeholder={placeholder}
                value={
                  options.find((option) => option.value === field.value) || null
                }
                onChange={(
                  selected: SingleValue<Option>,
                  actionMeta: ActionMeta<Option>
                ) => field.onChange(selected ? selected.value : "")}
                unstyled
                className="w-full"
                classNames={{
                  control: () => "w-full bg-transparent",
                  singleValue: () => "text-gray-900 text-sm",
                  placeholder: () => "text-gray-400 text-sm",
                  input: () => "text-gray-900 text-sm",
                  menu: () =>
                    "bg-white border-2 border-gray-200 mt-2 rounded-xl shadow-lg text-sm z-50",
                  option: ({ isFocused, isSelected }) =>
                    `px-4 py-2 cursor-pointer transition-colors duration-150 ${
                      isSelected 
                        ? "bg-blue-500 text-white" 
                        : isFocused 
                        ? "bg-blue-50 text-gray-900" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`,
                  menuList: () => "rounded-xl overflow-hidden",
                  indicatorSeparator: () => "hidden",
                  dropdownIndicator: () => "text-gray-400 hover:text-gray-600 transition-colors",
                  clearIndicator: () => "text-gray-400 hover:text-gray-600 transition-colors",
                }}
                isDisabled={isDisabled}
              />
            )}
          />
        </div>
      </div>
      
      {hasError && (
        <p className="text-red-500 text-xs mt-2 ml-2">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default SelectDropdown;