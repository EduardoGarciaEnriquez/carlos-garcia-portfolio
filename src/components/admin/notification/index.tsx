import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { hideNotification } from '../../../store/slices/uiSlice'
import { AppDispatch, IRootState } from '../../../store/store'
import CloseIcon from '../../icons/close'
import ErrorIcon from '../../icons/error'
import InfoIcon from '../../icons/info'
import SuccessIcon from '../../icons/success'
import WarningIcon from '../../icons/warning'

function Notification() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    notificationType: type,
    notificationText: text,
    isNotificationVisible,
    notificationAutoCloseTime: autoCloseTime,
  } = useSelector((state: IRootState) => state.ui)

  const handleOnClick = () => {
    dispatch(hideNotification())
  }

  useEffect(() => {
    // Automatically hide the notification after the specified time
    if (isNotificationVisible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification())
      }, autoCloseTime)

      // Cleanup the timer on component unmount or when dependencies change
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotificationVisible, autoCloseTime])

  const NotificationType = () => {
    if (type === 'success') {
      return <Success text={text} onClose={handleOnClick} />
    } else if (type === 'error') {
      return <Error text={text} onClose={handleOnClick} />
    } else if (type === 'warning') {
      return <Warning text={text} onClose={handleOnClick} />
    } else if (type === 'info') {
      return <Info text={text} onClose={handleOnClick} />
    }
    // Default to info if no type matches
    return <Info text={text} onClose={handleOnClick} />
  }

  return ReactDOM.createPortal(
    <div
      className={`absolute bottom-0 left-0 right-0 ${
        !isNotificationVisible && 'hidden'
      }`}
    >
      <div className="w-[90vw] max-w-[768px] mx-auto mb-4 flex flex-row items-center justify-end">
        <div className="w-full max-w-[425px]">
          <NotificationType />
        </div>
      </div>
    </div>,
    document.body
  )
}

function Info({ text, onClose }: { text: string; onClose: () => void }) {
  const autoCloseTime = useSelector(
    (state: IRootState) => state.ui.notificationAutoCloseTime
  )
  const [progress, setProgress] = useState<boolean>(true)

  useEffect(() => {
    setProgress(true)
    const timeout = setTimeout(() => setProgress(false), 1)
    return () => clearTimeout(timeout)
  }, [autoCloseTime, text])

  return (
    <div
      className="relative flex items-center p-4 rounded mb-4 text-blue-800 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 overflow-hidden shadow-md"
      role="alert"
    >
      {/* Animated top border */}
      <div
        className="absolute left-0 top-0 h-1 bg-blue-400 dark:bg-blue-800 transition-all"
        style={{
          width: progress ? '100%' : '0%',
          transition: `width ${autoCloseTime}ms linear`,
        }}
      />
      <InfoIcon />
      <div className="ms-3 text-sm font-medium">{text}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Dismiss</span>
        <CloseIcon />
      </button>
    </div>
  )
}

function Success({ text, onClose }: { text: string; onClose: () => void }) {
  const autoCloseTime = useSelector(
    (state: IRootState) => state.ui.notificationAutoCloseTime
  )
  const [progress, setProgress] = useState<boolean>(true)

  useEffect(() => {
    setProgress(true)
    const timeout = setTimeout(() => setProgress(false), 1)
    return () => clearTimeout(timeout)
  }, [autoCloseTime, text])

  return (
    <div
      className="relative flex items-center p-4 rounded mb-4 text-green-800 bg-green-50 dark:text-green-400 dark:bg-gray-800 overflow-hidden shadow-md"
      role="alert"
    >
      {/* Animated top border */}
      <div
        className="absolute left-0 top-0 h-1 bg-green-500 transition-all"
        style={{
          width: progress ? '100%' : '0%',
          transition: `width ${autoCloseTime}ms linear`,
        }}
      />
      <SuccessIcon />
      <div className="ms-3 text-sm font-medium">{text}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
        onClick={onClose}
      >
        <span className="sr-only">Dismiss</span>
        <CloseIcon />
      </button>
    </div>
  )
}

function Error({ text, onClose }: { text: string; onClose: () => void }) {
  const autoCloseTime = useSelector(
    (state: IRootState) => state.ui.notificationAutoCloseTime
  )
  const [progress, setProgress] = useState<boolean>(true)

  useEffect(() => {
    setProgress(true)
    const timeout = setTimeout(() => setProgress(false), 1)
    return () => clearTimeout(timeout)
  }, [autoCloseTime, text])

  return (
    <div
      className="relative flex items-center p-4 rounded mb-4 text-red-800 bg-red-50 dark:text-red-400 dark:bg-gray-800 overflow-hidden shadow-md"
      role="alert"
    >
      {/* Animated top border */}
      <div
        className="absolute left-0 top-0 h-1 transition-all dark:bg-red-800 bg-red-400"
        style={{
          width: progress ? '100%' : '0%',
          transition: `width ${autoCloseTime}ms linear`,
        }}
      />
      <ErrorIcon />
      <div className="ms-3 text-sm font-medium">{text}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        onClick={onClose}
      >
        <span className="sr-only">Dismiss</span>
        <CloseIcon />
      </button>
    </div>
  )
}

function Warning({ text, onClose }: { text: string; onClose: () => void }) {
  const autoCloseTime = useSelector(
    (state: IRootState) => state.ui.notificationAutoCloseTime
  )
  const [progress, setProgress] = useState<boolean>(true)

  useEffect(() => {
    setProgress(true)
    const timeout = setTimeout(() => setProgress(false), 1)
    return () => clearTimeout(timeout)
  }, [autoCloseTime, text])

  return (
    <div
      id="alert-border-4"
      className="relative flex items-center p-4 rounded mb-4 text-yellow-800 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 overflow-hidden shadow-md"
      role="alert"
    >
      {/* Animated top border */}
      <div
        className="absolute left-0 top-0 h-1 transition-all bg-yellow-400"
        style={{
          width: progress ? '100%' : '0%',
          transition: `width ${autoCloseTime}ms linear`,
        }}
      />
      <WarningIcon />
      <div className="ms-3 text-sm font-medium">{text}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
        onClick={onClose}
      >
        <span className="sr-only">Dismiss</span>
        <CloseIcon />
      </button>
    </div>
  )
}

export default Notification
