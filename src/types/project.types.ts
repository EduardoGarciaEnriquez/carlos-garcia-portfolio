import { ITechnology } from './technology.types'
import { IUser } from './user'

export interface IProject {
  id: number
  name: string
  description: string
  cover: string
  domain: string
  repo: string
  details?: string
  userId: number
  user: IUser
  technologies: ITechnology[] | []
}

export interface IUpdateProject {
  name: string
  description: string
  cover?: string
  domain: string | null
  repo: string | null
  details: string | null
  userId: string
}
export interface ICreateProject {
  name: string
  description: string
  userId: string
  cover?: string
  domain: string | null
  details: string | null
  repo: string | null
}

export interface IAddTechnology {
  projectId: number
  technologyId: number
}

export interface IRemoveTechnology {
  projectId: number
  technologyId: number
}
