export interface IExperience {
  id: number
  title: string
  company: string
  startDate: Date
  endDate?: Date | null
  description: string
  userId: number
  employmentType: EmploymentType | string
  location: Location | string
  companyWebsite?: string | null
}

export interface ICreateExperience {
  title: string
  description: string
  userId: number
  company: string
  startDate: string
  endDate: string | null
  employmentType: EmploymentType | string
  location: Location | string
  companyWebsite: string | null
}

export interface IUpdateExperience {
  title: string
  description: string
  userId: number
  company: string
  startDate: string
  endDate: string | null
  employmentType: EmploymentType | string
  location: Location | string
  companyWebsite: string | null
}

export enum EmploymentType {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Contract = 'contract',
  Internship = 'internship',
  Freelance = 'freelance',
}

export enum Location {
  Remote = 'Remote',
  Onsite = 'Onsite',
  Hybrid = 'Hybrid',
}
