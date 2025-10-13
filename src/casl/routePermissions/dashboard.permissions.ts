import { Action } from '@/casl/action.ts';
import { Subject } from '@/casl/subject.ts';
import { DASHBOARD_ROUTE } from '@utils/constant/app-route.constants.ts';

export const dashboardPermissions = {
  [DASHBOARD_ROUTE]: { action: Action.View, subject: Subject.Cards },
};