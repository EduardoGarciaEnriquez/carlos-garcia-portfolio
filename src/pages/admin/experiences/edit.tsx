import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import dayjs from 'dayjs'
import Form from '../../../components/admin/form/form'
import Input from '../../../components/admin/form/input'
import Selector, {
  ISelectorOption,
} from '../../../components/admin/form/selector'
import TextArea from '../../../components/admin/form/text'
import Loader from '../../../components/icons/loader'
import {
  fetchExperienceById,
  updateExperience,
} from '../../../store/slices/experiences.slice'
import { fetchUsersByPage } from '../../../store/slices/users.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { EmploymentType, IUpdateExperience, Location } from '../../../types'
import { editExperienceSchema } from './schema'

const EditExperiencePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateExperience>({
    resolver: yupResolver(editExperienceSchema),
  })
  const { experience, loadingFetchExperience, loadingUpdateExperience } =
    useSelector((state: IRootState) => state.experience)
  const { users, loadingFetchUsers } = useSelector(
    (state: IRootState) => state.users
  )
  const { id } = useParams<string>()
  const experienceId = Number(id)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)

  const onSubmit = (data: IUpdateExperience) => {
    dispatch(
      updateExperience({
        id: experienceId,
        data: {
          ...data,
          companyWebsite:
            data.companyWebsite !== '' ? data.companyWebsite : undefined,
          startDate: dayjs(data.startDate).toISOString(),
          endDate:
            data?.endDate !== 'Invalid Date'
              ? dayjs(data.endDate).toISOString()
              : undefined,
        },
      })
    )
    setEdit(false)
  }

  useEffect(() => {
    if (experienceId) {
      dispatch(fetchExperienceById(experienceId))
      dispatch(fetchUsersByPage({ page: 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceId])

  useEffect(() => {
    if (experience) {
      const {
        title,
        company,
        startDate,
        endDate,
        description,
        userId,
        employmentType,
        location,
        companyWebsite,
      } = experience
      reset(
        {
          title,
          company,
          startDate: dayjs(startDate).add(1, 'day').format('YYYY-MM-DD'),
          endDate:
            endDate && dayjs(endDate).isValid()
              ? dayjs(endDate).add(1, 'day').format('YYYY-MM-DD')
              : '',
          description,
          employmentType,
          location,
          companyWebsite,
          userId: userId.toString(),
        },
        {
          keepDirty: false,
          keepTouched: false,
          keepErrors: true,
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience])

  if (loadingFetchExperience || loadingUpdateExperience)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader className="h-24 w-24" />
      </div>
    )

  const inputs: {
    label: string
    type: React.InputHTMLAttributes<HTMLInputElement>['type']
    placeholder?: string
    error?: string
    name: keyof IUpdateExperience
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
      options: users?.map((user) => {
        return { label: `${user.firstName} ${user.lastName}`, value: user.id }
      }),
      disabled: !edit || loadingFetchUsers,
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
      options: Object.values(Location).map((loc) => ({
        label: loc.charAt(0).toUpperCase() + loc.slice(1),
        value: loc,
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
      onSubmit={handleSubmit(onSubmit)}
      title="Edit Experience"
      editing={edit}
      onEdit={() => setEdit(true)}
      disabled={false}
      onGoBack={() => navigate(-1)}
      onCancel={() => setEdit(false)}
    >
      {inputs.map((input) => {
        if (input.type === 'text-area') {
          return (
            <TextArea
              key={input.name}
              label={input.label}
              isDisabled={!edit}
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
              isDisabled={input?.disabled ?? !edit}
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
            isDisabled={!edit}
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

export default EditExperiencePage
