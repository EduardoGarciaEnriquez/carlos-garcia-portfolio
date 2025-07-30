import { useState } from 'react'
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
import Loader from '../../../components/icons/loader'
import UploadIcon from '../../../components/icons/upload'
import { uploadTechnologyIconService } from '../../../services/technologies.services'
import { createTechnology } from '../../../store/slices/technologies.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { ICreateTechnology } from '../../../types'
import { createTechnologySchema } from './schema'

const CreateTechnologyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTechnology>({
    resolver: yupResolver(createTechnologySchema),
  })
  const { technology } = useSelector((state: IRootState) => state.technology)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [file, setFile] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState<string | null>(null)

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file.name)
    setUploading(true)

    const response = await uploadTechnologyIconService(file).finally(() => {
      setUploading(false)
    })

    if (response?.secure_url) {
      setUrl(response.secure_url)
    }
  }

  const onSubmit = (data: ICreateTechnology) => {
    dispatch(createTechnology({ ...data, icon: url ?? undefined }))
  }

  const IconSection = () => {
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
            <img
              className="h-8 p-1 w-auto rounded-md"
              src={url ?? technology?.icon}
            />
            <p className="text-green-600">{file ?? 'Current icon'}</p>
          </div>
        ) : (
          technology?.icon && (
            <div className="p-1 bg-gray-200 rounded-lf mt-4 rounded-md flex flex-row gap-4 items-center">
              <img
                className="h-8 p-1 w-auto rounded-md"
                src={technology?.icon ?? undefined}
              />
              <p className="text-gray-600">Current icon</p>
            </div>
          )
        )}
      </div>
    )
  }

  const inputs: {
    label: string
    type: React.InputHTMLAttributes<HTMLInputElement>['type']
    placeholder?: string
    error?: string
    name: keyof ICreateTechnology
    options?: ISelectorOption[]
    isMulti?: boolean
    disabled?: boolean
  }[] = [
    {
      label: 'Technology Name',
      type: 'text',
      placeholder: 'Enter the technology name',
      error: errors.name?.message,
      name: 'name',
    },
  ]

  return (
    <Form
      title="Create"
      onSubmit={handleSubmit(onSubmit)}
      disabled={uploading}
      onGoBack={() => navigate(-1)}
      editing={true}
    >
      <IconSection />
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
              isDisabled={input?.disabled}
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

export default CreateTechnologyPage
