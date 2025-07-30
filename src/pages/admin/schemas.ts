import * as yup from 'yup'

// Yup validation schema
export const editUserSchema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    professionalTitle: yup.string().required('Profile title is required'),
    bio: yup.string().required('Bio is required'),
    availability: yup
      .string()
      .oneOf(
        [
          'Available for hire',
          'Available for freelance',
          'Unavailable',
          'Looking',
          'Not looking',
        ],
        'Invalid availability status'
      )
      .required('Availability is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: yup.string().required('Phone is required'),
    github: yup.string().url('Invalid URL').required('GitHub is required'),
    linkedin: yup.string().url('Invalid URL').required('LinkedIn is required'),
    notionResume: yup
      .string()
      .url('Invalid URL')
      .required('Notion is required'),
  })
  .required()
