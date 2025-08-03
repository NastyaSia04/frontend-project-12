import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import ChatPage from './pages/Chat/ChatPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import PrivateRoute from './router/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
