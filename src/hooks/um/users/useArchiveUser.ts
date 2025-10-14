import { useAppDispatch } from '@/store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { updateUser } from '@/store/features/um/user/userSlice.ts';
import { USERS_ROUTE } from '@utils/constant/app-route.constants.ts';

export const useArchiveUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useAppToast();

  const archiveUser = async (user: any) => {
    try {
      const payload = { ...user, status: 'archived' };
      await dispatch(updateUser(payload)).unwrap();

      showSuccess('Archive User', `${user.firstName} ${user.lastName} has been archived for record keeping.`);
      navigate(USERS_ROUTE);
    } catch (err: any) {
      showError('Archive User', 'Unable to archive user.');
      console.error('Archive user error:', err);
    }
  };

  return { archiveUser };
};
