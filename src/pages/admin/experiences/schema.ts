import * as yup from 'yup'

// Yup validation schema
export const createExperienceSchema = yup
  .object({
    title: yup.string().required('Experience title is required'),
    description: yup.string().required('Description is required'),
    userId: yup.number().required('Pick a valid user'),
    company: yup.string().required('Company is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup
      .string()
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? undefined : value
      })
      .default(null),
    employmentType: yup.string().required('Employment type is required'),
    location: yup.string().required('Location is required'),
    companyWebsite: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
  })
  .required()

export const editExperienceSchema = yup
  .object({
    title: yup.string().required('Experience title is required'),
    description: yup.string().required('Description is required'),
    userId: yup.number().required('Pick a valid user'),
    company: yup.string().required('Company is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup
      .string()
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
    employmentType: yup.string().required('Employment type is required'),
    location: yup.string().required('Location is required'),
    companyWebsite: yup
      .string()
      .url('Invalid URL')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value
      })
      .default(null),
  })
  .required()
