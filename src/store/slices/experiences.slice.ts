import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  createExperienceService,
  deleteExperienceService,
  getExperienceByIdService,
  getExperiencesByPageService,
  updateExperienceService,
} from '../../services/experiences.services'

import { ICreateExperience, IExperience, IUpdateExperience } from '../../types'
import { displayNotification } from './uiSlice'

interface IState {
  experience?: IExperience | null

  loadingFetchExperience: boolean
  errorFetchExperience: null | string

  loadingUpdateExperience: boolean
  errorUpdateExperience: null | string

  loadingCreateExperience: boolean
  errorCreateExperience: null | string

  experiences: IExperience[] | []
  totalPages: number
  loadingFetchExperiences: boolean
  errorFetchExperiences: null | string
}

export const initialState: IState = {
  experience: null,

  loadingFetchExperience: false,
  errorFetchExperience: null,

  loadingUpdateExperience: false,
  errorUpdateExperience: null,

  loadingCreateExperience: false,
  errorCreateExperience: null,

  experiences: [],
  totalPages: 1,
  loadingFetchExperiences: false,
  errorFetchExperiences: null,
}

export const fetchExperiencesByPage = createAsyncThunk(
  'experiences/fetchExperiencesByPage',
  async (
    {
      page = 1,
      limit = 10,
      search,
    }: {
      page?: number
      limit?: number
      search?: string | null
    },
    { dispatch }
  ) => {
    try {
      const response = await getExperiencesByPageService({
        offset: (page - 1) * limit,
        limit,
        search,
      })
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to fetch work experiences.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const fetchExperienceById = createAsyncThunk(
  'experiences/fetchExperienceById',
  async (id: number, { dispatch }) => {
    try {
      const response = await getExperienceByIdService(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load experience.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const updateExperience = createAsyncThunk(
  'experiences/updateExperience',
  async (
    { id, data }: { id: number; data: IUpdateExperience },
    { dispatch }
  ) => {
    try {
      const response = await updateExperienceService({ id, data })
      dispatch(
        displayNotification({
          text: 'Experiences updated successfully!',
          type: 'success',
        })
      )
      fetchExperienceById(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to update experience.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const createExperience = createAsyncThunk(
  'experiences/createExperience',
  async (data: ICreateExperience, { dispatch }) => {
    try {
      const response = await createExperienceService(data)
      dispatch(
        displayNotification({
          text: 'Experience created successfully!',
          type: 'success',
        })
      )
      setTimeout(() => {
        window.location.assign('/admin/experiences')
      }, 600)
      dispatch(fetchExperiencesByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to create experience.',
          type: 'error',
        })
      )
      console.log(error)
    }
  }
)

export const deleteExperience = createAsyncThunk(
  'experiences/deleteExperience',
  async (id: number, { dispatch }) => {
    try {
      const response = await deleteExperienceService(id)
      dispatch(
        displayNotification({
          text: 'Experience successfully deleted!',
          type: 'success',
        })
      )
      dispatch(fetchExperiencesByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to delete experience.',
          type: 'error',
        })
      )
      console.log(error)
    }
  }
)

export const experiencesSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiencesByPage.pending, (state) => {
        state.loadingFetchExperiences = true
        state.errorFetchExperiences = null
      })
      .addCase(fetchExperiencesByPage.fulfilled, (state, action) => {
        state.loadingFetchExperiences = false
        state.experiences = action.payload.experiences ?? []
        state.totalPages = action.payload.totalPages || 1
        state.errorFetchExperiences = null
      })
      .addCase(fetchExperiencesByPage.rejected, (state, action) => {
        state.loadingFetchExperiences = false
        state.errorFetchExperiences =
          action.error.message || 'Failed to fetch experiences'
      })
      .addCase(fetchExperienceById.pending, (state) => {
        state.loadingFetchExperience = true
        state.errorFetchExperience = null
      })
      .addCase(fetchExperienceById.fulfilled, (state, action) => {
        state.loadingFetchExperience = false
        state.experience = action.payload
      })
      .addCase(fetchExperienceById.rejected, (state, action) => {
        state.loadingFetchExperience = false
        state.errorFetchExperience =
          action.error.message || 'Failed to fetch experience'
      })
      .addCase(updateExperience.pending, (state) => {
        state.loadingUpdateExperience = true
        state.errorUpdateExperience = null
      })
      .addCase(updateExperience.fulfilled, (state) => {
        state.loadingUpdateExperience = false
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loadingUpdateExperience = false
        state.errorUpdateExperience =
          action.error.message || 'Failed to update experience'
      })

      .addCase(createExperience.pending, (state) => {
        state.loadingCreateExperience = true
        state.errorCreateExperience = null
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.loadingCreateExperience = false
        state.experience = action.payload
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loadingCreateExperience = false
        state.errorCreateExperience =
          action.error.message || 'Failed to create experience'
      })
      .addCase(deleteExperience.pending, (state) => {
        state.loadingFetchExperiences = true
        state.errorFetchExperiences = null
      })
      .addCase(deleteExperience.fulfilled, (state) => {
        state.loadingFetchExperiences = false
        state.errorFetchExperiences = null
        state.totalPages = Math.max(1, state.totalPages)
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loadingFetchExperiences = false
        state.errorFetchExperiences =
          action.error.message || 'Failed to delete experience'
      })
  },
})

export default experiencesSlice.reducer
