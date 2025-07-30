import { useAppDispatch, useAppSelector } from '../../store/redux-hooks'
import { toggleTheme } from '../../store/slices/uiSlice'
import { AppDispatch, IRootState } from '../../store/store'

import { useNavigate } from 'react-router-dom'
import moonIcon from '../../assets/moon.svg'
import sunIcon from '../../assets/sun.svg'
import Avatar from './avatar'

function HomeHeader() {
  const { isThemeDark } = useAppSelector((state: IRootState) => state.ui)
  const { user } = useAppSelector((state: IRootState) => state.users)

  const dispatch = useAppDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleOnClick = () => {
    dispatch(toggleTheme())
  }

  const handleNavigate = (section: string) => {
    navigate(`/#${section}`)
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById(section)?.offsetTop,
        behavior: 'smooth',
      })
    }, 100)
  }

  return (
    <header className="w-full fixed top-0 backdrop-blur-2xl z-10 py-2 md:py-0">
      <div className="flex justify-between items-center py-3 w-[90vw] max-w-[768px] mx-auto">
        <div className="hidden md:block">
          <Avatar image={user?.avatar ?? undefined} href="/login" />
        </div>
        <button onClick={handleOnClick}>
          <img
            src={isThemeDark ? sunIcon : moonIcon}
            alt="toggle-theme-icon"
            className="h-8 w-auto"
          />
        </button>
        <nav className="flex justify-end w-full md:w-auto gap-4 md:gap-4 dark:text-gray-100 text-gray-800 transition-all duration-500 ease-in-out">
          <span onClick={() => handleNavigate('about')}>About</span>
          <span onClick={() => handleNavigate('experience')}>Experience</span>
          <span onClick={() => handleNavigate('my-stack')}>Stack</span>
          <span onClick={() => handleNavigate('projects')}>Projects</span>
        </nav>
      </div>
    </header>
  )
}

export default HomeHeader
