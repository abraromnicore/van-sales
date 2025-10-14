import { Button } from '@components/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '@utils/constant/app-route.constants.ts';

export const UnAuthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className={'flex flex-col items-center justify-center'}>
        <h1 className={'text-2xl pb-4 font-medium'}>Unauthorized User</h1>
        <p className={'pb-4'}>You are not allowed to perform this action.</p>
        <Button onClick={() => navigate(LOGIN_ROUTE)} label={'Back to Login'} />
      </div>

    </div>
  );
};