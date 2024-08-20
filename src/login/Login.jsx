import React from 'react'
import { Button, Form, Input } from 'antd'
import { NavLink } from 'react-router-dom'


const Login = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <Form
        className='w-[400px] p-8 bg-blue-500 rounded-lg'
        layout='vertical'
        labelCol={{
            span : 6
        }}
        wrapperCol={{
            span: 100
        }}
        >
            <h1 className='text-center text-[28px] text-white'>Form Login</h1>
            
            <Form.Item
            label="Username"
            name = "Username"
            rules={[
                {
                    required : true,
                    message : 'Email tidak boleh kosong'
                },
                {
                    type: "email",
                    message : "Email tidak sesuai"
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

            <Button className='bg-white w-full mb-4 text-blue-500'
            htmlType='submit'
            >
                Login
            </Button>


            <NavLink to={"/register"} className=' text-white'>Don't Have Account ? SignUp Here</NavLink>
        </Form>
    </div>
  )
}

export default Login