import { Button, Popconfirm, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import supabase from '../connector'

const ListMahasiwa = () => {
  const [dataMhs, setDataMhs] = useState([])

    const column = [
    {
        title : "Id",
        dataIndex : "id" 
    },
    {
        title : "Nama Mahasiswa",
        dataIndex : "nama"
    },
    {
        title : "Nim Mahasiswa",
        dataIndex : "nim"
    },
    {
        title : "Alamat Mahasiswa",
        dataIndex : "alamat"
    },
    {
        title : "Telepon",
        dataIndex : "telepon"
    },
  
  ]
  

  useEffect(()=>{
    supabase.from("mahasiswa").select("*")
    .then(res=>{
        setDataMhs(res.data)
    })
  }, [])

  return (
    <div className='w-full p-8'>
        <Table
        columns={column }
        rowKey={"id"}
        dataSource={dataMhs}
        />
    </div>
  )
}

export default ListMahasiwa