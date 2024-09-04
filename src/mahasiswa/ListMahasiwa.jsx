import { Button, Popconfirm, Table, Modal, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import supabase from '../connector'
import ModalForm from '../components/ModalForm'
import Chance from 'chance'
import ModalFormEdit from '../components/ModalFormEdit'
import { useQuery } from '@tanstack/react-query'

const ListMahasiwa = () => {
  const [dataMhs, setDataMhs] = useState([])
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState({})

  const [refresh, setRefresh] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  
  const {confirm} = Modal
  
  const {Search} = Input

  const chance = new Chance();

  // membuat function generate fake data
  function genFakeData(){
    confirm({
      title : "Apakah anda ingin menambah 20 fake data ?",
      onOk() {
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
          refetch().then(res=>{ return res})
        })
    
      }

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

         <Button className='bg-green-700 text-white'
         onClick={()=>{
          setIsModalEdit(true)
          setDataEdit(data)
         }}
         >
          Edit
         </Button>
        </div>
      ) 
    }
   
  ]

  // handleSelectChange
 const rowSelection = {
  selectedRowKeys,
  onChange : onSelectChange
 }
 function onSelectChange(newRows){
  setSelectedRowKeys(newRows)
 }

//  function handleMultiple delete

function handleMultipleDelete(){
confirm({
  title : `Apakah anda ingin menghapus  ${selectedRowKeys.length} data ?`, 
  onOk(){
  supabase.from("mahasiswa").delete().in("id", selectedRowKeys)
  .then(res=>{
  refetch().then(res=>{ return res})
  setSelectedRowKeys([])
  })
  }
})
}

function handleSearch(e){
if(e !== ""){
  supabase.from("mahasiswa").select("*").ilike("nama", `%${e}%`)
  .then(res=>{
    setDataMhs(res.data)
  })
  return
}
supabase.from("mahasiswa").select("*").order("id", {ascending: false})
.then(
  res=>{
    setDataMhs(res.data)
  }
)
}
 
  // useEffect(()=>{
    // supabase.from("mahasiswa").select("*").order("id", {ascending:false})
  //   .then(res=>{
  //       setDataMhs(res.data)
  //   })
  // }, [refresh])

  const {data, isError, isLoading, refetch} = useQuery({
    queryKey : ['read_mhs'],
    queryFn : async ()=>{
      try {
        const response = await supabase.from("mahasiswa").select("*").order("id", {ascending:false})
        console.log(response.data)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <div className='w-full p-8'>
        {
          isModalFormOpen && (
            <ModalForm 
            isOpen={isModalFormOpen}
            isCancel={()=>{setIsModalFormOpen(false)}}  
                      
            />
          )
        }

        {
          isModalEdit && (
            <ModalFormEdit 
            isOpen={isModalEdit}
            isCancel={()=>{setIsModalEdit(false)}}
            data={dataEdit}
            isRefresh={()=>{setRefresh(prev=>prev=!prev)}}
            />
          )
        }
        

        <div className='w-full flex'>
        <Button type='primary' onClick={()=>{setIsModalFormOpen(true)}}>
          Tambah Data
        </Button>
        
        <Button type='primary' danger onClick={genFakeData} 
        >Tambah Fake Data
        </Button>


        {
          selectedRowKeys.length>0? (
        
        <Button type='primary' danger onClick={handleMultipleDelete}>
          Hapus {selectedRowKeys.length} data
        </Button>
          ) : null
        }
        
        <div className='w-full flex justify-end'>
        
        <Search 
        allowClear 
        className='w-[200px]' 
        onSearch={handleSearch}
        />
        </div>
        
        </div>
        
        
        <Table
        columns={column }
        dataSource={data}
        rowSelection = {rowSelection}
        rowKey="id"
        />
    </div>
  )
}

export default ListMahasiwa