import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import supabase from '../connector'

const ModalFormEdit = ({isOpen, isCancel, isRefresh, data}) => {

const [dataEdit, setDataEdit] = useState(data)


function handleSubmitEdit(){
supabase.from("mahasiswa").update(dataEdit).eq("id", dataEdit.id)
.then(res=>{
    isCancel()
    isRefresh()
})
}

function handleChange(e) {
    const { name, value } = e.target;
    setDataEdit(prev => ({
        ...prev,
        [name]: value
    }));
}
  return (
    <div>
        <Modal 
        open={isOpen}
        footer={false}
        onCancel={isCancel}
        >
        <h1 className='text-center mt-4 text-2xl text-green-500'>Form Edit Data Mahasiswa</h1>
        
        <Form
        layout='vertical'
        className='mt-2 grid grid-cols-2 gap-4'
        onFinish={handleSubmitEdit}
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
            initialValue={dataEdit?.nama}
            >
                <Input 
                name='nama'
                onChange={handleChange}
                />
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
            initialValue={dataEdit?.nim}
            >
                <Input 
                name='nim'
                onChange={handleChange}
                />
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
            initialValue={dataEdit?.alamat}
            >
                <Input 
                name='alamat'
                onChange={handleChange}
                />
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
            initialValue={dataEdit?.telepon}
            >
                <Input 
                name='telepon'
                onChange={handleChange}
                />
            </Form.Item>

            <Button type='primary' className='relative left-1/2' htmlType='submit'> Submit </Button>
        </Form>
        </Modal>
    </div>
  )
}

export default ModalFormEdit