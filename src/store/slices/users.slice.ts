import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  deleteUserService,
  editUserService,
  getUserByIdService,
  getUsersByPageService,
} from '../../services/users.services'

import { IUpdateUserFormData, IUser } from '../../types'
import { displayNotification } from './uiSlice'

interface IState {
  user?: IUser | null

  loadingFetchUser: boolean
  errorFetchUser: null | string

  loadingUpdateUser: boolean
  errorUpdateUser: null | string

  users: IUser[] | []
  totalPages: number
  loadingFetchUsers: boolean
  errorFetchUsers: null | string
}

export const initialState: IState = {
  user: null,

  loadingFetchUser: false,
  errorFetchUser: null,

  loadingUpdateUser: false,
  errorUpdateUser: null,

  users: [],
  totalPages: 1,
  loadingFetchUsers: false,
  errorFetchUsers: null,
}

export const fetchUsersByPage = createAsyncThunk(
  'users/fetchUsersByPage',
  async (
    {
      page = 1,
      limit = 10,
      searchValue,
      searchBy,
    }: {
      page?: number
      limit?: number
      searchValue?: string | null
      searchBy?: 'email' | 'firstName' | 'lastName' | null
    },
    { dispatch }
  ) => {
    try {
      const response = await getUsersByPageService({
        offset: (page - 1) * limit,
        limit,
        searchBy,
        searchValue,
      })
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load users.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: number | string, { dispatch }) => {
    try {
      const response = await getUserByIdService(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load user.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (
    { id, data }: { id: number; data: IUpdateUserFormData },
    { dispatch }
  ) => {
    try {
      const response = await editUserService({ id, data })
      dispatch(
        displayNotification({
          text: 'User updated successfully.',
          type: 'success',
        })
      )
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load user.',
          type: 'error',
        })
      )
      console.error(error)
    }
    fetchUserById(id)
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { dispatch }) => {
    try {
      const response = await deleteUserService(id)
      dispatch(
        displayNotification({
          text: 'User deleted successfully.',
          type: 'success',
        })
      )
      fetchUsersByPage({ page: 1 })
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load user.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loadingFetchUser = true
        state.errorFetchUser = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loadingFetchUser = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loadingFetchUser = false
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingUpdateUser = true
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loadingUpdateUser = false
      })
      .addCase(updateUser.rejected, (state) => {
        state.loadingUpdateUser = false
      })
      .addCase(fetchUsersByPage.pending, (state) => {
        state.loadingFetchUsers = true
      })
      .addCase(fetchUsersByPage.fulfilled, (state, action) => {
        state.loadingFetchUsers = false
        state.users = action.payload.users ?? []
        state.totalPages = action.payload.totalPages || 1
      })
      .addCase(fetchUsersByPage.rejected, (state) => {
        state.loadingFetchUsers = false
      })
      .addCase(deleteUser.pending, (state) => {
        state.loadingFetchUsers = true
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loadingFetchUsers = false
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loadingFetchUsers = false
      })
  },
})

export default usersSlice.reducer
