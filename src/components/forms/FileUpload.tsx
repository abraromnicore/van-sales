import * as React from "react";

// FileUpload Component
interface FileUploadProps {
  label?: string;
  imageSVG?: React.ReactNode;
  name: string;
  register: any;
  errors?: Record<string, any>;
  isDisabled?: boolean;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
}

export const FileUpload = ({
  label,
  imageSVG,
  name,
  register,
  errors = {},
  isDisabled = false,
  accept,
  multiple = false,
  maxSize,
}: FileUploadProps) => {
  const id = `fileupload-${name}`;
  const hasError = errors[name];
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(e.target.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div 
        className={`
          relative flex flex-col items-center justify-center
          px-4 py-6
          bg-white 
          rounded-xl
          border-2 border-dashed
          transition-all duration-200
          cursor-pointer
          min-h-[120px]
          ${hasError 
            ? 'border-red-500' 
            : dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isDisabled ? 'bg-gray-50 cursor-not-allowed border-gray-200' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {imageSVG && (
          <div className="flex-shrink-0 mb-2">
            {imageSVG}
          </div>
        )}
        
        <div className="text-center">
          {label && (
            <label htmlFor={id} className="block text-xs font-medium text-gray-700 mb-2">
              {label}
            </label>
          )}
          
          <input
            type="file"
            id={id}
            accept={accept}
            multiple={multiple}
            {...register(name)}
            disabled={isDisabled}
            onChange={handleChange}
            className="hidden"
            aria-label={label}
          />
          
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Click to upload
            </span>
            {" or drag and drop"}
          </div>
          
          {accept && (
            <p className="text-xs text-gray-400 mt-1">
              Supported formats: {accept}
            </p>
          )}
          
          {maxSize && (
            <p className="text-xs text-gray-400 mt-1">
              Max size: {maxSize}MB
            </p>
          )}
        </div>

        {selectedFiles && selectedFiles.length > 0 && (
          <div className="mt-3 w-full">
            <div className="text-xs font-medium text-gray-700 mb-1">Selected files:</div>
            {Array.from(selectedFiles).map((file, index) => (
              <div key={index} className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1 mb-1">
                {file.name} ({formatFileSize(file.size)})
              </div>
            ))}
          </div>
        )}
      </div>
      
      {hasError && (
        <p className="text-red-500 text-xs mt-2 ml-2">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};