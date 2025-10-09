import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { APP_TITLE } from '@utils/constant/app.constant.ts';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '@components/LanguageSelect.tsx';
import { InputControl } from '@components/forms/InputControl.tsx';
import { Button } from '@components/button/Button.tsx';
import { useLogin } from '@hooks/auth/useLogin.ts';

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
  useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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

  useEffect(() => {
  }, []);

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

  const onLogin = () => {
    navigate(DASHBOARD_ROUTE);
  };

  return (
    <div className={'flex items-center justify-center w-full min-h-screen'}>
      <div className="absolute top-0 right-0">
        <LanguageSelect />
      </div>
      <div
        className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to your account</h5>
          <div>
            <InputControl
              control={control}
              label={'Email address'}
              name="emailOrUsername"
              placeholder={t('login.emailInput')}
              type="text"
              disabled={isLoading}
              className="py-2"
            />
          </div>
          <div>
            <InputControl
              name="password"
              label={'Password'}
              placeholder={t('login.password')}
              type="password"
              control={control}
              disabled={isLoading}
              className="py-2"
            />
          </div>
          <div className="flex items-start">
            <Button onClick={handleForgotPassword} variant={'ghost'}
                    className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500 px-0"
                    label={'Lost Password?'} />
          </div>
          <Button
            className={'w-full'}
            onClick={onLogin}
            disabled={Object.keys(errors).length > 0}
            label={t('login.signIn')} />
          <div className="wtext-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
          </div>
        </div>
      </div>
    </div>
  );
};