import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

import AOS from 'aos'
import 'aos/dist/aos.css'

import AdminLayout from './layouts/admin'
import HomeLayout from './layouts/home'
import ExperiencesPage from './pages/admin/experiences'
import CreateExperiencePage from './pages/admin/experiences/create'
import EditExperiencePage from './pages/admin/experiences/edit'
import Profile from './pages/admin/profile'
import ProjectsPage from './pages/admin/projects'
import CreateProjectPage from './pages/admin/projects/create'
import EditProjectPage from './pages/admin/projects/edit'
import TagsPage from './pages/admin/tags'
import CreateTagPage from './pages/admin/tags/create'
import EditTagPage from './pages/admin/tags/edit'
import TechnologiesPage from './pages/admin/technologies'
import CreateTechnologyPage from './pages/admin/technologies/create'
import EditTechnologyPage from './pages/admin/technologies/edit'
import UsersPage from './pages/admin/users'
import EditUserPage from './pages/admin/users/edit'
import ChangePassword from './pages/auth/change'
import Login from './pages/auth/login'
import RecoverPassword from './pages/auth/recover'
import Home from './pages/home/index'
import { IRootState } from './store/store'

function App() {
  const { isThemeDark } = useSelector((state: IRootState) => state.ui)

  useEffect(() => {
    if (isThemeDark) {
      document.body.setAttribute('class', 'dark')
    } else {
      document.body.removeAttribute('class')
    }
  }, [isThemeDark])

  useEffect(() => {
    AOS.init({
      duration: 1000, // Global animation duration
      once: false, // Only once animation
    })
  }, [])

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="recover-password" element={<RecoverPassword />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path="admin" element={<PrivateRoutes />}>
          <Route index element={<Home />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<EditUserPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<EditProjectPage />} />
          <Route path="projects/create-new" element={<CreateProjectPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="experiences/:id" element={<EditExperiencePage />} />
          <Route
            path="experiences/create-new"
            element={<CreateExperiencePage />}
          />
          <Route path="technologies" element={<TechnologiesPage />} />
          <Route path="technologies/:id" element={<EditTechnologyPage />} />
          <Route
            path="technologies/create-new"
            element={<CreateTechnologyPage />}
          />
          <Route path="tags" element={<TagsPage />} />
          <Route path="tags/:id" element={<EditTagPage />} />
          <Route path="tags/create-new" element={<CreateTagPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const Layout = () => {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  )
}

const PrivateRoutes = () => {
  const { token } = useSelector((state: IRootState) => state.auth)
  return token ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to="/login" replace />
  )
}

export default App
