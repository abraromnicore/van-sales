import { useState, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@components/button/Button.tsx';

type ProfilePictureControlProps = {
  control: any;
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  mode?: 'create' | 'update' | 'view';
  currentImage?: string | null;
};

export const ProfilePictureControl = (props: ProfilePictureControlProps) => {
  const {
    control,
    name,
    label = 'Profile Picture',
    className = '',
    disabled = false,
    required = false,
    mode = 'create',
    currentImage = null,
  } = props;

  const [previewImage, setPreviewImage] = useState<string | null>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null, onChange: (value: any) => void) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      onChange(null);
    }
  };

  const handleRemoveImage = (onChange: (value: any) => void) => {
    setPreviewImage(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (mode === 'view') {
    return (
      <div className={`flex flex-col space-y-2 ${className}`}>
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-lg font-semibold">
                {getInitials('User', 'Name')}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600">
            Profile picture will be displayed here
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500 text-lg font-semibold">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleImageChange(file, field.onChange);
                  }}
                  className="hidden"
                  disabled={disabled}
                />
                
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="secondary"
                    label="Choose Photo"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                    className="text-sm px-3 py-1"
                  />
                  
                  {previewImage && (
                    <Button
                      type="button"
                      variant="secondary"
                      label="Remove"
                      onClick={() => handleRemoveImage(field.onChange)}
                      disabled={disabled}
                      className="text-sm px-3 py-1 text-red-600 hover:text-red-700"
                    />
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  JPG, PNG up to 2MB
                </p>
              </div>
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
