import React, { useEffect, useRef, useState } from 'react'
import Badge from '../../common/badge'

export interface IOption {
  id: number
  label: string
  image?: string | null
  color?: string | null
}

function MultiSelector({
  label,
  placeholder,
  isDisabled,
  options,
  defaultOptions = [],
  addOption,
  removeOption,
}: {
  label: string
  placeholder: string
  isDisabled: boolean
  options: IOption[]
  defaultOptions?: IOption[]
  addOption: (optionId: number) => void
  removeOption: (optionId: number) => void
}) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [suggestions, setSuggestions] = useState<IOption[]>([])
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setActiveSuggestion(0)
    if (options) {
      const filtered = options
        .filter((opt) => !defaultOptions.some((sel) => sel.id === opt.id))
        .filter(({ label }) =>
          label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      setSuggestions(filtered)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, searchTerm])

  useEffect(() => {
    if (defaultOptions) setSelectedOptions(defaultOptions)
  }, [defaultOptions])

  useEffect(() => {
    if (isDisabled) {
      setSearchTerm('')
    }
  }, [isDisabled])

  const handleSelectOption = (option: IOption) => {
    setSearchTerm('')
    addOption(option.id)
  }

  const handleRemoveOption = (option: IOption) => {
    removeOption(option.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' &&
      (e.target as HTMLInputElement).value === '' &&
      selectedOptions.length > 0
    ) {
      const lastOption = selectedOptions[selectedOptions.length - 1]
      handleRemoveOption(lastOption)
    } else if (e.key === 'ArrowDown' && suggestions?.length > 0) {
      e.preventDefault()
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === 'ArrowUp' && suggestions?.length > 0) {
      e.preventDefault()
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
    } else if (
      e.key === 'Enter' &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.length
    ) {
      e.preventDefault()
      handleSelectOption(suggestions[activeSuggestion])
    }
  }

  const showSuggestions = () => {
    setIsFocused(true)
  }

  const hideSuggestions = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 300)
  }

  return (
    <div className="relative mb-4">
      <label className="block text-sm dark:text-gray-200 text-gray-800">
        {label}
      </label>
      <div
        className={`w-full flex items-center flex-wrap gap-2 p-2 border rounded-md transition-all duration-500 ease-in-out ${
          isDisabled
            ? 'bg-gray-200 dark:bg-gray-600 dark:border-gray-600 cursor-not-allowed text-gray-400'
            : 'border-gray-300 dark:border-gray-500 dark:bg-gray-700 bg-gray-50 text-gray-600 dark:text-gray-300'
        }`}
      >
        {/* Pills */}
        {selectedOptions.map((option) => {
          return (
            <span
              key={option.id + 'selected-option'}
              onClick={() => !isDisabled && handleRemoveOption(option)}
              className={isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            >
              <Badge
                variant="outlined"
                color={isDisabled ? 'gray' : undefined}
                prefix={
                  option?.image && (
                    <img src={option.image} className="h-2 w-auto" />
                  )
                }
                text={`${option.label}`}
                suffix={
                  isDisabled ? undefined : (
                    <span className="text-white text-sm">&times;</span>
                  )
                }
              />
            </span>
          )
        })}
        {/* input field with search suggestions */}
        <div className="w-full">
          <input
            disabled={isDisabled}
            className={`w-full border-none h-5 p-1 focus:outline-none bg-transparent ${
              isDisabled ? 'cursor-not-allowed' : ''
            }`}
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onFocus={showSuggestions}
            onBlur={hideSuggestions}
          />
          {/* Search Suggestions */}
          {isFocused && (
            <ul className="max-h-[300px] overflow-y-scroll list-none border-white bg-gray-50 dark:bg-gray-700 w-full mt-1">
              {suggestions?.map((suggestion: IOption, index: number) => {
                return (
                  <li
                    className={`flex items-center gap-2 py-2 px-2 cursor-pointer border-b border-white last:border-none hover:bg-white hover:text-gray-800 ${
                      index === activeSuggestion
                        ? 'bg-white text-gray-600 '
                        : ''
                    }`}
                    key={suggestion.id + 'suggestions'}
                    onMouseDown={() => handleSelectOption(suggestion)}
                  >
                    {suggestion?.image && (
                      <img
                        className="h-5"
                        src={suggestion.image}
                        alt={`${suggestion.label}`}
                      />
                    )}
                    <span>{suggestion.label}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default MultiSelector
