import * as yup from 'yup'

// Yup validation schema
export const createExperienceSchema = yup
  .object({
    title: yup.string().required('Experience title is required'),
    company: yup.string().required('Company is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().nullable().optional(),
    description: yup.string().required('Description is required'),
    userId: yup.string().required('Pick a valid user'),
    employmentType: yup.string().required('Employment type is required'),
    location: yup.string().required('Location is required'),
    companyWebsite: yup.string().url('Invalid URL').nullable().optional(),
  })
  .required()

export const editExperienceSchema = yup
  .object({
    title: yup.string().required('Experience title is required'),
    company: yup.string().required('Company is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().nullable().optional(),
    description: yup.string().required('Description is required'),
    userId: yup.string().required('Pick a valid user'),
    employmentType: yup.string().required('Employment type is required'),
    location: yup.string().required('Location is required'),
    companyWebsite: yup.string().url('Invalid URL').nullable().optional(),
  })
  .required()
