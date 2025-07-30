import * as yup from 'yup'

// Yup validation schema
export const createTagSchema = yup
  .object({
    name: yup.string().required('Tag name is required'),
    color: yup.string().required('Tag color is required'),
  })
  .required()

export const editTagSchema = yup
  .object({
    name: yup.string().required('Tag name is required'),
    color: yup.string().required('Tag color is required'),
  })
  .required()
