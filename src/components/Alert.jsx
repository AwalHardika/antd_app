import { Alert } from 'antd'
import React from 'react'

const AlertMessage = ({message, type, onClose}) => {
  return (
    <Alert 
    message={message}
    type={type}
    onClose={onClose}
    className='absolute z-40 top-4'
    />
  )
}

export default AlertMessage