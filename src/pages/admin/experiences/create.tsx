import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import Form from '../../../components/admin/form/form'
import Input from '../../../components/admin/form/input'
import Selector, {
  ISelectorOption,
} from '../../../components/admin/form/selector'
import TextArea from '../../../components/admin/form/text'
import { createExperience } from '../../../store/slices/experiences.slice'
import { fetchUsersByPage } from '../../../store/slices/users.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import {
  EmploymentType,
  ICreateExperience,
  IUser,
  Location,
} from '../../../types'
import { createExperienceSchema } from './schema'

const CreateExperiencePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateExperience>({
    resolver: yupResolver(createExperienceSchema),
  })
  const { users, loadingFetchUsers } = useSelector(
    (state: IRootState) => state.users
  )

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = (data: ICreateExperience) => {
    console.log(data)
    dispatch(createExperience(data))
  }

  useEffect(() => {
    dispatch(fetchUsersByPage({ page: 1 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inputs: {
    label: string
    type: React.InputHTMLAttributes<HTMLInputElement>['type']
    placeholder?: string
    error?: string
    name: keyof ICreateExperience
    options?: ISelectorOption[]
    isMulti?: boolean
    disabled?: boolean
  }[] = [
    {
      label: 'Job Title/Position',
      type: 'text',
      placeholder: 'Enter the experience title',
      error: errors.title?.message,
      name: 'title',
    },
    {
      label: 'Description',
      type: 'text-area',
      placeholder: 'Write about your experience',
      error: errors.description?.message,
      name: 'description',
    },
    {
      label: 'Author',
      type: 'selector',
      error: errors.userId?.message,
      name: 'userId',
      options: users?.map((user: IUser) => {
        return { label: `${user.firstName} ${user.lastName}`, value: user.id }
      }),
      disabled: loadingFetchUsers,
    },
    {
      label: 'Company',
      type: 'text',
      placeholder: 'Enter the company name',
      error: errors.company?.message,
      name: 'company',
    },
    {
      label: 'Start Date',
      type: 'date',
      error: errors.startDate?.message,
      name: 'startDate',
    },
    {
      label: 'End Date',
      type: 'date',
      error: errors.endDate?.message,
      name: 'endDate',
    },
    {
      label: 'Employment Type',
      type: 'selector',
      error: errors.employmentType?.message,
      name: 'employmentType',
      options: Object.values(EmploymentType).map((type) => ({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        value: type,
      })),
    },
    {
      label: 'Location',
      type: 'selector',
      error: errors.location?.message,
      name: 'location',
      options: Object.values(Location).map((location) => ({
        label: location,
        value: location,
      })),
    },
    {
      label: 'Company Website (optional)',
      type: 'text',
      placeholder: 'Enter the company website URL (if any)',
      error: errors.companyWebsite?.message,
      name: 'companyWebsite',
    },
  ]

  return (
    <Form
      title="Create"
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={() => navigate(-1)}
      editing={true}
    >
      {inputs.map((input) => {
        if (input.type === 'text-area') {
          return (
            <TextArea
              key={input.name}
              label={input.label}
              error={input.error}
              placeholder={input.placeholder}
              rows={4}
              {...register(input.name)}
            />
          )
        }
        if (input.type === 'selector') {
          return (
            <Selector
              key={input.name}
              label={input.label}
              error={input.error}
              options={input.options ?? []}
              {...register(input.name)}
            />
          )
        }
        return (
          <Input
            key={input.name}
            label={input.label}
            error={input.error}
            placeholder={input.placeholder}
            type={input.type}
            {...register(input.name)}
          />
        )
      })}
    </Form>
  )
}

export default CreateExperiencePage
