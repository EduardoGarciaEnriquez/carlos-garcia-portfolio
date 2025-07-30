import { ITag } from './tag.types'

export interface ITechnology {
  id: number
  name: string
  icon: string
  tags: ITag[] | []
}

export interface ICreateTechnology {
  name: string
  icon?: string
}

export interface IUpdateTechnology {
  name: string
  icon?: string
}

export interface IAddTag {
  tagId: number
  technologyId: number
}

export interface IRemoveTag {
  tagId: number
  technologyId: number
}
