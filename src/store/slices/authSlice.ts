import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  loginUser,
  sendRecoveryEmail,
  updatePassword,
} from '../../services/authServices'
import { displayNotification } from './uiSlice'

interface IState {
  token?: string | null
  loading: boolean
  error: null | string
  sent?: boolean
  changed?: boolean
}

export const initialState: IState = {
  token: sessionStorage.getItem('token') ?? null,
  loading: false,
  error: null,
  sent: false,
  changed: false,
}

export const login = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const response = await loginUser({ email, password })
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Error: wrong credentials.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const recoverPassword = createAsyncThunk(
  'auth/recoverPassword',
  async (email: string, { dispatch }) => {
    try {
      const response = await sendRecoveryEmail(email)
      dispatch(
        displayNotification({
          text: 'Email sent successfully!',
          type: 'success',
        })
      )
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to send recovery email.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    { token, password }: { token: string; password: string },
    { dispatch }
  ) => {
    try {
      const response = await updatePassword({ token, password })
      dispatch(
        displayNotification({
          text: 'Failed to change password.',
          type: 'success',
        })
      )
      setTimeout(() => {
        window.location.assign('/')
      }, 1000)
      return response
    } catch (error) {
      dispatch(
        displayNotification({
          text: 'Failed to change password.',
          type: 'error',
        })
      )
      console.error(error)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action?.payload?.token ?? null
        if (action?.payload?.token)
          sessionStorage.setItem('token', action.payload.token as string)
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
      })
      .addCase(recoverPassword.pending, (state) => {
        state.loading = true
        state.sent = false
      })
      .addCase(recoverPassword.fulfilled, (state) => {
        state.loading = false
        state.sent = true
      })
      .addCase(recoverPassword.rejected, (state) => {
        state.loading = false
        state.sent = false
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true
        state.changed = false
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false
        state.changed = true
      })
      .addCase(changePassword.rejected, (state) => {
        state.loading = false
        state.changed = false
      })
  },
})

export default authSlice.reducer
