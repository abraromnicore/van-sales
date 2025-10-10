import { defineAbility } from '@casl/ability';
import { Action } from '@/casl/actions.ts';
import { Subject } from '@/casl/subjects.ts';

export const ability = defineAbility((can, cannot) => {
  can(Action.Create, Subject.User);
});