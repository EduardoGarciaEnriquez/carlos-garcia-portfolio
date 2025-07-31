import { ICreateTag, ITag, IUpdateTag } from '../types'

export const getTagsByPageService = async ({
  offset,
  limit = 10,
  search,
}: {
  offset: number
  limit?: number
  search?: string | null
}) => {
  let searchParam = ''
  if (search) {
    searchParam = `&name=${search}`
  }
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(
    `${import.meta.env.VITE_PROJECTS_ENDPOINT}/tags?offset=${offset}&limit=${limit}${searchParam}`,
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
      throw new Error('Failed to fetch tags')
    })
    .catch((error) => {
      throw error
    })
}

export const getTagsByIdService = async (id: number) => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to fetch tag')
    })
    .catch((error) => {
      throw error
    })
}

export const createTagService = async (data: ICreateTag): Promise<ITag> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to create tag')
    })
    .catch((error) => {
      throw error
    })
}

export const updateTagService = async ({
  id,
  data,
}: {
  id: number
  data: IUpdateTag
}): Promise<ITag> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/tags/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to update tag')
    })
    .catch((error) => {
      throw error
    })
}

export const deleteTagService = async (id: number): Promise<ITag> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/tags/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to delete tag')
    })
    .catch((error) => {
      throw error
    })
}
