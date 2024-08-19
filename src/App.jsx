import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './login/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      


    </Routes>
  )
}

export default App