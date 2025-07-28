import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute><MainPage /></PrivateRoute>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App