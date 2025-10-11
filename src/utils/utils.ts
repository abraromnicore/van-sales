import type { RoleType } from '@/types/um/roles/role.type';
import { ACCESS_TOKEN, APP_PERMISSIONS } from '@utils/constant/app.constant.ts';
import _ from 'lodash';

export const getAccessToken = () => {
  const localStorageData = localStorage.getItem(ACCESS_TOKEN);
  return JSON.parse(String(localStorageData)) ?? '';
};

export const setAccessToken = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));

export const clearLocalStorage = () => localStorage.clear();

export const easternArabicDigits = [
  '۰',
  '۱',
  '۲',
  '۳',
  '۴',
  '۵',
  '۶',
  '۷',
  '۸',
  '۹',
];

export const convertToEasternArabic = (num: number) => {
  return num
    .toString()
    .split('')
    .map((digit) => easternArabicDigits[+digit])
    .join('');
};

export const mapRolesToSelectOptions = (roles: RoleType[]) => {
  if (!Array.isArray(roles)) return [];
  return roles.map(role => ({
    label: role.roleName,
    value: role.id,
  }));
};

export const transformPermissions = (permissions: any) => {
  const groupedByModule = _.groupBy(permissions, 'module_name');

  return _.mapValues(groupedByModule, (perms) => {
    // Further group by the prefix before the dot (e.g. 'role' from 'role.create')
    const groupedByEntity = _.groupBy(perms, (p) => p.permission_name.split('.')[0]);

    // Step 3: Map to simplified shape
    return _.mapValues(groupedByEntity, (entityPerms) =>
      entityPerms.map((p) => ({
        permission_name: p.permission_name.split('.')[1],
        description: p.description,
      })),
    );
  });
};

export const setPermissions = (permissions: any) => {
  localStorage.setItem(APP_PERMISSIONS, JSON.stringify(permissions));
};

export const getPermissions = () => {
  const permissionsString = localStorage.getItem(APP_PERMISSIONS) ?? '';
  return JSON.parse(permissionsString);
};