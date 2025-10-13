import { Action } from '@/casl/action.ts';
import { Subject } from '@/casl/subject.ts';
import {
  CREATE_ROLE_ROUTE,
  EDIT_ROLE_ROUTE,
  ROLES_ROUTE,
  VIEW_ROLE_ROUTE,
} from '@utils/constant/app-route.constants.ts';

export const rolePermissions = {
  [ROLES_ROUTE]: { action: Action.View, subject: Subject.Role },
  [CREATE_ROLE_ROUTE]: { action: Action.Create, subject: Subject.Role },
  [EDIT_ROLE_ROUTE]: { action: Action.Update, subject: Subject.Role },
  [VIEW_ROLE_ROUTE]: { action: Action.View, subject: Subject.Role },
};