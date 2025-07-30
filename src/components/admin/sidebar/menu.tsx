import { useDispatch } from 'react-redux'

import { toggleSideBar } from '../../../store/slices/uiSlice'
import { AppDispatch } from '../../../store/store'
import ExperiencesIcon from '../../icons/experiences'
import LogoutIcon from '../../icons/logout'
import ProfileIcon from '../../icons/profile'
import ProjectsIcon from '../../icons/projects'
import TechnologiesIcon from '../../icons/technologies'
import UsersIcon from '../../icons/users'
import Item from './item'
import TagIcon from '../../icons/tag'
import HomeIcon from '../../icons/home'

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleOnClick = () => {
    sessionStorage.removeItem('token')
    dispatch(toggleSideBar())
    window.location.reload()
  }

  return (
    <li onClick={handleOnClick} className="w-full">
      <button className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <LogoutIcon />
        <span className="sr-only">Logout</span>
        <span className="ms-3">Logout</span>
      </button>
    </li>
  )
}

const Menu = () => {
  return (
    <div className="py-4 overflow-y-auto">
      <ul className="space-y-2 font-medium">
        <Item href="" icon={<HomeIcon />} text="Home" />
        <Item href="users" icon={<UsersIcon />} text="Users" />
        <Item href="projects" icon={<ProjectsIcon />} text="Projects" />
        <Item
          href="experiences"
          icon={<ExperiencesIcon />}
          text="Experiences"
        />
        <Item
          href="technologies"
          icon={<TechnologiesIcon />}
          text="Technologies"
        />
        <Item href="tags" icon={<TagIcon />} text="Tags" />
        <hr />
        <Item href="profile" icon={<ProfileIcon />} text="Profile" />
        <Logout />
      </ul>
    </div>
  )
}

export default Menu
