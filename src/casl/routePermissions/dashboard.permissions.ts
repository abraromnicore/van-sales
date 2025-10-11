import { Action } from '@/casl/action.ts';
import { Subject } from '@/casl/subject.ts';

export const dashboardPermissions = {
  '/dashboard': { action: Action.View, subject: Subject.Cards },
};