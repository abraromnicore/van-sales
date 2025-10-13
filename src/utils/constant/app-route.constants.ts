export const LOGIN_ROUTE = '/login';
export const DEFAULT_ROUTE = LOGIN_ROUTE;
export const DASHBOARD_ROUTE = '/dashboard';
/**
 * User Management Routes
*/
const UM_ROUTE_PREFIX = '/um';
export const ROLES_ROUTE = `${UM_ROUTE_PREFIX}/roles`;
export const CREATE_ROLE_ROUTE = `${UM_ROUTE_PREFIX}/roles/create`;
export const EDIT_ROLE_ROUTE = `${UM_ROUTE_PREFIX}/roles/edit/{roleId}`;
export const VIEW_ROLE_ROUTE = `${UM_ROUTE_PREFIX}/roles/view/{roleId}`;
export const PROFILE_ROUTE = '/profile';
export const USERS_ROUTE = `${UM_ROUTE_PREFIX}/users`;
export const CREATE_USER_ROUTE = `${UM_ROUTE_PREFIX}/users/create`;
export const EDIT_USER_ROUTE = `${UM_ROUTE_PREFIX}/users/edit/{userId}`;
export const VIEW_USER_ROUTE = `${UM_ROUTE_PREFIX}/users/view/{userId}`;
export const LOGS_ROUTE = `${UM_ROUTE_PREFIX}/logs`;
export const USER_LOGS_ROUTE = `${UM_ROUTE_PREFIX}/users/logs/{userId}`;
export const VIEW_LOAD_REQ_ROUTE = '/load-req/view/reqId';
