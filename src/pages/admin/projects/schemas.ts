import * as yup from 'yup'

// Yup validation schema
export const createProjectSchema = yup
  .object({
    name: yup.string().required('Project name is required'),
    description: yup.string().required('Description is required'),
    domain: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
    repo: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
    details: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
    userId: yup.string().required('Pic a valid user'),
  })
  .required()

export const editProjectSchema = yup
  .object({
    name: yup.string().required('Project name is required'),
    description: yup.string().required('Description is required'),
    domain: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
    repo: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
    details: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
    userId: yup.string().required('Pic a valid user'),
  })
  .required()
