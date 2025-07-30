import React from 'react'

import HomeHeader from '../components/home/header'

const HomeLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="min-h-[100vh] pb-10 transition-all duration-500 ease-in-out bg-[radial-gradient(150%_150%_at_50%_20%,#fff_40%,#63e_100%)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-fixed">
      <HomeHeader />
      <div className="md:pt-16 pt-[5rem] w-[90vw] max-w-[768px] mx-auto">
        {children}
      </div>
    </div>
  )
}

export default HomeLayout
