import AdminHeader from '../components/admin/header'
import Notification from '../components/admin/notification'
import Sidebar from '../components/admin/sidebar'

const AdminLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="min-h-[100vh] pb-10 transition-all duration-500 ease-in-out dark:bg-gray-900 bg-gray-100">
      <AdminHeader />
      <div className="md:pt-16 pt-[5rem] w-[90vw] max-w-[768px] mx-auto">
        {children}
        <Sidebar />
        <Notification />
      </div>
    </div>
  )
}

export default AdminLayout
