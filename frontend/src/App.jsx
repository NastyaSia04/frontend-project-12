import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LoginPage from './pages/Login/LoginPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import ChatPage from './pages/Chat/ChatPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import PrivateRoute from './router/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position='top-right' autoClose={3000}/>
    </BrowserRouter>
  )
}

export default App
