import React from 'react'

const Button = ({
  onClick = () => {},
  children,
  icon,
  size = 'sm',
  variant = 'filled',
  color,
  shape = 'rounded',
  disabled = false,
  className,
  type = 'button',
}: {
  onClick?: () => void
  children?: React.ReactElement | string
  icon?: React.ReactElement
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'filled' | 'outlined'
  color?: 'primary' | 'secondary' | 'danger' | 'success'
  shape?: 'rounded' | 'circle'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}) => {
  let textColor = ''
  let bgColor = ''
  let borderColor = ''
  let buttonSize = ''
  const borderRadius = shape === 'circle' ? 'rounded-full' : 'rounded-lg'
  const border = variant === 'outlined' ? 'border' : 'border-none'

  switch (size) {
    case 'xs':
      buttonSize = 'px-3 py-2 text-xs'
      break
    case 'sm':
      buttonSize = 'px-3 py-2 text-sm'
      break
    case 'md':
      buttonSize = 'px-5 py-2.5 text-sm'
      break
    case 'lg':
      buttonSize = 'px-5 py-2.5 text-base'
      break
    case 'xl':
      buttonSize = 'px-6 py-3.5 text-base'
      break
    default:
      buttonSize = 'px-3 py-2 text-sm'
      break
  }

  switch (color) {
    case 'primary':
      textColor =
        variant === 'outlined'
          ? 'text-blue-700'
          : 'dark:text-white text-blue-700 hover:text-white'
      bgColor =
        variant === 'outlined'
          ? 'bg-transparent'
          : 'dark:bg-blue-700 bg-blue-200 hover:bg-blue-800'
      borderColor = 'border-blue-700'
      break
    case 'secondary':
      textColor =
        variant === 'outlined'
          ? 'text-gray-600 dark:text-gray-300 hover:text-gray-400'
          : 'dark:text-white text-gray-700'
      bgColor =
        variant === 'outlined'
          ? 'bg-transparent hover:opacity-80'
          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700'
      borderColor = 'dark:border-gray-600 border-gray-300'
      break
    case 'danger':
      textColor =
        variant === 'outlined'
          ? 'text-red-700 hover:text-red-400'
          : 'dark:text-white text-red-700 hover:text-red-500'
      bgColor =
        variant === 'outlined'
          ? 'bg-transparent'
          : 'bg-red-200 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700'
      borderColor = 'border-red-700 hover:border-red-400'
      break
    case 'success':
      textColor =
        variant === 'outlined'
          ? 'text-green-700'
          : 'dark:text-white text-green-700'
      bgColor =
        variant === 'outlined'
          ? 'bg-transparent'
          : 'bg-green-200 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700'
      borderColor = 'border-green-700'
      break
    default:
      textColor = variant === 'outlined' ? 'text-blue-700' : 'text-white'
      bgColor =
        variant === 'outlined'
          ? 'bg-transparent'
          : 'bg-blue-700 hover:bg-blue-800'
      borderColor = 'border-blue-700'
      break
  }

  if (disabled) {
    textColor = 'text-gray-600 dark:text-gray-400'
    bgColor = 'bg-gray-200 dark:bg-gray-600'
    borderColor = 'border-gray-200'
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`focus:ring-4 font-medium focus:outline-none h-full flex items-center justify-center ${buttonSize} ${borderRadius} ${border} ${textColor} ${bgColor} ${borderColor} ${className}`}
      onClick={onClick}
    >
      {icon && icon}
      {children && children}
    </button>
  )
}

export default Button
