import { IUpdateUserFormData, IUser } from '../types'

export const getUsersByPageService = async ({
  offset,
  limit = 10,
  searchValue,
  searchBy,
}: {
  offset: number
  limit?: number
  searchValue?: string | null
  searchBy?: 'email' | 'firstName' | 'lastName' | null
}) => {
  let searchParam = ''
  if (searchValue && searchBy) {
    searchParam = `&${searchBy}=${searchValue}`
  }
  const token = sessionStorage.getItem('token') ?? ''

  return await fetch(
    `${import.meta.env.VITE_PROJECTS_ENDPOINT}/users?offset=${offset}&limit=${limit}${searchParam}`,
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
      throw new Error('Failed to fetch users')
    })
    .catch((error) => {
      throw error
    })
}

export const getUserByIdService = async (id: number | string) => {
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/users/${id}`)
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to fetch user')
    })
    .catch((error) => {
      throw error
    })
}

export const createUserService = async ({
  data,
}: {
  data: IUpdateUserFormData
}): Promise<IUser> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to create new user')
    })
    .catch((error) => {
      throw error
    })
}

export const editUserService = async ({
  data,
  id,
}: {
  data: IUpdateUserFormData
  id: string | number
}): Promise<IUser> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to edit user')
    })
    .catch((error) => {
      throw error
    })
}

export const uploadAvatarService = async (file: File) => {
  const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'portfolio_avatar_presets')
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

export const deleteUserService = async (id: number): Promise<IUser> => {
  const token = sessionStorage.getItem('token') ?? ''
  return await fetch(`${import.meta.env.VITE_PROJECTS_ENDPOINT}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to delete user')
    })
    .catch((error) => {
      throw error
    })
}
