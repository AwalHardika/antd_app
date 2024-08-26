import { Menu } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineAudit, AiOutlineDashboard, AiOutlineLogout, AiOutlineSetting, AiOutlineSwapLeft } from "react-icons/ai"
import supabase from '../connector'
import AlertMessage from '../components/Alert'


const Layout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)
    
    const items =[
        {
            icon : <AiOutlineSwapLeft/>,
            onClick : ()=>{
                setCollapsed(prev=> prev=!prev)
            }
        },
        {
            key : '/',
            label : "Dashboard",
            icon : <AiOutlineDashboard/>,
            onClick : ()=>{
                navigate("/")
            }
        },
        {
            key : '/mahasiswa',
            label : 'Data Mahasiswa',
            icon : <AiOutlineAudit/>,
            onClick : ()=>{
                navigate("/mahasiswa")
            }
        },
        {
            key : '/settings',
            label : 'Settings',
            icon : <AiOutlineSetting/>,
            onClick : ()=>{
                navigate("/settings")
            }
        },
        {
            key : '/logout',
            label: 'Logout',
            icon : <AiOutlineLogout/>,
            onClick : ()=>{
                let conf = window.confirm("Apakah yakin anda ingin logout ?")
                if(!conf) return
                supabase.auth.signOut()
                .then(res=>{
                    
                })
            },
            style : {
                
            }
        },

   
    ]
    return (
    <main className='flex relative'>
        {/* sidebar */}
        <div className='w-[200px] h-auto fixed'>
        
        <Menu 
        defaultSelectedKeys={[location.pathname]}
        mode='inline'
        items={items}
        className='h-screen relative'
        theme='dark'
        inlineCollapsed= {collapsed}
        />
        </div>

        {/* right content */}
        <div className='flex-1 h-[2000px] ml-[200px]'>
        <Outlet/>
        </div>
        
    </main>
  )
}

export default Layout