import { useMetadata } from '@hooks/common/useMetadata.ts';
import { APP_TITLE } from '@utils/constant/app.constant.ts';
import { LanguageSelect } from '@components/LanguageSelect.tsx';
import { LoginForm } from '@/forms/auth/LoginForm.tsx';

export const LoginPage = () => {
  useMetadata({
    pageTitle: APP_TITLE,
    breadcrumbs: [],
  });

  return (
    <div className={'flex items-center justify-center w-full min-h-screen'}>
      <div className="absolute top-0 right-0">
        <LanguageSelect />
      </div>
      <div
        className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <LoginForm />
      </div>
    </div>
  );
};