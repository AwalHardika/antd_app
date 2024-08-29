import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import supabase from '../connector'


const ModalForm = ({isOpen, isCancel,isRefresh}) => {

function handleSubmit(e){

supabase.from("mahasiswa").insert(e)
.then(res=>{
    isCancel()
    isRefresh()
})
}

  return (
    <div>
        <Modal 
        open={isOpen}
        footer={false}
        onCancel={isCancel}
        
        >
        <h1 className='text-center mt-4 text-2xl text-blue-500'>Form Tambah Data Mahasiswa</h1>
        
        <Form
        layout='vertical'
        className='mt-2 grid grid-cols-2 gap-4'
        onFinish={handleSubmit}
        >

            <Form.Item
            label = "Nama Mahasiswa"
            name= "nama"
            rules={[
                {
                    required :true,
                    message : "Nama tidak boleh kosong"
                }
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label = "NIM"
            name= "nim"
            rules={[
                {
                    required :true,
                    message : "Nim tidak boleh kosong"
                }
            ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
            label = "Alamat"
            name= "alamat"
            rules={[
                {
                    required :true,
                    message : "Alamat tidak boleh kosong"
                }
            ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
            label = "Telepon"
            name= "telepon"
            rules={[
                {
                    required :true,
                    message : "Telepon tidak boleh kosong"
                }
            ]}
            >
                <Input/>
            </Form.Item>

            <Button type='primary' className='relative left-1/2' htmlType='submit'> Submit </Button>
        </Form>
        </Modal>
    </div>
  )
}

export default ModalForm

