import { Action } from '@/casl/action.ts';
import { Subject } from '@/casl/subject.ts';

export const rolePermissions = {
  '/roles': { action: Action.View, subject: Subject.Role },
  '/roles/new': { action: Action.Create, subject: Subject.Role },
  '/roles/:id': { action: Action.View, subject: Subject.Role },
  '/roles/:id/edit': { action: Action.Update, subject: Subject.Role },
  '/role-management': { action: Action.Access, subject: Subject.RoleManagement },
};