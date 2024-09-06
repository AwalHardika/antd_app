import { Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineAudit,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineProfile,
  AiOutlineSetting,
  AiOutlineSwapLeft,
} from "react-icons/ai";
import supabase from "../connector";
import AlertMessage from "../components/Alert";
import { useQuery } from "@tanstack/react-query";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [email, setEmail] = useState("")

  const items = [
    {
      icon: <AiOutlineSwapLeft />,
      onClick: () => {
        setCollapsed((prev) => (prev = !prev));
      },
    },
    {
      key: "/",
      label: "Dashboard",
      icon: <AiOutlineDashboard />,
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: "/mahasiswa",
      label: "Data Mahasiswa",
      icon: <AiOutlineAudit />,
      onClick: () => {
        navigate("/mahasiswa");
      },
    },
    {
      key: "/settings",
      label: "Settings",
      icon: <AiOutlineSetting />,
      onClick: () => {
        navigate("/settings");
      },
    },

  ];

  const h_items = [
    {
      label: email,
      key: "account",
      icon: <AiOutlineProfile/>,
      children: [
        {
          key: "/logout",
          label: "Logout",
          icon: <AiOutlineLogout />,
          onClick: () => {
            let conf = window.confirm("Apakah yakin anda ingin logout ?");
            if (!conf) return;
            supabase.auth.signOut().then((res) => {});
          },
          style: {
            color : "red",
            backgroundColor : "white",
          },
        },
      ],
    },
  ];

  const {data, isError} = useQuery({
    queryKey : ['read_account'],
    queryFn : async()=>{
       try {
        const response = await supabase.auth.getUser()
        setEmail(response.data.user.email)
        return response
       } catch (error) {
        console.log(error)
       }
    }
  })
  return (
    <main className="flex relative">
      {/* sidebar */}
      <div className="w-[200px] h-auto fixed">
        <Menu
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          className="h-screen relative"
          theme="dark"
          inlineCollapsed={collapsed}
        />
      </div>

      {/* right content */}
      <div className="flex-1 min-h-screen ml-[200px] px-4">
        <Menu mode="horizontal" items={h_items} className="flex justify-end" />

        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
