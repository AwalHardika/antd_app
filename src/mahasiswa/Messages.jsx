import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import supabase from '../connector'
import { Table } from 'antd'

const Messages = () => {
  const [query] = useSearchParams()
  const user_id = query.get("id")


  const {data, isLoading, isError, refetch} = useQuery({
    queryKey : ["getMessages", user_id],
    queryFn : async ({queryKey})=>{
    let uid = queryKey[1]
    try {
      const result = await supabase.from("messages").select("*, mahasiswa(nama)").eq("user_id", uid)
      console.log(result)

      return result

    } catch (error) {
      console.error(error)
    }
    }
    
  })

  const column = [
    {
      title : "id",
      dataIndex : "id",
      key : "id"
    },
    {
      title : "Nama Mahasiswa",
      dataIndex : "nama",
      key : "nama",
      render : (e, record)=>{
       return <>{record.mahasiswa.nama}</>
      }
    },
    {
      title : "Messages",
      dataIndex : "message",
      key : "message"
    }
  ]
  return (
    <div>
        <Table 
        columns={column}
        dataSource={data?.data}
        />
    </div>
  )
}

export default Messages