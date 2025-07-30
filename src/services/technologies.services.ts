import {
  IAddTag,
  ICreateTechnology,
  IRemoveTag,
  ITechnology,
  IUpdateTechnology,
} from '../types'

export const getTechnologiesByPageService = async ({
  offset,
  limit = 10,
  search,
}: {
  offset?: number
  limit?: number | null
  search?: string | null
}) => {
  const token = sessionStorage.getItem('token') ?? ''
  let params = ''
  if (offset && limit) {
    params = params + `offset=${offset}&limit=${limit}&`
  }
  if (search) {
    params = params + `name=${search}`
  }

  return await fetch(`http://localhost:8080/api/v1/technologies?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to fetch technologies')
    })
    .catch((error) => {
      throw error
    })
}

export const getTechnologyByIdService = async (id: number) => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`http://localhost:8080/api/v1/technologies/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to fetch technology')
    })
    .catch((error) => {
      throw error
    })
}

export const createTechnologyService = async (
  data: ICreateTechnology
): Promise<ITechnology> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`http://localhost:8080/api/v1/technologies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to create new technology')
    })
    .catch((error) => {
      throw error
    })
}

export const updateTechnologyService = async ({
  id,
  data,
}: {
  id: number
  data: IUpdateTechnology
}): Promise<ITechnology> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`http://localhost:8080/api/v1/technologies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to update technology')
    })
    .catch((error) => {
      throw error
    })
}

export const deleteTechnologyService = async (
  id: number
): Promise<ITechnology> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`http://localhost:8080/api/v1/technologies/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to delete technology')
    })
    .catch((error) => {
      throw error
    })
}

export const uploadTechnologyIconService = async (file: File) => {
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'portfolio_technologies_presets')
  data.append('cloud_name', 'dgri2oqoj')

  return await fetch('https://api.cloudinary.com/v1_1/dgri2oqoj/image/upload', {
    method: 'POST',
    body: data,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}

export const addTagToTechnologyService = async (
  data: IAddTag
): Promise<ITechnology> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`http://localhost:8080/api/v1/technologies/add-tag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to add tag to technology')
    })
    .catch((error) => {
      throw error
    })
}

export const removeTagFromTechnologyService = async (
  data: IRemoveTag
): Promise<ITechnology> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`http://localhost:8080/api/v1/technologies/remove-tag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to remove tag from technology')
    })
    .catch((error) => {
      throw error
    })
}
