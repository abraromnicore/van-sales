export const Action = {
  Manage: 'manage',
  Access: 'access',
  Create: 'create',
  View: 'view',
  Edit: 'edit',
  Delete: 'delete',
  Deactivate: 'deactivate',
  ViewAuditLog: 'view_audit_log',
} as const;

export type Action = typeof Action[keyof typeof Action];