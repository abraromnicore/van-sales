import * as yup from 'yup';

export const roleSchema = yup.object().shape({
  role: yup
    .string()
    .required('Role is required.'),

  permissions: yup
    .object()
    .test(
      'at-least-one-true',
      'At least one permission must be enabled.',
      (obj) => obj && Object.values(obj).some(Boolean)
    )
    .required('Permissions are required.'),
});