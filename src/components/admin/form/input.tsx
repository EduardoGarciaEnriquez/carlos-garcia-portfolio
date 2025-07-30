import React, { useState } from 'react'
import EyeOffIcon from '../../icons/eye-off'
import EyeOnIcon from '../../icons/eye-on'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  isDisabled?: boolean
  error?: string
}

const Input = ({ label, isDisabled, error, type, ...rest }: InputProps) => {
  const [inputType, setInputType] = useState<'text' | 'password'>('text')

  if (type === 'password') {
    return (
      <div className="mb-4">
        <label className="block text-sm dark:text-gray-200 text-gray-800">
          {label}
        </label>
        <div className="relative">
          <input
            {...rest}
            type={inputType}
            className={`w-full p-2 border rounded-md transition-all duration-500 ease-in-out ${
              !isDisabled
                ? 'border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 text-gray-600 dark:text-gray-300'
                : 'bg-gray-200 dark:bg-gray-600 dark:border-gray-600 cursor-not-allowed text-gray-400'
            }`}
            disabled={isDisabled}
          />
          <span
            className="absolute right-2 top-3 cursor-pointer text-gray-600 dark:text-gray-300"
            onClick={() =>
              setInputType(inputType === 'password' ? 'text' : 'password')
            }
          >
            {inputType === 'password' ? <EyeOnIcon /> : <EyeOffIcon />}
          </span>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
  return (
    <div className="mb-4">
      <label className="block text-sm dark:text-gray-200 text-gray-800">
        {label}
      </label>
      <input
        {...rest}
        className={`w-full p-2 border rounded-md transition-all duration-500 ease-in-out ${
          !isDisabled
            ? 'border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 text-gray-600 dark:text-gray-300'
            : 'bg-gray-200 dark:bg-gray-600 dark:border-gray-600 cursor-not-allowed text-gray-400'
        }`}
        disabled={isDisabled}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default Input
