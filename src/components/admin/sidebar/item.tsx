import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleSideBar } from '../../../store/slices/uiSlice'
import { AppDispatch } from '../../../store/store'

const Item = ({
  href,
  icon,
  text,
}: {
  href: string
  icon: React.ReactElement
  text: string
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleOnClick = () => {
    dispatch(toggleSideBar())
  }

  return (
    <li onClick={handleOnClick} className="w-full">
      <Link
        to={`/admin/${href}`}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="ms-3">{text}</span>
      </Link>
    </li>
  )
}

export default Item
