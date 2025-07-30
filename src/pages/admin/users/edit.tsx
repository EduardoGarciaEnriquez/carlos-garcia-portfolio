import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import Form from '../../../components/admin/form/form'
import Input from '../../../components/admin/form/input'
import Selector, {
  ISelectorOption,
} from '../../../components/admin/form/selector'
import TextArea from '../../../components/admin/form/text'
import Avatar from '../../../components/home/avatar'
import Loader from '../../../components/icons/loader'
import UploadIcon from '../../../components/icons/upload'
import { uploadAvatarService } from '../../../services/users.services'
import { fetchUserById, updateUser } from '../../../store/slices/users.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { IUpdateUserFormData, UserAvailability } from '../../../types'
import { editUserSchema } from '../schemas'

const EditUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateUserFormData>({
    resolver: yupResolver(editUserSchema),
  })
  const { user, loadingFetchUser, loadingUpdateUser } = useSelector(
    (state: IRootState) => state.users
  )
  const { id } = useParams<string>()
  const userId = Number(id)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [file, setFile] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState<string | null>(null)

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file.name)
    setUploading(true)

    const response = await uploadAvatarService(file).finally(() => {
      setUploading(false)
    })

    if (response?.secure_url) {
      setUrl(response.secure_url)
    }
  }

  const onSubmit = (data: IUpdateUserFormData) => {
    dispatch(
      updateUser({
        id: userId,
        data: { ...data, avatar: url ?? user?.avatar ?? undefined },
      })
    )
    setEdit(false)
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    if (user) {
      reset(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          professionalTitle: user.professionalTitle,
          bio: user.bio,
          availability: user.availability,
          email: user.email,
          phone: user.phone,
          github: user.github,
          linkedin: user.linkedin,
          notionResume: user.notionResume,
        },
        {
          keepDirty: false,
          keepTouched: false,
          keepErrors: true,
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (loadingFetchUser || loadingUpdateUser)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader className="h-24 w-24" />
      </div>
    )

  const AvatarSection = () => {
    if (edit) {
      return (
        <div className="mb-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="avatar"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {uploading ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Loader className="w-14 h-14" />
                </div>
              ) : (
                <UploadIcon />
              )}

              <input
                onChange={handleOnChange}
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {!file && 'No file selected. Please upload an image.'}
          </p>
          {url && file ? (
            <div className="p-1 bg-green-200 rounded-lf mt-4 rounded-md flex flex-row gap-4 items-center">
              <Avatar image={url ?? user?.avatar} />
              <p className="text-green-600">{file ?? 'Current avatar'}</p>
            </div>
          ) : (
            <div className="p-1 bg-gray-200 rounded-lf mt-4 rounded-md flex flex-row gap-4 items-center">
              <Avatar image={user?.avatar ?? undefined} />
              <p className="text-gray-600">Current avatar</p>
            </div>
          )}
        </div>
      )
    }
    return (
      <div className="mb-4 flex items-center justify-center w-full">
        <Avatar image={user?.avatar ?? ''} width="w-64" heigh="h-64" />
      </div>
    )
  }

  const inputs: {
    label: string
    type: React.InputHTMLAttributes<HTMLInputElement>['type']
    placeholder?: string
    error?: string
    name: keyof IUpdateUserFormData
    options?: ISelectorOption[]
  }[] = [
    {
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      error: errors.firstName?.message,
      name: 'firstName',
    },
    {
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      error: errors.lastName?.message,
      name: 'lastName',
    },
    {
      label: 'Professional Title',
      type: 'text',
      placeholder: 'Enter your professional title',
      error: errors.professionalTitle?.message,
      name: 'professionalTitle',
    },
    {
      label: 'Bio',
      type: 'text-area',
      placeholder: 'Write about yourself',
      error: errors.bio?.message,
      name: 'bio',
    },
    {
      label: 'Availability',
      type: 'selector',
      error: errors.availability?.message,
      name: 'availability',
      options: [
        { label: UserAvailability.Hire, value: UserAvailability.Hire },
        {
          label: UserAvailability.Freelance,
          value: UserAvailability.Freelance,
        },
        {
          label: UserAvailability.Unavailable,
          value: UserAvailability.Unavailable,
        },
        { label: UserAvailability.Looking, value: UserAvailability.Looking },
        {
          label: UserAvailability.NotLooking,
          value: UserAvailability.NotLooking,
        },
      ],
    },
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      error: errors.email?.message,
      name: 'email',
    },
    {
      label: 'Phone',
      type: 'tel',
      placeholder: 'Enter your phone number',
      error: errors.phone?.message,
      name: 'phone',
    },
    {
      label: 'GitHub',
      type: 'url',
      placeholder: 'Enter your GitHub profile URL',
      error: errors.github?.message,
      name: 'github',
    },
    {
      label: 'LinkedIn',
      type: 'url',
      placeholder: 'Enter your LinkedIn profile URL',
      error: errors.linkedin?.message,
      name: 'linkedin',
    },
    {
      label: 'Notion Resume',
      type: 'url',
      placeholder: 'Enter your Notion Resume URL',
      error: errors.notionResume?.message,
      name: 'notionResume',
    },
  ]

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Edit User"
      editing={edit}
      onEdit={() => setEdit(true)}
      disabled={uploading}
      onGoBack={() => navigate(-1)}
      onCancel={() => setEdit(false)}
    >
      <AvatarSection />

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
              isDisabled={!edit}
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

export default EditUserPage
