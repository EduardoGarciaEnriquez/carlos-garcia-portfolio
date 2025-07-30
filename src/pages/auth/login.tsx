import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../../components/admin/form/input'
import Notification from '../../components/admin/notification'
import Button from '../../components/common/button'
import HomeIcon from '../../components/icons/home'
import { login } from '../../store/slices/authSlice'
import { AppDispatch, IRootState } from '../../store/store'
import { loginSchema } from './schemas'

interface FormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  })
  const { loading, token } = useSelector((state: IRootState) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (data: FormData) => {
    dispatch(login(data))
  }

  React.useEffect(() => {
    if (token) {
      navigate('/admin')
    }
  }, [token, navigate])

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md w-80 transition-all duration-500 ease-in-out"
      >
        <div className="flex justify-between align-center mb-6">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
            icon={<HomeIcon />}
          />
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200 text-gray-800">
            Login
          </h2>
        </div>

        {/* Email */}
        <Input
          label="Email"
          type="email"
          id="e-mail"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
        />

        {/* Submit Button */}
        <Button
          variant="filled"
          color="primary"
          type="submit"
          className="w-full mx-auto"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Log In'}
        </Button>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link
            to="/recover-password"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
      <Notification />
    </div>
  )
}

export default Login
