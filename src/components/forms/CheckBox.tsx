// Checkbox Component
interface CheckboxProps {
  label?: string;
  imageSVG?: React.ReactNode;
  name: string;
  register: any;
  errors?: Record<string, any>;
  isDisabled?: boolean;
  description?: string;
}

export const Checkbox = ({
  label,
  imageSVG,
  name,
  register,
  errors = {},
  isDisabled = false,
  description,
}: CheckboxProps) => {
  const id = `checkbox-${name}`;
  const hasError = errors[name];

  return (
    <div className="w-full">
      <div className={`
        relative flex items-start
        px-4 py-3.5
        bg-white 
        rounded-xl
        transition-all duration-200
        cursor-pointer
        ${hasError 
          ? 'border-red-500' 
          : 'border-gray-200 hover:border-gray-300'
        }
        ${isDisabled ? 'bg-gray-50 cursor-not-allowed' : ''}
      `}>
        {imageSVG && (
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {imageSVG}
          </div>
        )}
        
        <div className="flex items-start flex-1">
          <input
            type="checkbox"
            id={id}
            {...register(name)}
            disabled={isDisabled}
            className="
              w-4 h-4 mt-0.5 mr-3
              text-blue-600
              border-2 border-gray-300
              rounded
              focus:ring-blue-500 focus:ring-2
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label={label}
          />
          
          <div className="flex-1">
            {label && (
              <label htmlFor={id} className={`
                block text-sm font-medium text-gray-900 cursor-pointer
                ${isDisabled ? 'cursor-not-allowed text-gray-400' : ''}
              `}>
                {label}
              </label>
            )}
            {description && (
              <p className={`
                text-xs text-gray-500 mt-1
                ${isDisabled ? 'text-gray-400' : ''}
              `}>
                {description}
              </p>
            )}
          </div>
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