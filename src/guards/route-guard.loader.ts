import { ability } from '@/casl/defineAbility.ts';
import { Action } from '@/casl/actions.ts';
import { Subject } from '@/casl/subjects.ts';

export const routeGuardLoader = async () => {
  /*  const ability = await createAbilityForLoader();
    console.log(ability.can(Action.Create, Subject.User));*/
  /*const token = getAccessToken();
  if (!token) {
      throw redirect(ADMIN_LOGIN_ROUTE);
  }*/

  console.log(ability.can(Action.Create, Subject.User))


  return true;
};