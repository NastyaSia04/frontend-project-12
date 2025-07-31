import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundLayout = () => (
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
)

export default NotFoundLayout