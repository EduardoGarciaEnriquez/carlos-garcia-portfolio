import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  updateTechnologyService,
  getTechnologyByIdService,
  getTechnologiesByPageService,
  createTechnologyService,
  deleteTechnologyService,
  addTagToTechnologyService,
  removeTagFromTechnologyService,
} from '../../services/technologies.services'

import {
  IUpdateTechnology,
  ITechnology,
  ICreateTechnology,
  IAddTag,
  IRemoveTag,
} from '../../types'
import { displayNotification } from './uiSlice'

interface IState {
  technology?: ITechnology | null

  loadingFetchTechnology: boolean
  errorFetchTechnology: null | string

  loadingUpdateTechnology: boolean
  errorUpdateTechnology: null | string

  loadingCreateTechnology: boolean
  errorCreateTechnology: null | string

  loadingAddRemoveTag: boolean

  technologies: ITechnology[] | []
  totalPages: number
  loadingFetchTechnologies: boolean
  errorFetchTechnologies: null | string
}

export const initialState: IState = {
  technology: null,

  loadingFetchTechnology: false,
  errorFetchTechnology: null,

  loadingUpdateTechnology: false,
  errorUpdateTechnology: null,

  loadingCreateTechnology: false,
  errorCreateTechnology: null,

  loadingAddRemoveTag: false,

  technologies: [],
  totalPages: 1,
  loadingFetchTechnologies: false,
  errorFetchTechnologies: null,
}

export const fetchTechnologiesByPage = createAsyncThunk(
  'technologies/fetchTechnologiesByPage',
  async (
    {
      page,
      limit = 10,
      search,
    }: {
      page?: number
      limit?: number
      search?: string | null
    },
    { dispatch }
  ) => {
    const offset = page && (page - 1) * limit
    try {
      const response = await getTechnologiesByPageService({
        offset,
        limit,
        search,
      })
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to fetch technologies.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const fetchTechnologyById = createAsyncThunk(
  'technologies/fetchTechnologyById',
  async (id: number, { dispatch }) => {
    try {
      const response = await getTechnologyByIdService(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to fetch technology.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const updateTechnology = createAsyncThunk(
  'technologies/updateTechnology',
  async (
    { id, data }: { id: number; data: IUpdateTechnology },
    { dispatch }
  ) => {
    try {
      const response = await updateTechnologyService({ id, data })
      dispatch(
        displayNotification({
          text: 'Technology updated successfully!',
          type: 'success',
        })
      )
      fetchTechnologyById(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to update technology.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const createTechnology = createAsyncThunk(
  'technologies/createTechnology',
  async (data: ICreateTechnology, { dispatch }) => {
    try {
      const response = await createTechnologyService(data)
      dispatch(
        displayNotification({
          text: 'Technology created successfully!',
          type: 'success',
        })
      )
      setTimeout(() => {
        window.location.assign('/admin/technologies')
      }, 600)
      dispatch(fetchTechnologiesByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to create technology.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const deleteTechnology = createAsyncThunk(
  'technologies/deleteTechnology',
  async (id: number, { dispatch }) => {
    try {
      const response = await deleteTechnologyService(id)
      dispatch(
        displayNotification({
          text: 'Technology successfully deleted!',
          type: 'success',
        })
      )
      dispatch(fetchTechnologiesByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to delete technology.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const addTagToTechnology = createAsyncThunk(
  'technologies/addTagToTechnology',
  async (data: IAddTag, { dispatch }) => {
    try {
      const response = await addTagToTechnologyService(data)

      dispatch(fetchTechnologyById(data.technologyId))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to add tag to technology.',
          type: 'error',
        })
      )
      throw error
    }
  }
)

export const removeTagFromTechnology = createAsyncThunk(
  'technologies/removeTagFromTechnology',
  async (data: IRemoveTag, { dispatch }) => {
    try {
      const response = await removeTagFromTechnologyService(data)
      dispatch(fetchTechnologyById(data.technologyId))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to remove tag from technology.',
          type: 'error',
        })
      )
      throw error
    }
  }
)

export const technologiesSlice = createSlice({
  name: 'technologies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnologyById.pending, (state) => {
        state.loadingFetchTechnology = true
      })
      .addCase(fetchTechnologyById.fulfilled, (state, action) => {
        state.loadingFetchTechnology = false
        state.technology = action.payload
      })
      .addCase(fetchTechnologyById.rejected, (state) => {
        state.loadingFetchTechnology = false
      })
      .addCase(updateTechnology.pending, (state) => {
        state.loadingUpdateTechnology = true
      })
      .addCase(updateTechnology.fulfilled, (state, action) => {
        state.loadingUpdateTechnology = false
        state.technology = action.payload
      })
      .addCase(updateTechnology.rejected, (state) => {
        state.loadingUpdateTechnology = false
      })
      .addCase(createTechnology.pending, (state) => {
        state.loadingCreateTechnology = true
      })
      .addCase(createTechnology.fulfilled, (state) => {
        state.loadingCreateTechnology = false
      })
      .addCase(createTechnology.rejected, (state) => {
        state.loadingCreateTechnology = false
      })
      .addCase(fetchTechnologiesByPage.pending, (state) => {
        state.loadingFetchTechnologies = true
        state.errorFetchTechnologies = null
      })
      .addCase(fetchTechnologiesByPage.fulfilled, (state, action) => {
        state.loadingFetchTechnologies = false
        state.technologies = action.payload.technologies ?? []
        state.totalPages = action.payload.totalPages || 1
        state.errorFetchTechnologies = null
      })
      .addCase(fetchTechnologiesByPage.rejected, (state) => {
        state.loadingFetchTechnologies = false
      })
      .addCase(deleteTechnology.pending, (state) => {
        state.loadingFetchTechnologies = true
      })
      .addCase(deleteTechnology.fulfilled, (state) => {
        state.loadingFetchTechnologies = false
      })
      .addCase(deleteTechnology.rejected, (state) => {
        state.loadingFetchTechnologies = false
      })
      .addCase(addTagToTechnology.pending, (state) => {
        state.loadingAddRemoveTag = true
      })
      .addCase(addTagToTechnology.fulfilled, (state) => {
        state.loadingAddRemoveTag = false
      })
      .addCase(addTagToTechnology.rejected, (state) => {
        state.loadingAddRemoveTag = false
      })
      .addCase(removeTagFromTechnology.pending, (state) => {
        state.loadingAddRemoveTag = true
      })
      .addCase(removeTagFromTechnology.fulfilled, (state) => {
        state.loadingAddRemoveTag = false
      })
      .addCase(removeTagFromTechnology.rejected, (state) => {
        state.loadingAddRemoveTag = false
      })
  },
})

export default technologiesSlice.reducer
