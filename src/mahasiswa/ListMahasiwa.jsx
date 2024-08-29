import { Button, Popconfirm, Table, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import supabase from '../connector'
import ModalForm from '../components/ModalForm'
import Chance from 'chance'

const ListMahasiwa = () => {
  const [dataMhs, setDataMhs] = useState([])
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const chance = new Chance();

  // membuat function generate fake data
  function genFakeData(){
    let fakeData = []

    for(let i=0 ; i<=20 ; i++){
      let nama = chance.name();
      let nim = chance.integer();
      let alamat = chance.address();
      let telepon = chance.phone();

      fakeData.push({
        nama : nama, 
        nim : nim, 
        alamat : alamat, 
        telepon: telepon
      })
    }

    supabase.from("mahasiswa").insert(fakeData)
    .then(res=>{
      setRefresh(prev=>prev=!prev)
    })

    
  }

  // membuat function handle untuk Refresh
  function handleRefresh(){
    setRefresh(prev=> prev=!prev)
  }

  // buat function untuk single Delete
  function handleSingleDelete(id){
    supabase.from("mahasiswa").delete().eq("id", id)
    .then(res=>{
      setRefresh(prev=>prev=!prev)
    })
  }

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
    {
      title : "action",
      render : (content, data)=>(
        <div>
         <Popconfirm
         title = "Apakah yakin anda delete data ini ?"
         okText = "Delete"
         onConfirm={()=>{handleSingleDelete(data.id)}}
         cancelText="Tidak mas"
         >
         <Button
          type='primary'
          danger
          >
            Delete
          </Button>
         </Popconfirm>
        </div>
      ) 
    }
   
  ]

 


  

  useEffect(()=>{
    supabase.from("mahasiswa").select("*").order("id", {ascending:false})
    .then(res=>{
        setDataMhs(res.data)
    })
  }, [refresh])

  return (
    <div className='w-full p-8'>
        {
          isModalFormOpen && (
            <ModalForm 
            isOpen={isModalFormOpen}
            isCancel={()=>{setIsModalFormOpen(false)}}  
            isRefresh={handleRefresh}          
            />
          )
        }
        <Button type='primary' onClick={()=>{setIsModalFormOpen(true)}}>
          Tambah Data
        </Button>
        
        <Button type='primary' danger onClick={genFakeData} 
        >Tambah Fake Data
        </Button>
        
        
        <Table
        columns={column }
        dataSource={dataMhs}
        rowSelection  
        />
    </div>
  )
}

export default ListMahasiwa