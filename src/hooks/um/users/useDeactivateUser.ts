import { useAppDispatch } from '@/store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { updateUser } from '@/store/features/um/user/userSlice.ts';
import { USERS_ROUTE } from '@utils/constant/app-route.constants.ts';

export const useDeactivateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useAppToast();

  const deactivateUser = async (user: any) => {
    try {
      const payload = { ...user, status: 'deactivated' };
      await dispatch(updateUser(payload)).unwrap();

      showSuccess('Deactivate User', `${user.firstName} ${user.lastName} has been deactivated.`);
      navigate(USERS_ROUTE);
    } catch (err: any) {
      showError('Deactivate User', 'Unable to deactivate user.');
      console.error('Deactivate user error:', err);
    }
  };

  return { deactivateUser };
};
