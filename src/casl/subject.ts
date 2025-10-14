export const Subject = {
  Dashboard: 'dashboard',
  Cards: 'cards',
  RoleManagement: 'Role Management',
  Role: 'role',
  User: 'user',
  UserManagement: 'User Management',
  VanRepresentative: 'van_rep',
  Hierarchy: 'hierarchy',
  All: 'all',
} as const;

export type Subject = typeof Subject[keyof typeof Subject];