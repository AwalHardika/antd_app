import { Button, Form, Input } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <Form
        >
            <Form.Item
            label="Username"
            name = "Username"
            rules={[
                {
                    required : true,
                    message : 'Email tidak boleh kosong'
                }
            ]}
            >
            
            <Input/>
            
            </Form.Item>

            <Form.Item
            label="Password"
            name = "Password"
            rules={[
                {
                    required : true,
                    message : "Password harus diisi",
                },
            ]}
            >
            
            <Input.Password/>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Login