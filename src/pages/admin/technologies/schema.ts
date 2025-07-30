import * as yup from 'yup'

// Yup validation schema
export const createTechnologySchema = yup
  .object({
    name: yup.string().required('Technology name is required'),
  })
  .required()

export const editTechnologySchema = yup
  .object({
    name: yup.string().required('Technology name is required'),
  })
  .required()
