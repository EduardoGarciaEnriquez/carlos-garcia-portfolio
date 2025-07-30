import React, { useState } from 'react'

import CloseIcon from '../../icons/close'
import SearchIcon from '../../icons/search'

type SearchBarProps =
  | {
      options: { text: string; value: string }[]
      onChangeSelect: (value: string | null) => void
      selectorValue: string
      onChangeInput: (value: string | null) => void
      inputValue: string
    }
  | {
      options?: undefined
      onChangeSelect?: undefined
      selectorValue?: undefined
      onChangeInput: (value: string | null) => void
      inputValue: string
    }

const SearchBar = ({
  options,
  onChangeSelect,
  onChangeInput,
  selectorValue,
  inputValue,
}: SearchBarProps) => {
  const [selector, setSelector] = useState<string>(selectorValue || '')
  const [input, setInput] = useState<string>(inputValue || '')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const selector = e.currentTarget.elements.namedItem(
      'search-dropdown'
    ) as HTMLSelectElement
    const { value: inputValue } = e.currentTarget.elements.namedItem(
      'search-input'
    ) as HTMLInputElement

    onChangeInput(inputValue || null)
    onChangeSelect?.(selector?.value || null)
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onChangeInput(null)
    onChangeSelect?.(null)
  }

  const showSelect = options?.length !== 0 && !!onChangeSelect

  return (
    <form className="flex" onSubmit={handleSubmit} role="search">
      {showSelect && (
        <select
          id="search-dropdown"
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          required={showSelect}
          aria-label="Search By"
          value={selector}
          onChange={(e) => {
            setSelector(e.target.value)
          }}
        >
          <option value="" disabled>
            Search By
          </option>
          {options?.map(({ text, value }: { text: string; value: string }) => {
            return (
              <option key={value} value={value}>
                {text}
              </option>
            )
          })}
        </select>
      )}
      <div className="relative w-full">
        <input
          type="search"
          id="search-input"
          className={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 ${
            showSelect ? 'rounded-e-lg' : 'rounded-lg'
          }`}
          placeholder="Search..."
          required
          aria-label="Search"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
        {inputValue && (
          <button
            type="reset"
            className="absolute top-0 end-12 h-full text-sm font-medium text-gray-500 hover:text-gray-300 dark:text-gray-300 dark:hover:text-gray-500"
            onClick={handleReset}
            aria-label="Clear search"
          >
            <span className="sr-only">Clear search</span>
            <CloseIcon />
          </button>
        )}
        <button
          type="submit"
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
