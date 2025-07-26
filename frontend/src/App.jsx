import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import { Container, Navbar } from 'react-bootstrap'
import PrivateRoute from './components/PrivateRoute'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div className='d-flex flex-column h-100'>
      {/* Шапка с названием */}
      <Navbar bg='white' className='shadow-sm' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>
      {/* Контент с маршрутизацией */}
      <main className='h-100'>
        <Routes>
          <Route path='/' element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App