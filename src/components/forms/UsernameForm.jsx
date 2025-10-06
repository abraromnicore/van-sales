import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';
import * as React from 'react';


// Validation schema
const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
});



const UsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit = (data) => {
    console.log('Username submitted:', data.username);
    // Handle form submission here
  };

  // Custom user icon
  const userIcon = (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-400"
    >
      <path 
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Username</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="username"
          placeholder="Enter your username"
          type="text"
          imageSVG={userIcon}
          register={register}
          errors={errors}
          isDisabled={isSubmitting}
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full 
            py-3 px-6 
            bg-blue-500 hover:bg-blue-600 
            disabled:bg-gray-400
            text-white 
            font-medium 
            rounded-full 
            transition-colors
            disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;
