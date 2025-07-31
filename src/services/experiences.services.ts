import { ICreateExperience, IExperience, IUpdateExperience } from '../types'

export const getExperiencesByPageService = async ({
  offset,
  limit = 10,
  search,
}: {
  offset: number
  limit?: number
  search?: string | null
}) => {
  const token = sessionStorage.getItem('token') ?? ''
  const searchParam = search ? `&company=${search}` : ''

  return await fetch(
    `${import.meta.env.VITE_PROJECTS_ENDPOINT}/experiences?offset=${offset}&limit=${limit}${searchParam}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to fetch experiences')
    })
    .catch((error) => {
      throw error
    })
}

export const getExperienceByIdService = async (id: number) => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/experiences/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export const createExperienceService = async (
  data: ICreateExperience
): Promise<IExperience> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/experiences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to create experience')
    })
    .catch((error) => {
      throw error
    })
}

export const updateExperienceService = async ({
  id,
  data,
}: {
  id: number
  data: IUpdateExperience
}): Promise<IExperience> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/experiences/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to update experience')
    })
    .catch((error) => {
      throw error
    })
}

export const deleteExperienceService = async (
  id: number
): Promise<IExperience> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/experiences/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to delete project')
    })
    .catch((error) => {
      throw error
    })
}
