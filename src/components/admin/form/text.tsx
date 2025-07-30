import React from 'react'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  isDisabled?: boolean
  error?: string
}

function TextArea({ label, isDisabled, error, ...rest }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor="bio"
        className="block text-sm dark:text-gray-200 text-gray-800"
      >
        {label}
      </label>
      <textarea
        placeholder="Write about yourself"
        {...rest}
        className={`w-full p-2 border rounded-md transition-all duration-500 ease-in-out ${
          !isDisabled
            ? 'border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 text-gray-600 dark:text-gray-300'
            : 'bg-gray-200 dark:bg-gray-600 dark:border-gray-600 cursor-not-allowed text-gray-400'
        }`}
        disabled={isDisabled}
      ></textarea>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default TextArea
