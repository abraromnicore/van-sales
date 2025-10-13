import { createMongoAbility, type MongoAbility } from '@casl/ability';
import type { Subject } from '@/casl/subject.ts';
import type { Action } from '@/casl/action.ts';

export type AppAbility = MongoAbility<[Action, Subject]>;

export function buildAbilityFromPermissions(permissions: any[]): AppAbility {
  if (!permissions || !permissions.length || permissions.length === 0) return createMongoAbility<AppAbility>();
  const rules: any[] = [];

  // action-level rules
  permissions.forEach((perm) => {
    const [subject, action] = perm.permission_name.split('.');
    rules.push({ action, subject });
  });

  // module-level rules (add once per module if user has any permission in it)
  const uniqueModules = Array.from(new Set(permissions.map((p) => p.module_name)));
  uniqueModules.forEach((module) => {
    rules.push({ action: 'access', subject: module });
  });

  return createMongoAbility<AppAbility>(rules, {
    detectSubjectType: (object: any) => object.__type || object.constructor.name,
  });
}