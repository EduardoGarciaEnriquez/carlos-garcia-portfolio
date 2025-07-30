import React from 'react'

interface SelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  isDisabled?: boolean
  error?: string
  options: ISelectorOption[]
}

export interface ISelectorOption {
  label: string
  value: string | number
}

function Selector({
  label,
  isDisabled,
  error,
  options = [],
  ...rest
}: SelectorProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor="availability"
        className="block text-sm dark:text-gray-200 text-gray-800"
      >
        {label}
      </label>
      <select
        {...rest}
        className={`w-full p-2 border rounded-md transition-all duration-500 ease-in-out ${
          !isDisabled
            ? 'border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 text-gray-600 dark:text-gray-300'
            : 'bg-gray-200 dark:bg-gray-600 dark:border-gray-600 cursor-not-allowed text-gray-400'
        }`}
        disabled={isDisabled}
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {options?.map(
          ({ label, value }: { label: string; value: string | number }) => {
            return (
              <option key={value} value={value}>
                {label}
              </option>
            )
          }
        )}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default Selector
