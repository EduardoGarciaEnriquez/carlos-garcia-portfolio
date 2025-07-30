import { ITechnology } from './technology.types'

export interface ITag {
  id: number
  name: string
  color: TagColor
  technologies: ITechnology[]
}

export interface ICreateTag {
  name: string
  color: string
}

export interface IUpdateTag {
  name: string
  color: string
}

export enum TagColor {
  GRAY = 'gray',
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
  YELLOW = 'yellow',
  INDIGO = 'indigo',
  PURPLE = 'purple',
  PINK = 'pink',
}
