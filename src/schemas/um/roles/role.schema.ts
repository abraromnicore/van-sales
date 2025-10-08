import * as yup from 'yup';

export const roleSchema = yup.object().shape({
  roleName: yup
    .string()
    .required('Role Name is required.'),

  permissions: yup
    .object()
    .test(
      'at-least-one-true',
      'At least one permission must be enabled.',
      (obj) => obj && Object.values(obj).some(Boolean)
    )
    .required('Permissions are required.'),
});