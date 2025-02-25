import { Button, Popconfirm, Table, Modal, Input, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import supabase from '../connector'
import ModalForm from '../components/ModalForm'
import Chance from 'chance'
import ModalFormEdit from '../components/ModalFormEdit'
import { useQuery } from '@tanstack/react-query'
import { AiFillMessage, AiOutlineMessage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const ListMahasiwa = () => {
  const [dataMhs, setDataMhs] = useState([])
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const navigate = useNavigate()

  // current page / page saat ini
  const [page, setPage]  = useState(1)
  // berapa data yang ditampilkan
  const [limit, setLimit]= useState(10)
  // jumlah seluruh data
  const [totalData, setTotalData] = useState(0)

  // const [refresh, setRefresh] = useState(false)
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
          refetch()
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
      refetch()
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
            {
              data.messages.length >0 &&(
                <Button 
                type='text'
                size='large'
                icon = {<AiOutlineMessage className='text-yellow-500'/>}
                onClick={()=>{
                  navigate(`/mahasiswa/messages?id=${data.id}&nama=${data.nama}`)
                }}
                />
              )
            }
        
          
        
      
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
  refetch()
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
    queryKey : ['read_mhs', page, limit],  
    queryFn : async ({queryKey})=>{
      try {
        let currentPage = queryKey[1]
        let currentLimit = queryKey[2]
        let start = (currentPage-1) * currentLimit
        let end = start + currentLimit -1

        let {data, count} = await supabase.from("mahasiswa").select("*, messages(*) ", {count: "exact"}).order("id", {ascending:false}).range(start, end)
        
        setTotalData(count)
        console.log(data)
        
        return data
        
        
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
            isRefresh={refetch}       
            />
          )
        }

        {
          isModalEdit && (
            <ModalFormEdit 
            isOpen={isModalEdit}
            isCancel={()=>{setIsModalEdit(false)}}
            data={dataEdit}
            isRefresh={refetch}
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
        pagination={false}
        rowSelection = {rowSelection}
        rowKey="id"
        loading={isLoading}
        />
        <Pagination 
        current={page}
        total={totalData}
        pageSize={limit}
        onChange={(e)=>{
          setPage(e)
          refetch()
        }}
        showSizeChanger
        onShowSizeChange={(current, pageSize)=>{
        setLimit(pageSize)
        }}

        />
    </div>
  )
}

export default ListMahasiwa