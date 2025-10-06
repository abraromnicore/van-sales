import * as React from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  imageSVG?: React.ReactNode;
  name: string;
  register: any; // You might want to type this more specifically with react-hook-form types
  errors?: Record<string, any>;
  isDisabled?: boolean;
}

const InputField = ({
  label,
  placeholder = "",
  type = 'text',
  imageSVG,
  name,
  register,
  errors = {},
  isDisabled = false,
}: InputFieldProps) => {
  const id = `input-${name}`;
  const hasError = errors[name];

  return (
    <div className="w-full">
      <div className={`
        relative flex items-center
        px-4 py-3.5
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
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(name)}
            disabled={isDisabled}
            className="
              w-full
              bg-transparent 
              border-none 
              outline-none 
              text-gray-900
              placeholder-gray-400
              text-sm
              disabled:cursor-not-allowed
              disabled:text-gray-400
            "
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


export default InputField;