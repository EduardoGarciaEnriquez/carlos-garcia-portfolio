import { ISelectorOption } from '../components/admin/form/selector'
import { IUpdateProject } from './project.types'

export * from './experience.types'
export * from './project.types'
export * from './tag.types'
export * from './technology.types'
export * from './user'

export interface IInput {
  label: string
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: string
  error?: string
  name: keyof IUpdateProject
  options?: ISelectorOption[]
  isMulti?: boolean
  disabled?: boolean
}
