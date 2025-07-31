import React from 'react'
import Navbar from '../../components/SharedComponents/Navbar'
import NotFoundLayout from '../../components/NotFoundComponents/NotFoundLayout'

const NotFoundPage = () => (
  <div className='h-100 bg-light'>
    <div className='d-flex flex-column h-100' id='chat'>
      {/* Навбар */}
      <Navbar />

      {/* Основное содержимое */}
      <NotFoundLayout />
    </div>
  </div>
)

export default NotFoundPage