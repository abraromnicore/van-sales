import { useParams } from 'react-router-dom';
import { useRolesList } from '../roles/useRolesList';
import { useUsersList } from './useUsersList';

export const useViewUser = () => {
  const { roles } = useRolesList();
  const { users } = useUsersList(true);
  const { id } = useParams<{ id: string }>();

  const userToView = users.find(user => user.id === id);

  const userRole = userToView && roles.length > 0 
    ? roles.find(role => role.roleName === userToView.roleName)
    : null;

  return {
    userToView,
    userRole,
    roles,
    isLoading: !userToView || roles.length === 0,
  };
};
