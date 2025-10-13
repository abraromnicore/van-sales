export const Subject = {
  Dashboard: 'dashboard',
  Cards: 'cards',
  RoleManagement: 'Role Management',
  Role: 'role',
  User: 'user',
  UserManagement: 'User Management',
  All: 'all',
} as const;

export type Subject = typeof Subject[keyof typeof Subject];