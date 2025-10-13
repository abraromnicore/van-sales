import { Action } from '@/casl/action.ts';
import { Subject } from '@/casl/subject.ts';
import {
  CREATE_USER_ROUTE,
  EDIT_USER_ROUTE,
  UM_ROUTE,
  USER_HIERARCHY_ROUTE,
  USERS_ROUTE,
  VIEW_USER_ROUTE,
} from '@utils/constant/app-route.constants.ts';

export const userPermissions = {
  [UM_ROUTE]: { action: Action.Access, subject: Subject.UserManagement },
  [USERS_ROUTE]: { action: Action.View, subject: Subject.User },
  [CREATE_USER_ROUTE]: { action: Action.Create, subject: Subject.User },
  [EDIT_USER_ROUTE]: { action: Action.Update, subject: Subject.User },
  [VIEW_USER_ROUTE]: { action: Action.View, subject: Subject.User },
  [USER_HIERARCHY_ROUTE]: { action: Action.View, subject: Subject.User },
};