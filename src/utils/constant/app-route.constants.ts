export const LOGIN_ROUTE = '/login';
export const UNAUTHORIZED_ROUTE = '/unauthorized';
export const DEFAULT_ROUTE = LOGIN_ROUTE;
export const DASHBOARD_ROUTE = '/dashboard';
/**
 * User Management Routes
*/
export const UM_ROUTE = '/um';
export const ROLES_ROUTE = `${UM_ROUTE}/roles`;
export const CREATE_ROLE_ROUTE = `${UM_ROUTE}/roles/create`;
export const EDIT_ROLE_ROUTE = `${UM_ROUTE}/roles/edit/{roleId}`;
export const VIEW_ROLE_ROUTE = `${UM_ROUTE}/roles/view/{roleId}`;
/**
 * Users Routes
 */
export const USERS_ROUTE = `${UM_ROUTE}/users`;
export const CREATE_USER_ROUTE = `${UM_ROUTE}/users/create`;
export const EDIT_USER_ROUTE = `${UM_ROUTE}/users/edit/{userId}`;
export const VIEW_USER_ROUTE = `${UM_ROUTE}/users/view/{userId}`;
export const USER_HIERARCHY_ROUTE = `${UM_ROUTE}/users/hierarchy`;
/**
 * Other Routes
 */
export const PROFILE_ROUTE = '/profile';
export const VIEW_LOAD_REQ_ROUTE = '/load-req/view/reqId';
export const VIEW_REP_ROUTE = `/van-reps/view/{repId}`;

