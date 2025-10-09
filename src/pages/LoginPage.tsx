import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '@utils/constant/app-route.constants.ts';
import { InputControl } from '@components/forms/InputControl';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { APP_TITLE } from '@utils/constant/app.constant.ts';

// Login Page Component
interface LoginFormData {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

export const LoginPage = () => {
  useMetadata({
    pageTitle: APP_TITLE,
    breadcrumbs: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      emailOrUsername: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      console.log('Login data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert('Login successful! (This is just a demo)');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality would be implemented here');
  };

  // // Icons
  // const EmailIcon = (
  //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
  //     <path
  //       d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     />
  //     <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //   </svg>
  // );

  // const PasswordIcon = (
  //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
  //     <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
  //     <circle cx="12" cy="16" r="1" fill="currentColor"/>
  //     <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //   </svg>
  // );

  const onLogin = () => {
    navigate(DASHBOARD_ROUTE);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email or Username Field */}
            <InputControl
              control={control}
              name="emailOrUsername"
              placeholder="Enter your email or username"
              type="text"
              disabled={isLoading}
              className="py-2"
            />

            {/* Password Field */}
            <InputControl
              name="password"
              placeholder="Enter your password"
              type="password"
              control={control}
              disabled={isLoading}
              className="py-2"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600 select-none">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors disabled:opacity-50 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={onLogin}
              className={
                'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out'
              }
              disabled={Object.keys(errors).length > 0}
            >
              Sign In
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                onClick={() =>
                  alert('Sign up functionality would be implemented here')
                }
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};