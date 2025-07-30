import LeftArrowIcon from '../icons/leftArrow'
import RightArrowIcon from '../icons/rightArrow'

function Pagination({
  total,
  page,
  next,
  prev,
}: {
  total: number
  page: number
  next: () => void
  prev: () => void
}) {
  const handlePrevClick = () => {
    if (page > 1) {
      prev()
    }
  }

  const handleNextClick = () => {
    if (page < total) {
      next()
    }
  }

  return (
    <div className="flex flex-row items-center justify-between mt-4">
      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-600 bg-gray-200 rounded-s-lg hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handlePrevClick}
      >
        <LeftArrowIcon />
        Prev
      </button>
      <span className="text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold text-gray-900 dark:text-white">
          {page}
        </span>
        /
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>
      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-600 bg-gray-200 rounded-e-lg hover:bg-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handleNextClick}
      >
        Next
        <RightArrowIcon />
      </button>
    </div>
  )
}

export default Pagination
