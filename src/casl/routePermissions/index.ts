import { dashboardPermissions } from '@/casl/routePermissions/dashboard.permissions.ts';
import { rolePermissions } from '@/casl/routePermissions/um/role.permissions.ts';
import { userPermissions } from '@/casl/routePermissions/um/user.permissions.ts';

export const routePermissions = {
  ...dashboardPermissions,
  ...rolePermissions,
  ...userPermissions,
};