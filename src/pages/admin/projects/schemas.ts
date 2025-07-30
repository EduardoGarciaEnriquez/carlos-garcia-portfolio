import * as yup from 'yup'

// Yup validation schema
export const createProjectSchema = yup
  .object({
    name: yup.string().required('Project name is required'),
    description: yup.string().required('Description is required'),
    domain: yup.string().url('Invalid URL').required('Domain is required'),
    repo: yup.string().url('Invalid URL').required('Repository is required'),
    userId: yup.string().required('Pic a valid user'),
  })
  .required()

export const editProjectSchema = yup
  .object({
    name: yup.string().required('Project name is required'),
    description: yup.string().required('Description is required'),
    domain: yup.string().url('Invalid URL').required('Domain is required'),
    repo: yup.string().url('Invalid URL').required('Repository is required'),
    userId: yup.string().required('Pic a valid user'),
  })
  .required()
