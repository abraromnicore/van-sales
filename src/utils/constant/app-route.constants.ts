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
export const CREATE_USER_ROUTE = `${USERS_ROUTE}/create`;
export const EDIT_USER_ROUTE = `${USERS_ROUTE}/edit/{userId}`;
export const VIEW_USER_ROUTE = `${USERS_ROUTE}/view/{userId}`;
export const USER_HIERARCHY_ROUTE = `${USERS_ROUTE}/hierarchy`;
export const VIEW_USER_HIERARCHY_ROUTE = `${USERS_ROUTE}/hierarchy/view/{id}`;
export const EDIT_USER_HIERARCHY_ROUTE = `${USERS_ROUTE}/hierarchy/edit/{id}`;
/**
 * Van Representative Routes
 */
export const VAN_REPRESENTATIVE_ROUTE = `/van-rep`;
export const VAN_REP_LIST_ROUTE = `${VAN_REPRESENTATIVE_ROUTE}/list`;
export const VAN_REP_HIERARCHY_ROUTE = `${VAN_REPRESENTATIVE_ROUTE}/hierarchy`;
export const VIEW_VAN_REP_HIERARCHY_ROUTE = `${VAN_REP_HIERARCHY_ROUTE}/view/{id}`;
export const EDIT_VAN_REP_HIERARCHY_ROUTE = `${VAN_REP_HIERARCHY_ROUTE}/edit/{id}`;
export const VAN_LOG_AUDIT_LOGS_ROUTE = `${VAN_REPRESENTATIVE_ROUTE}/auditLogs`;
/**
 * Other Routes
 */
export const PROFILE_ROUTE = '/profile';
export const LOGS_ROUTE = `${UM_ROUTE}/logs`;
export const USER_LOGS_ROUTE = `${UM_ROUTE}/users/logs/{userId}`;
export const VIEW_LOAD_REQ_ROUTE = '/load-req/view/reqId';
export const VIEW_REP_ROUTE = `/van-reps/view/{repId}`;

