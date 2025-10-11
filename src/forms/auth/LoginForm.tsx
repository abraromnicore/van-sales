import { InputControl } from '@components/forms/InputControl.tsx';
import { Button } from '@components/button/Button.tsx';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@hooks/auth/useLogin.ts';

export const LoginForm = () => {
  const { control, submitHandler, isValid, errors } = useLogin();
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-6">
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        {t('login.signInMsg')}
      </h5>
      <div>
        <InputControl
          control={control}
          label={t('login.username')}
          name="username"
          placeholder={t('login.emailInput')}
          type="text"
          className="py-2"
        />
      </div>
      <div>
        <InputControl
          name="password"
          label={t('login.password')}
          placeholder={t('login.password')}
          type="password"
          control={control}
          className="py-2"
        />
      </div>
      <div className="flex items-start">
        <Button variant={'ghost'}
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500 px-0"
                label={t('login.lostPassword')} />
      </div>
      <Button
        className={'w-full'}
        onClick={submitHandler}
        label={t('login.signIn')} />
      <div className="wtext-sm font-medium text-gray-500 dark:text-gray-300">
        {t('login.notReg')} <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
        {t('login.createAcc')}
      </a>
      </div>
    </div>
  );
};