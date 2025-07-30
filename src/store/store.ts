import { configureStore } from '@reduxjs/toolkit'

import authSlice from './slices/authSlice'
import experiencesSlice from './slices/experiences.slice'
import uiSlice from './slices/uiSlice'
import usersSlice from './slices/users.slice'
import projectsSlice from './slices/projects.slice'
import tagsSlice from './slices/tags.slice'
import technologiesSlice from './slices/technologies.slice'

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    users: usersSlice,
    auth: authSlice,
    experience: experiencesSlice,
    project: projectsSlice,
    tag: tagsSlice,
    technology: technologiesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
