import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { Container, Navbar, Form as BootstrapForm, Button, Alert } from 'react-bootstrap'
 
const LoginPage = () => {
  const navigate = useNavigate() //useNavigate позволяет программно переходить по маршрутам, как будто пользователь кликнул по ссылке:
  //navigate('/login'); - редирект на страницу входа
  //navigate('/', { replace: true }); - перейти без добавления в историю браузера

  //setSubmitting(false) — сообщает Formik, что форма больше не в состоянии "отправки".
  //setStatus('ошибка') — позволяет передать текст ошибки
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const { token, username } = await login(values.username, values.password) // Попытка входа на сервер, Если всё хорошо, сервер отвечает: { token: '...', username: '...' }
      localStorage.setItem('token', token) //сохраняем токен и имя пользователя в localStorage, чтобы потом использовать (для запроса к серверу и доступа к чату). один раз после входа.
      localStorage.setItem('username', username)
      navigate('/') // переход на главную страницу (чат)
    } catch {
      setStatus('Неверные имя пользователя или пароль') // Показываем сообщение об ошибке авторизации
    } finally {
      setSubmitting(false) //Убираем состояние "загрузки" (например, чтобы снова показать кнопку "Войти").
    }
  }
  
  return (
    <div className='h-100 bg-light'>
      <div className='d-flex flex-column h-100' id='chat'>
        {/* Навбар */}
        <Navbar bg='white' className='shadow-sm' expand='lg'>
          <Container>
            <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>
            <button type='button' className='btn btn-primary'>Выйти</button>
          </Container>
        </Navbar>

        {/* Основное содержимое */}
        <div className='container-fluid h-100'>
          <div className='row justify-content-center align-content-center h-100'>
            <div className='col-12 col-md-8 col-xxl-6'>
              <div className='card shadow-sm'>
                <div className='card-body row p-5'>
                  {/* Левая колонка с аватаркой */}
                  <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                    <img
                      src='/assets/avatar-DIE1AEpS.jpg'
                      className='rounded-circle'
                      alt='Войти'
                    />
                  </div>

                  {/* Правая колонка с формой */}
                  <div className='col-12 col-md-6 mt-3 mt-md-0'>
                    <h1 className='text-center mb-4'>Войти</h1>
                    <Formik
                      initialValues={{ username: '', password: '' }}
                      onSubmit={handleSubmit}
                    >
                      {({ status, isSubmitting }) => (
                        <Form>
                          <BootstrapForm.Group className='form-floating mb-3'>
                            <Field
                              as={BootstrapForm.Control}
                              type='text'
                              name='username'
                              id='username'
                              placeholder='Ваш ник'
                              autoComplete='username'
                              required
                            />
                            <BootstrapForm.Label>Ваш ник</BootstrapForm.Label>
                          </BootstrapForm.Group>

                          <BootstrapForm.Group className='form-floating mb-4'>
                            <Field
                              as={BootstrapForm.Control}
                              type='password'
                              name='password'
                              id='password'
                              placeholder='Пароль'
                              autoComplete='current-password'
                              required
                            />
                            <BootstrapForm.Label>Пароль</BootstrapForm.Label>
                          </BootstrapForm.Group>

                          {status && <Alert variant='danger'>{status}</Alert>}

                          <Button
                            type='submit'
                            variant='outline-primary'
                            className='w-100 mb-3'
                            disabled={isSubmitting}
                          >
                            Войти
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>

                <div className='card-footer p-4'>
                  <div className='text-center'>
                    <span>Нет аккаунта? </span>
                    <a href='/signup'>Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage