import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import Form from '../../../components/admin/form/form'
import Input from '../../../components/admin/form/input'
import Selector, {
  ISelectorOption,
} from '../../../components/admin/form/selector'
import TextArea from '../../../components/admin/form/text'
import { createTag } from '../../../store/slices/tags.slice'
import { AppDispatch } from '../../../store/store'
import { ICreateTag, TagColor } from '../../../types'
import { editTagSchema } from './schema'

const CreateTagPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTag>({
    resolver: yupResolver(editTagSchema),
  })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = (data: ICreateTag) => {
    dispatch(createTag(data))
  }

  const inputs: {
    label: string
    type: React.InputHTMLAttributes<HTMLInputElement>['type']
    placeholder?: string
    error?: string
    name: keyof ICreateTag
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
    },
  ]

  return (
    <Form
      title="Create"
      onSubmit={handleSubmit(onSubmit)}
      disabled={false}
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

export default CreateTagPage
