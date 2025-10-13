import { getPermissions } from '@utils/utils.ts';
import { buildAbilityFromPermissions } from '@/casl/defineAbility.ts';
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from '@utils/constant/app-route.constants.ts';
import { routePermissions } from '@/casl/routePermissions';
import { redirect } from 'react-router-dom';

export const routeGuardLoader = async ({ request }: { request: Request }) => {
  const permissions = getPermissions();

  const ability = buildAbilityFromPermissions(permissions);

  const url = new URL(request.url);
  const pathname = url.pathname;

  const matched = Object.entries(routePermissions).find(([pattern]) =>
    pathname.match(new RegExp(`^${pattern.replace(/:\w+/g, '[^/]+')}$`)),
  );

  if (matched) {
    const [, rule] = matched;
    if (ability.cannot(rule.action, rule.subject)) {
      throw redirect(LOGIN_ROUTE);
    }
  } else {
    throw redirect(UNAUTHORIZED_ROUTE);
  }
};