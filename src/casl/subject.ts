export const Subject = {
  Dashboard: 'dashboard',
  Cards: 'cards',
  RoleManagement: 'Role Management',
  Role: 'role',
  All: 'all',
} as const;

export type Subject = typeof Subject[keyof typeof Subject];