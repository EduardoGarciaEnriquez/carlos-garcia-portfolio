import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toggleSideBar } from '../../../store/slices/uiSlice'
import { AppDispatch, IRootState } from '../../../store/store'
import CloseIcon from '../../icons/close'
import Menu from './menu'

const Sidebar = () => {
  const { isSideBarVisible } = useSelector((state: IRootState) => state.ui)
  const dispatch = useDispatch<AppDispatch>()

  const handleOnClick = () => {
    dispatch(toggleSideBar())
  }

  return ReactDOM.createPortal(
    <div
      className={`flex flex-row fixed top-0 left-0 z-40 h-screen w-full transition-transform duration-500 ${
        !isSideBarVisible && '-translate-x-full'
      }`}
    >
      <div className="h-full w-full max-w-md relative overflow-auto p-4 bg-white dark:bg-gray-800">
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleOnClick}
        >
          <CloseIcon />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <Menu />
        </div>
      </div>
      <div
        className="md:h-full md:w-full bg-white dark:bg-black opacity-80"
        onClick={handleOnClick}
      />
    </div>,
    document.body
  )
}

export default Sidebar
