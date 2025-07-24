import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <div>
      {/* Шапка с названием */}
      <header>
        <h1>Hexlet Chat</h1>
      </header>
      {/* Контент с маршрутизацией */}
      <main>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App