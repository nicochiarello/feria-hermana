import React from 'react'
import Navbar from '../navbar/Navbar'
import { useRouter } from 'next/router'

const DashboardLayout = ({section, children}) => {

  return (
    <div className='w-full h-full relative'>
        <Navbar section={section}/>
        <article className='w-full h-[calc(100vh-4rem)] pb-2 bg-bg'>
            {children}
        </article>
    </div>
  )
}

export default DashboardLayout