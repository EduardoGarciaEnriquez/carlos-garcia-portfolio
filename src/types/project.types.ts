import { ITechnology } from './technology.types'
import { IUser } from './user'

export interface IProject {
  id: number
  name: string
  description: string
  cover: string
  domain: string
  repo: string
  userId: number
  user: IUser
  technologies: ITechnology[] | []
}

export interface IUpdateProject {
  name: string
  description: string
  cover?: string
  domain: string
  repo: string
  userId: string
}
export interface ICreateProject {
  name: string
  description: string
  userId: string
  cover?: string
  domain?: string
  repo?: string
}

export interface IAddTechnology {
  projectId: number
  technologyId: number
}

export interface IRemoveTechnology {
  projectId: number
  technologyId: number
}
