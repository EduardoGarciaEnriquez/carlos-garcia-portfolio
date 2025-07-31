import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import Form from '../../../components/admin/form/form'
import Input from '../../../components/admin/form/input'
import MultiSelector from '../../../components/admin/form/multi-selector'
import Selector, {
  ISelectorOption,
} from '../../../components/admin/form/selector'
import TextArea from '../../../components/admin/form/text'
import Loader from '../../../components/icons/loader'
import NoImageIcon from '../../../components/icons/noImage'
import UploadIcon from '../../../components/icons/upload'
import { uploadTechnologyIconService } from '../../../services/technologies.services'
import { fetchTagsByPage } from '../../../store/slices/tags.slice'
import {
  addTagToTechnology,
  fetchTechnologyById,
  removeTagFromTechnology,
  updateTechnology,
} from '../../../store/slices/technologies.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { IUpdateTechnology } from '../../../types'
import { editTechnologySchema } from './schema'

interface IOption {
  id: number
  label: string
  color: string
}

const EditTechnologyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateTechnology>({
    resolver: yupResolver(editTechnologySchema),
  })
  const { technology, loadingFetchTechnology, loadingUpdateTechnology } =
    useSelector((state: IRootState) => state.technology)
  const { tags } = useSelector((state: IRootState) => state.tag)

  const { id } = useParams<string>()
  const technologyId = Number(id)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [file, setFile] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [multiSelectOptions, setMultiSelectOptions] = useState<IOption[]>([])

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

  const onSubmit = (data: IUpdateTechnology) => {
    dispatch(
      updateTechnology({
        id: technologyId,
        data: { ...data, icon: url ?? technology?.icon ?? undefined },
      })
    )
    setEdit(false)
  }

  useEffect(() => {
    if (technologyId) {
      dispatch(fetchTechnologyById(technologyId))
      dispatch(fetchTagsByPage({}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technologyId])

  useEffect(() => {
    const options = tags?.map((tag) => {
      return { id: tag.id, label: tag.name, color: tag.color }
    })
    setMultiSelectOptions(options)
  }, [tags])

  useEffect(() => {
    if (technology) {
      const { name } = technology
      reset(
        {
          name,
        },
        {
          keepDirty: false,
          keepTouched: false,
          keepErrors: true,
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technology])

  if (loadingFetchTechnology || loadingUpdateTechnology)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader className="h-24 w-24" />
      </div>
    )

  const IconSection = () => {
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
    return (
      <div className="mb-4 flex items-center justify-center w-full">
        {technology?.icon ? (
          <img
            className="aspect-3/2 object-icon md:aspect-video md:object-contain rounded-md mx-auto border border-gray-300 dark:border-gray-600 p-8"
            src={technology?.icon ?? undefined}
          />
        ) : (
          <NoImageIcon className="h-52 w-auto mx-auto text-gray-400" />
        )}
      </div>
    )
  }

  const inputs: {
    label: string
    type: React.InputHTMLAttributes<HTMLInputElement>['type']
    placeholder?: string
    error?: string
    name: keyof IUpdateTechnology
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

  const multiSelectDefaultOptions = technology?.tags?.map((tag) => {
    return {
      id: tag.id,
      label: tag.name,
      color: tag?.color ?? undefined,
    }
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Edit"
      editing={edit}
      onEdit={() => setEdit(true)}
      disabled={uploading}
      onGoBack={() => navigate(-1)}
      onCancel={() => setEdit(false)}
    >
      <IconSection />
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
      <MultiSelector
        isDisabled={!edit}
        options={multiSelectOptions}
        defaultOptions={multiSelectDefaultOptions}
        addOption={(tagId: number) =>
          dispatch(
            addTagToTechnology({
              tagId: tagId,
              technologyId: technologyId,
            })
          )
        }
        removeOption={(tagId: number) =>
          dispatch(
            removeTagFromTechnology({
              tagId: tagId,
              technologyId: technologyId,
            })
          )
        }
        label="Tags"
        placeholder="Search and select tag"
      />
    </Form>
  )
}

export default EditTechnologyPage
