import * as yup from 'yup'

// Yup validation schema
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  .required()

export const recoverPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
  })
  .required()

export const changePasswordSchema = yup
  .object({
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required()
