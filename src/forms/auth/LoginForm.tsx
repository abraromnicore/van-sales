import { InputControl } from '@components/forms/InputControl.tsx';
import { Button } from '@components/button/Button.tsx';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@hooks/auth/useLogin.ts';
import { useEffect } from 'react';

export const LoginForm = () => {
  const { control, submitHandler, isValid, errors } = useLogin();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  return (
    <div className="space-y-6">
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to your account</h5>
      <div>
        <InputControl
          control={control}
          label={'Username'}
          name="username"
          placeholder={t('login.emailInput')}
          type="text"
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
          className="py-2"
        />
      </div>
      <div className="flex items-start">
        <Button variant={'ghost'}
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500 px-0"
                label={'Lost Password?'} />
      </div>
      <Button
        className={'w-full'}
        onClick={submitHandler}
        disabled={!isValid}
        label={t('login.signIn')} />
      <div className="wtext-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
      </div>
    </div>
  );
};