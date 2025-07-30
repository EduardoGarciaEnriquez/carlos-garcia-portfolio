import { IProject } from './project.types.ts'
import { IExperience } from './experience.types.ts'

export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string

  professionalTitle: string
  bio: string
  avatar?: string
  github: string
  linkedin: string
  notionResume: string
  role: UserRole
  availability: UserAvailability
  recoveryToken?: string
  createdAt?: Date

  projects?: IProject[]
  experiences?: IExperience[]
}

export interface IUpdateUserFormData {
  avatar?: string
  firstName: string
  lastName: string
  professionalTitle: string
  bio: string
  availability:
    | 'Available for hire'
    | 'Available for freelance'
    | 'Unavailable'
    | 'Looking'
    | 'Not looking'
  email: string
  phone: string
  github: string
  linkedin: string
  notionResume: string
}

enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export enum UserAvailability {
  Hire = 'Available for hire',
  Freelance = 'Available for freelance',
  Unavailable = 'Unavailable',
  Looking = 'Looking',
  NotLooking = 'Not looking',
}
