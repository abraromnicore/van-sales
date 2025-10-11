import { Action } from '@/casl/action.ts';
import { Subject } from '@/casl/subject.ts';

export const userPermissions = {
  '/users': { action: Action.View, subject: Subject.User },
  '/users/new': { action: Action.Create, subject: Subject.User },
  '/users/:id': { action: Action.View, subject: Subject.User },
  '/users/:id/edit': { action: Action.Update, subject: Subject.User },
  '/user-management': { action: Action.Access, subject: Subject.UserManagement },
};