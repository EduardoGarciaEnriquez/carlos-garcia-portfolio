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
import { uploadProjectCoverService } from '../../../services/projects.services'
import {
  addTechnology,
  fetchProjectById,
  removeTechnology,
  updateProject,
} from '../../../store/slices/projects.slice'
import { fetchTechnologiesByPage } from '../../../store/slices/technologies.slice'
import { fetchUsersByPage } from '../../../store/slices/users.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { IUpdateProject } from '../../../types'
import { editProjectSchema } from './schemas'

const EditProjectPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateProject>({
    resolver: yupResolver(editProjectSchema),
  })
  const { project, loadingFetchProject, loadingUpdateProject } = useSelector(
    (state: IRootState) => state.project
  )
  const { users, loadingFetchUsers } = useSelector(
    (state: IRootState) => state.users
  )
  const { technologies } = useSelector((state: IRootState) => state.technology)

  const { id } = useParams<string>()
  const projectId = Number(id)

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

    const response = await uploadProjectCoverService(file).finally(() => {
      setUploading(false)
    })

    if (response?.secure_url) {
      setUrl(response.secure_url)
    }
  }

  const onSubmit = (data: IUpdateProject) => {
    dispatch(
      updateProject({
        id: projectId,
        data: { ...data, cover: url ?? project?.cover ?? undefined },
      })
    )
    setEdit(false)
  }

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId))
      dispatch(fetchUsersByPage({ page: 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  useEffect(() => {
    if (project) {
      const { name, description, domain, repo, userId } = project
      reset(
        {
          name,
          description,
          domain,
          repo,
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
  }, [project])

  if (loadingFetchProject || loadingUpdateProject)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader className="h-24 w-24" />
      </div>
    )

  const CoverSection = () => {
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
                className="h-16 w-auto rounded-md"
                src={url ?? project?.cover}
              />
              <p className="text-green-600">{file ?? 'Current cover'}</p>
            </div>
          ) : (
            project?.cover && (
              <div className="p-1 bg-gray-200 rounded-lf mt-4 rounded-md flex flex-row gap-4 items-center">
                <img
                  className="h-16 w-auto rounded-md"
                  src={project?.cover ?? undefined}
                />
                <p className="text-gray-600">Current cover</p>
              </div>
            )
          )}
        </div>
      )
    }
    return (
      <div className="mb-4 flex items-center justify-center w-full">
        {project?.cover ? (
          <img
            className="aspect-3/2 object-cover md:aspect-video md:object-contain rounded-md mx-auto"
            src={project?.cover ?? undefined}
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
    name: keyof IUpdateProject
    options?: ISelectorOption[]
    isMulti?: boolean
    disabled?: boolean
  }[] = [
    {
      label: 'Project Title',
      type: 'text',
      placeholder: 'Enter the project title',
      error: errors.name?.message,
      name: 'name',
    },
    {
      label: 'Description',
      type: 'text-area',
      placeholder: 'Write about your project',
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
      label: 'Domain',
      type: 'url',
      placeholder: 'Enter your project domain URL',
      error: errors.domain?.message,
      name: 'domain',
    },
    {
      label: 'Repository',
      type: 'url',
      placeholder: 'Enter your project repository URL',
      error: errors.repo?.message,
      name: 'repo',
    },
  ]

  const multiSelectOptions = technologies?.map((technology) => {
    return { id: technology.id, label: technology.name, image: technology.icon }
  })

  const multiSelectDefaultOptions = project?.technologies?.map((technology) => {
    return { id: technology.id, label: technology.name, image: technology.icon }
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Edit Project"
      editing={edit}
      onEdit={() => setEdit(true)}
      disabled={uploading}
      onGoBack={() => navigate(-1)}
      onCancel={() => setEdit(false)}
    >
      <CoverSection />
      <MultiSelector
        isDisabled={!edit}
        options={multiSelectOptions}
        defaultOptions={multiSelectDefaultOptions}
        fetchOptions={(search) => dispatch(fetchTechnologiesByPage({ search }))}
        addOption={(technologyId: number) =>
          dispatch(
            addTechnology({
              projectId: projectId,
              technologyId: technologyId,
            })
          )
        }
        removeOption={(technologyId: number) =>
          dispatch(
            removeTechnology({
              projectId: projectId,
              technologyId: technologyId,
            })
          )
        }
        label="Technologies"
        placeholder="Search and select technology"
      />
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

export default EditProjectPage
