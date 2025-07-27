import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='h-100 d-flex flex-column align-items-center justify-content-start text-center bg-light'>
      <img
        src='/assets/404-D_FLHmTM.svg'
        alt='Страница не найдена'
        className='img-fluid h-25'
        style={{ width: '291px', height: '291px' }}
      />

      <h1 className='h4 text-muted'>Страница не найдена</h1>
      <p className='text-muted'>
        Но вы можете <Link to='/'>перейти на главную страницу</Link>
      </p>
    </div>
  )
}

export default NotFoundPage
