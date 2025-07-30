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
import Loader from '../../../components/icons/loader'
import { fetchTagById, updateTag } from '../../../store/slices/tags.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { IUpdateTag, TagColor } from '../../../types'
import { editTagSchema } from './schema'

const EditTagPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateTag>({
    resolver: yupResolver(editTagSchema),
  })
  const { tag, loadingFetchTag, loadingUpdateTag } = useSelector(
    (state: IRootState) => state.tag
  )
  const { id } = useParams<string>()
  const tagId = Number(id)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)

  const onSubmit = (data: IUpdateTag) => {
    dispatch(
      updateTag({
        id: tagId,
        data,
      })
    )
    setEdit(false)
  }

  useEffect(() => {
    if (tagId) {
      dispatch(fetchTagById(tagId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagId])

  useEffect(() => {
    if (tag) {
      const { name, color } = tag
      reset(
        {
          name,
          color,
        },
        {
          keepDirty: false,
          keepTouched: false,
          keepErrors: true,
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])

  if (loadingFetchTag || loadingUpdateTag)
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
    name: keyof IUpdateTag
    options?: ISelectorOption[]
    isMulti?: boolean
    disabled?: boolean
  }[] = [
    {
      label: 'Tag Name',
      type: 'text',
      placeholder: 'Enter the tag name',
      error: errors.name?.message,
      name: 'name',
    },
    {
      label: 'Color',
      type: 'selector',
      error: errors.color?.message,
      name: 'color',
      options: Object.values(TagColor).map((color) => {
        return { label: color, value: color }
      }),
      disabled: !edit,
    },
  ]

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Edit"
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

export default EditTagPage
