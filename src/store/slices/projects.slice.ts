import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  addTechnologyToProjectService,
  createProjectService,
  deleteProjectService,
  getProjectByIdService,
  getProjectsByPageService,
  removeTechnologyFromProjectService,
  updateProjectService,
} from '../../services/projects.services'

import {
  IAddTechnology,
  ICreateProject,
  IProject,
  IRemoveTechnology,
  IUpdateProject,
} from '../../types'
import { displayNotification } from './uiSlice'

interface IState {
  project?: IProject | null

  loadingFetchProject: boolean
  errorFetchProject: null | string

  loadingUpdateProject: boolean
  errorUpdateProject: null | string

  loadingCreateProject: boolean
  errorCreateProject: null | string

  loadingAddRemoveTechnology: boolean

  projects: IProject[] | []
  totalPages: number
  loadingFetchProjects: boolean
  errorFetchProjects: null | string
}

export const initialState: IState = {
  project: null,

  loadingFetchProject: false,
  errorFetchProject: null,

  loadingCreateProject: false,
  errorCreateProject: null,

  loadingUpdateProject: false,
  errorUpdateProject: null,

  loadingAddRemoveTechnology: false,

  projects: [],
  totalPages: 1,
  loadingFetchProjects: false,
  errorFetchProjects: null,
}

export const fetchProjectsByPage = createAsyncThunk(
  'projects/fetchProjectsByPage',
  async (
    {
      page = 1,
      limit = 10,
      search,
    }: { page?: number; limit?: number; search?: string | null },
    { dispatch }
  ) => {
    try {
      const response = await getProjectsByPageService({
        offset: (page - 1) * limit,
        limit,
        search,
      })
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to load projects.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: number, { dispatch }) => {
    try {
      const response = await getProjectByIdService(id)
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

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: number; data: IUpdateProject }, { dispatch }) => {
    try {
      const response = await updateProjectService({ id, data })
      dispatch(
        displayNotification({
          text: 'Project updated successfully!',
          type: 'success',
        })
      )
      fetchProjectById(id)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to update project.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (data: ICreateProject, { dispatch }) => {
    try {
      const response = await createProjectService(data)
      dispatch(
        displayNotification({
          text: 'Project created successfully!',
          type: 'success',
        })
      )
      setTimeout(() => {
        window.location.assign('/admin/projects')
      }, 600)
      dispatch(fetchProjectsByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to create project.',
          type: 'error',
        })
      )
      throw error
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: number, { dispatch }) => {
    try {
      const response = await deleteProjectService(id)
      dispatch(
        displayNotification({
          text: 'Project successfully deleted!',
          type: 'success',
        })
      )
      dispatch(fetchProjectsByPage({}))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to delete project.',
          type: 'error',
        })
      )
      console.log(error)
    }
  }
)

export const addTechnology = createAsyncThunk(
  'projects/addTechnology',
  async (data: IAddTechnology, { dispatch }) => {
    try {
      const response = await addTechnologyToProjectService(data)

      dispatch(fetchProjectById(data.projectId))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to add technology to project.',
          type: 'error',
        })
      )
      throw error
    }
  }
)

export const removeTechnology = createAsyncThunk(
  'projects/removeTechnology',
  async (data: IRemoveTechnology, { dispatch }) => {
    try {
      const response = await removeTechnologyFromProjectService(data)
      dispatch(fetchProjectById(data.projectId))
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to remove technology from project.',
          type: 'error',
        })
      )
      throw error
    }
  }
)

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsByPage.pending, (state) => {
        state.loadingFetchProjects = true
        state.errorFetchProjects = null
      })
      .addCase(fetchProjectsByPage.fulfilled, (state, action) => {
        state.loadingFetchProjects = false
        state.projects = action.payload.projects ?? []
        state.totalPages = action.payload.totalPages || 1
        state.errorFetchProjects = null
      })
      .addCase(fetchProjectsByPage.rejected, (state, action) => {
        state.loadingFetchProjects = false
        state.errorFetchProjects =
          action.error.message || 'Failed to fetch projects'
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loadingFetchProject = true
        state.errorFetchProject = null
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loadingFetchProject = false
        state.project = action.payload
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loadingFetchProject = false
        state.errorFetchProject =
          action.error.message || 'Failed to fetch project'
      })
      .addCase(updateProject.pending, (state) => {
        state.loadingUpdateProject = true
        state.errorUpdateProject = null
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loadingUpdateProject = false
        state.project = action.payload
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loadingUpdateProject = false
        state.errorUpdateProject =
          action.error.message || 'Failed to update project'
      })
      .addCase(createProject.pending, (state) => {
        state.loadingCreateProject = true
        state.errorCreateProject = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loadingCreateProject = false
        state.project = action.payload
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loadingCreateProject = false
        state.errorCreateProject =
          action.error.message || 'Failed to create project'
      })
      .addCase(deleteProject.pending, (state) => {
        state.loadingFetchProjects = true
        state.errorFetchProjects = null
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.loadingFetchProjects = false
        state.errorFetchProjects = null
        state.totalPages = Math.max(1, state.totalPages)
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loadingFetchProjects = false
        state.errorFetchProjects =
          action.error.message || 'Failed to delete project'
      })
      .addCase(addTechnology.pending, (state) => {
        state.loadingAddRemoveTechnology = true
      })
      .addCase(addTechnology.fulfilled, (state) => {
        state.loadingAddRemoveTechnology = false
      })
      .addCase(addTechnology.rejected, (state) => {
        state.loadingAddRemoveTechnology = false
      })
      .addCase(removeTechnology.pending, (state) => {
        state.loadingAddRemoveTechnology = true
      })
      .addCase(removeTechnology.fulfilled, (state) => {
        state.loadingAddRemoveTechnology = false
      })
      .addCase(removeTechnology.rejected, (state) => {
        state.loadingAddRemoveTechnology = false
      })
  },
})

export default projectsSlice.reducer
