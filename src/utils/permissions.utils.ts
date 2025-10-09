import { PERMISSIONS } from '@utils/constant/app.constant.ts';

export const setPermissions = () => {
  PERMISSIONS.forEach(permission => {
    console.log(permission);
  });
};