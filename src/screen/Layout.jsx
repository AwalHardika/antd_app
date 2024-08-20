import { Menu } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    
    const items =[
        {
            key : '/',
            label : "Dashboard",
            onClick : ()=>{

            }
        },
        {
            key : '/mahasiswa',
            label : 'Data Mahasiswa'
        },
        {
            key : '/settings',
            label : 'Settings'
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