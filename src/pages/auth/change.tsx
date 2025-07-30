import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import Notification from '../../components/admin/notification'
import { changePassword } from '../../store/slices/authSlice'
import { AppDispatch, IRootState } from '../../store/store'
import { changePasswordSchema } from './schemas'

interface FormData {
  password: string
  confirmPassword: string
}

const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema),
  })
  const { loading, changed } = useSelector((state: IRootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (data: FormData) => {
    const { password } = data
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) {
      console.error('No token found in the URL')
      return
    }
    dispatch(changePassword({ token, password }))
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-80 transition-all duration-500 ease-in-out"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200 text-gray-800">
          Change Password
        </h2>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm dark:text-gray-200 text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register('password')}
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 transition-all duration-500 ease-in-out"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm dark:text-gray-200 text-gray-800"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...register('confirmPassword')}
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 transition-all duration-500 ease-in-out"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading || changed}
        >
          {loading
            ? 'Loading...'
            : changed
            ? 'Password Changed'
            : 'Change Password'}
          {changed && <span className="text-green-500 ml-2">✓</span>}
        </button>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
      <Notification />
    </div>
  )
}

export default ChangePassword
