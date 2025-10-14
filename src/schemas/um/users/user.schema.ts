import * as yup from 'yup';

const baseUserSchema = {
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),

  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other', ''], 'Please select a valid gender'),
  dateOfBirth: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('age', 'Must be at least 18 years old', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),

  status: yup
    .string()
    .required('Status is required')
    .oneOf(['active', 'inactive', 'pending'], 'Please select a valid status'),
  roleId: yup
    .string()
    .required('Role is required'),
  profilePicture: yup
    .string()
    .nullable()
    .optional(),
};

// Schema for creating users (includes password fields)
export const createUserSchema = yup.object().shape({
  ...baseUserSchema,
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});