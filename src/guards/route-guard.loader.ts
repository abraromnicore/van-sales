/*
export const routeGuardLoader = async ({ request }: { request: Request }) => {
  return true;
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
};*/

export const routeGuardLoader = async () => {
  return true;
};