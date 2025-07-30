import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import Notification from '../../components/admin/notification'
import { recoverPassword } from '../../store/slices/authSlice'
import { AppDispatch, IRootState } from '../../store/store'
import { recoverPasswordSchema } from './schemas'

interface FormData {
  email: string
}

const RecoverPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(recoverPasswordSchema),
  })
  const { loading, sent } = useSelector((state: IRootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = ({ email }: { email: string }) => {
    dispatch(recoverPassword(email))
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-80 transition-all duration-500 ease-in-out"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200 text-gray-800">
          Recover Password
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm dark:text-gray-200 text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email')}
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 transition-all duration-500 ease-in-out"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading || sent}
        >
          {loading
            ? 'Loading...'
            : sent
            ? 'Email Sent!'
            : 'Send Recovery Email'}
          {sent && <span className="text-green-500 ml-2">✓</span>}
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

export default RecoverPassword
