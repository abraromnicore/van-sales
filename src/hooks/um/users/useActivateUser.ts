import { useAppDispatch } from '@/store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { updateUser } from '@/store/features/um/user/userSlice.ts';
import { USERS_ROUTE } from '@utils/constant/app-route.constants.ts';

export const useActivateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useAppToast();

  const activateUser = async (user: any) => {
    try {
      const payload = { ...user, status: 'active' };
      await dispatch(updateUser(payload)).unwrap();

      showSuccess('Activate User', `${user.firstName} ${user.lastName} is now active.`);
      navigate(USERS_ROUTE);
    } catch (err: any) {
      showError('Activate User', 'Unable to activate user.');
      console.error('Activate user error:', err);
    }
  };

  return { activateUser };
};
