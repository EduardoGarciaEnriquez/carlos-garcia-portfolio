export interface IExperience {
  id: number
  title: string
  company: string
  startDate: string
  endDate?: string | null
  description: string
  userId: string
  employmentType: EmploymentType
  location: Location | string
  companyWebsite?: string
}

export interface IUpdateExperience {
  title: string
  company: string
  startDate: Date | string
  endDate?: Date | string | null
  description: string
  userId: string
  employmentType: EmploymentType
  location: Location | string
  companyWebsite?: string | null
}

export interface ICreateExperience {
  title: string
  company: string
  startDate: string
  endDate?: string | null
  description: string
  userId: string
  employmentType: EmploymentType
  location: Location | string
  companyWebsite?: string | null
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
