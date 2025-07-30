import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  createTagService,
  deleteTagService,
  getTagsByIdService,
  getTagsByPageService,
  updateTagService,
} from '../../services/tags.services'

import { ICreateTag, ITag, IUpdateTag } from '../../types'
import { displayNotification } from './uiSlice'

interface IState {
  tag?: ITag | null

  loadingFetchTag: boolean
  errorFetchTag: null | string

  loadingUpdateTag: boolean
  errorUpdateTag: null | string

  loadingCreateTag: boolean
  errorCreateTag: null | string

  tags: ITag[] | []
  totalPages: number
  loadingFetchTags: boolean
  errorFetchTags: null | string
}

export const initialState: IState = {
  tag: null,

  loadingFetchTag: false,
  errorFetchTag: null,

  loadingUpdateTag: false,
  errorUpdateTag: null,

  loadingCreateTag: false,
  errorCreateTag: null,

  tags: [],
  totalPages: 1,
  loadingFetchTags: false,
  errorFetchTags: null,
}

export const fetchTagsByPage = createAsyncThunk(
  'tags/fetchTagsByPage',
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
      const response = await getTagsByPageService({
        offset: (page - 1) * limit,
        limit,
        search,
      })
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load tags.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const fetchTagById = createAsyncThunk(
  'tags/fetchTagById',
  async (id: number, { dispatch }) => {
    try {
      const response = await getTagsByIdService(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load project.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const updateTag = createAsyncThunk(
  'tags/updateTag',
  async ({ id, data }: { id: number; data: IUpdateTag }, { dispatch }) => {
    try {
      const response = await updateTagService({ id, data })
      dispatch(
        displayNotification({
          text: 'Tag updated successfully!',
          type: 'success',
        })
      )
      fetchTagById(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to update tag.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (data: ICreateTag, { dispatch }) => {
    try {
      const response = await createTagService(data)
      dispatch(
        displayNotification({
          text: 'Tag created successfully!',
          type: 'success',
        })
      )
      setTimeout(() => {
        window.location.assign('/admin/tags')
      }, 600)
      dispatch(fetchTagsByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to create tag.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (id: number, { dispatch }) => {
    try {
      const response = await deleteTagService(id)
      dispatch(
        displayNotification({
          text: 'Tag deleted successfully!',
          type: 'success',
        })
      )
      dispatch(fetchTagsByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to delete tag.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagById.pending, (state) => {
        state.loadingFetchTag = true
      })
      .addCase(fetchTagById.fulfilled, (state, action) => {
        state.loadingFetchTag = false
        state.tag = action.payload
      })
      .addCase(fetchTagById.rejected, (state) => {
        state.loadingFetchTag = false
      })
      .addCase(updateTag.pending, (state) => {
        state.loadingUpdateTag = true
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loadingUpdateTag = false
        state.tag = action.payload
      })
      .addCase(updateTag.rejected, (state) => {
        state.loadingUpdateTag = false
      })
      .addCase(createTag.pending, (state) => {
        state.loadingCreateTag = true
      })
      .addCase(createTag.fulfilled, (state) => {
        state.loadingCreateTag = false
      })
      .addCase(createTag.rejected, (state) => {
        state.loadingCreateTag = false
      })
      .addCase(fetchTagsByPage.pending, (state) => {
        state.loadingFetchTags = true
      })
      .addCase(fetchTagsByPage.fulfilled, (state, action) => {
        state.loadingFetchTags = false
        state.tags = action.payload.tags ?? []
        state.totalPages = action.payload.totalPages || 1
      })
      .addCase(fetchTagsByPage.rejected, (state) => {
        state.loadingFetchTags = false
      })
      .addCase(deleteTag.pending, (state) => {
        state.loadingFetchTags = true
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.loadingFetchTags = false
      })
      .addCase(deleteTag.rejected, (state) => {
        state.loadingFetchTags = false
      })
  },
})

export default tagsSlice.reducer
