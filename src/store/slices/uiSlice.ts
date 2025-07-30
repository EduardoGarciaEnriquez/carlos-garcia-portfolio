import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  isThemeDark: boolean
  isSideBarVisible: boolean
  isNotificationVisible: boolean
  notificationText: string
  notificationType: 'info' | 'success' | 'error' | 'warning'
  notificationAutoCloseTime: number // in milliseconds
  modal: { isOpen: boolean; text: string }
}

const initialState: ThemeState = {
  isThemeDark: true,
  isSideBarVisible: false,
  isNotificationVisible: false,
  notificationText: 'default notification text',
  notificationType: 'info', // Default type
  notificationAutoCloseTime: 5000, // 5 seconds
  modal: { isOpen: false, text: '' },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isThemeDark = !state.isThemeDark
    },
    toggleSideBar: (state) => {
      state.isSideBarVisible = !state.isSideBarVisible
    },
    displayNotification: (state, action) => {
      state.isNotificationVisible = true
      state.notificationText = action.payload.text || ''
      state.notificationType = action.payload.type || 'info'
      state.notificationAutoCloseTime = action.payload.autoCloseTime || 5000 // Default to 5 seconds if not provided
    },
    hideNotification: (state) => {
      state.isNotificationVisible = false
      state.notificationText = ''
      state.notificationType = 'info'
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        text: action.payload.text,
      }
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, text: '' }
    },
  },
})

export const {
  toggleTheme,
  toggleSideBar,
  displayNotification,
  hideNotification,
  openModal,
  closeModal,
} = uiSlice.actions
export default uiSlice.reducer
