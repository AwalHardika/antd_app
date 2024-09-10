import { useQuery } from '@tanstack/react-query'
import { Button, Form, Select, message } from 'antd'
import React, { useState } from 'react'
import supabase from '../connector'
import TextArea from 'antd/es/input/TextArea'

const SendMessages = () => {

    const {data, isError, isLoading, refetch} = useQuery({
        queryKey : ["send_messages"],
        queryFn : async()=>{
            try {
                const response = await supabase.from("mahasiswa").select("*")
                console.log(response)


                return response.data
            } catch (error) {
                
            }
        }
    })

    const [valueSelect, setValueSelect] = useState("")

    function onChange(value){
        setValueSelect(value)
    }

    function onSearch(value){
        
    }

    const mahasiswaSelect = [
        {
            label : "All",
            value : "All"
        },
        ...data?data.map((e)=>({
            label : e.nama,
            value : e.id
        })) : []
    ]

    function handleSendMessages(e){
       if(valueSelect==="All"){
        let messages = data?.map((mahasiswa)=>({
            user_id : mahasiswa.id,
            message : e.messages
        }))
        supabase.from("messages").insert(messages).then(res=>{
            console.log(res)
        })
      
        return
       } 
       else{
        const messages = {
            message : e.messages,
            user_id : valueSelect
        }

        supabase.from("messages").insert(messages)
        .then(res=>{
            console.log(res)
        })
       }
    }
  return (
    <div>
        <Form
        className='w-[400px] bg-white shadow-lg'
        layout='vertical p-4'
        onFinish={handleSendMessages}
        >
            <h1 className='font-bold text-2xl text-center'>Kirim Messages</h1>
            <Form.Item
            
            >
                <Select
                defaultValue={"All"}
                placeholder="pilih mahasiswa"
                options={mahasiswaSelect}
                showSearch
                onSearch={onSearch}
                optionFilterProp='label'
                onChange={onChange}

                />
                
            </Form.Item>

            <Form.Item
            label="Messages"
            name = "messages"
            >
                <TextArea placeholder='isikan messages' />
            </Form.Item>
            <Button type='primary' htmlType='submit'>Kirim</Button>
        </Form>

    </div>
  )
}

export default SendMessages