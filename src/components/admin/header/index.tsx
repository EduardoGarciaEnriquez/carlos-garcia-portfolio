import { useAppDispatch, useAppSelector } from '../../../store/redux-hooks'
import { toggleSideBar, toggleTheme } from '../../../store/slices/uiSlice'
import { AppDispatch, IRootState } from '../../../store/store'

import { useLocation } from 'react-router-dom'
import moonIcon from '../../../assets/moon.svg'
import sunIcon from '../../../assets/sun.svg'
import ExperiencesIcon from '../../icons/experiences'
import MenuIcon from '../../icons/menu'
import ProfileIcon from '../../icons/profile'
import ProjectsIcon from '../../icons/projects'
import TechnologiesIcon from '../../icons/technologies'
import UsersIcon from '../../icons/users'
import TagIcon from '../../icons/tag'

const AdminHeader = () => {
  const { isThemeDark } = useAppSelector((state: IRootState) => state.ui)

  const dispatch = useAppDispatch<AppDispatch>()

  const location = useLocation()

  const Title = () => {
    if (location.pathname.includes('users')) {
      return (
        <div className="flex items-center gap-2">
          <UsersIcon /> Users
        </div>
      )
    } else if (location.pathname.includes('projects')) {
      return (
        <div className="flex items-center gap-2">
          <ProjectsIcon /> Projects
        </div>
      )
    } else if (location.pathname.includes('experiences')) {
      return (
        <div className="flex items-center gap-2">
          <ExperiencesIcon /> Experiences
        </div>
      )
    } else if (location.pathname.includes('technologies')) {
      return (
        <div className="flex items-center gap-2">
          <TechnologiesIcon />
          Technologies
        </div>
      )
    } else if (location.pathname.includes('profile')) {
      return (
        <div className="flex items-center gap-2">
          <ProfileIcon /> Profile
        </div>
      )
    } else if (location.pathname.includes('tags')) {
      return (
        <div className="flex items-center gap-2">
          <TagIcon /> Tags
        </div>
      )
    }
    return (
      <div className="flex items-center gap-2">
        <UsersIcon /> Users
      </div>
    )
  }

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  const handleOpenSideBar = () => {
    dispatch(toggleSideBar())
  }

  return (
    <header className="w-full fixed top-0 backdrop-blur-2xl z-10 py-2 md:py-0 shadow-md">
      <div className="flex justify-between items-center py-3 w-[90vw] max-w-[768px] mx-auto">
        <button onClick={handleOpenSideBar}>
          <MenuIcon />
        </button>
        <h1 className="text-2xl dark:text-gray-400 text-gray-600">
          <Title />
        </h1>
        <button onClick={handleToggleTheme}>
          <img
            src={isThemeDark ? sunIcon : moonIcon}
            alt="toggle-theme-icon"
            className="h-8 w-auto"
          />
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
