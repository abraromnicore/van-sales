import type { RoleType } from '@/types/um/roles/role.type';
import { ACCESS_TOKEN } from '@utils/constant/app.constant.ts';

export const getAccessToken = () => {
  const localStorageData = localStorage.getItem(ACCESS_TOKEN);
  return JSON.parse(String(localStorageData)) ?? '';
};

export const setAccessToken = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));

export const clearLocalStorage = () => localStorage.clear();

export const easternArabicDigits = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
];

export const convertToEasternArabic = (num: number) => {
  return num
    .toString()
    .split("")
    .map((digit) => easternArabicDigits[+digit])
    .join("");
};

export const mapRolesToSelectOptions = (roles: RoleType[]) => {
  if (!Array.isArray(roles)) return [];
  return roles.map(role => ({
    label: role.roleName,
    value: role.id,
  }));
};