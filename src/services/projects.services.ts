import {
  IAddTechnology,
  ICreateProject,
  IProject,
  IRemoveTechnology,
  IUpdateProject,
} from '../types'

export const getProjectsByPageService = async ({
  offset,
  limit = 10,
  search,
}: {
  offset: number
  limit?: number
  search?: string | null
}) => {
  const token = sessionStorage.getItem('token') ?? ''
  let searchParam = ''
  if (search) {
    searchParam = `&name=${search}`
  }

  return await fetch(
    `${import.meta.env.VITE_PROJECTS_ENDPOINT}/projects?offset=${offset}&limit=${limit}${searchParam}`,
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
      throw new Error('Failed to fetch projects')
    })
    .catch((error) => {
      throw error
    })
}

export const getProjectByIdService = async (id: number) => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/projects/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to fetch project')
    })
    .catch((error) => {
      throw error
    })
}

export const createProjectService = async (
  data: ICreateProject
): Promise<IProject> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to create project')
    })
    .catch((error) => {
      throw error
    })
}

export const updateProjectService = async ({
  id,
  data,
}: {
  id: number
  data: IUpdateProject
}): Promise<IProject> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to update project')
    })
    .catch((error) => {
      throw error
    })
}

export const deleteProjectService = async (id: number): Promise<IProject> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/projects/${id}`, {
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

export const uploadProjectCoverService = async (file: File) => {
  const data = new FormData()
  const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  data.append('file', file)
  data.append('upload_preset', 'portfolio_projects_presets')
  data.append('cloud_name', cloudinary_name)

  return await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`,
    {
      method: 'POST',
      body: data,
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}

export const addTechnologyToProjectService = async (
  data: IAddTechnology
): Promise<IProject> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/projects/add-tech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to add technology to project')
    })
    .catch((error) => {
      throw error
    })
}

export const removeTechnologyFromProjectService = async (
  data: IRemoveTechnology
): Promise<IProject> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/projects/remove-tech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to remove technology from project')
    })
    .catch((error) => {
      throw error
    })
}
