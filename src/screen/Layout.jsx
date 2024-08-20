import { Menu } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { AiOutlineAudit, AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai"

const Layout = () => {
    
    const items =[
        {
            key : '/',
            label : "Dashboard",
            icon : <AiOutlineDashboard/>
        },
        {
            key : '/mahasiswa',
            label : 'Data Mahasiswa',
            icon : <AiOutlineAudit/>
        },
        {
            key : '/settings',
            label : 'Settings',
            icon : <AiOutlineSetting/>
        }
    ]
    return (
    <main className='flex relative'>
        {/* sidebar */}
        <div className='w-[200px] h-auto'>
        <Menu 
        mode='inline'
        items={items}
        className='h-screen'
        theme='dark'
        />
        </div>

        {/* right content */}
        <div className='flex-1'>
        <Outlet/>
        </div>
        
    </main>
  )
}

export default Layout