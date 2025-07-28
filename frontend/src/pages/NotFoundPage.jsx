import { Link } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='h-100 bg-light'>
      <div className='d-flex flex-column h-100' id='chat'>
        {/* Навбар */}
        <Navbar bg='white' className='shadow-sm' expand='lg'>
          <Container>
            <Navbar.Brand as={Link} to='/'>Hexlet Chat</Navbar.Brand>
            <button type='button' className='btn btn-primary'>Выйти</button>
          </Container>
        </Navbar>

        {/* Основное содержимое */}
        <div className='text-center'>
          <img
            src='/assets/404-D_FLHmTM.svg'
            alt='Страница не найдена'
            className='img-fluid h-25'
          />
          <h1 className='h4 text-muted'>Страница не найдена</h1>
          <p className='text-muted'>
            Но вы можете <Link to='/' className='text-primary'>перейти на главную страницу</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage