import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { NavLink } from 'react-router-dom'
import supabase from '../connector'
import AlertMessage from '../components/Alert'

const Register = () => {
    const [errPass, setErrPass] = useState(false)
    const [successReg, setSuccesReg] = useState(false)
    const [loading, setLoading] = useState(false)
    
    function handleSubmit(e){
    setLoading(true)

    let {Username, Password, rePassword} = e
    if(Password !== rePassword){
        // alert("Password dan rePassword tidak sama")
        setErrPass(true)
        setLoading(false)
        return
    }
    supabase.auth.signUp({
       email : Username,
        password : Password
    })
    .then(res=>{
        console.log(res)
        setLoading(false)
        setSuccesReg(true)
    })


    }
  
    return (
    <div className='w-screen h-screen flex justify-center items-center'>
    {
        errPass && (
         <AlertMessage
         message={"Password dan RePassword tidak sama"}
         type={"warning"}
         onClose={()=>{setErrPass(false)}}
         />
        )
        
    }

    {
        successReg && (
         <AlertMessage 
         message={"Berhasil Register !"}
         type={"success"}
         onClose={()=>setSuccesReg(false)}
         />
        )
        // errPass ? (Alert) : null
    }

    <Form
    className='w-[400px] p-8 bg-blue-500 rounded-lg'
    layout='vertical'
    labelCol={{
        span : 6
    }}
    wrapperCol={{
        span: 100
    }}
    onFinish={handleSubmit}
    >
        <h1 className='text-center text-[28px] text-white'>Form Register</h1>
        
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

        <Form.Item
        label="rePassword"
        name = "rePassword"
        rules={[
            {
                required : true,
                message : "rePassword harus diisi",
            },
        ]}
        >
        
        <Input.Password/>
        
        </Form.Item>

        <Button 
        className='bg-white w-full mb-4 text-blue-500'
        htmlType='submit'
        disabled={loading}
        >
            Register
        </Button>


        <NavLink to={"/"} className=' text-white'>Already Have Account ? SignIn Here</NavLink>
    </Form>
</div>
  )
}

export default Register