import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { Container, Row, Col, Form as BootstrapForm, Button, Alert, Card } from 'react-bootstrap'
 
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
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-content-center h-100'>
        <Col xs={12} md={8} xxl={6}>
          <Card className='shadow-sm'>
            <Card.Body className='row p-5'>
              {/* Левая колонка с аватаркой */}
              <Col md={6} className='d-flex align-items-center justify-content-center'>
                <img
                  src='/assets/avatar-DIE1AEpS.jpg'
                  className='rounded-circle'
                  alt='Войти'
                />
              </Col>

              {/* Правая колонка с формой */}
              <Col md={6}>
                <h1 className='text-center mb-4'>Войти</h1>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  onSubmit={handleSubmit}
                >
                  {({ status, isSubmitting }) => (
                    <Form className='form'>
                      <BootstrapForm.Group className='form-floating mb-3' controlId='username'>
                        <Field
                          as={BootstrapForm.Control}
                          type='text'
                          name='username'
                          id='username'
                          placeholder='Ваш ник'
                          autoComplete='username'
                          required
                          className='form-control'
                        />
                        <BootstrapForm.Label>Ваш ник</BootstrapForm.Label>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className='form-floating mb-4' controlId='password'>
                        <Field
                          as={BootstrapForm.Control}
                          type='password'
                          name='password'
                          id='password'
                          placeholder='Пароль'
                          autoComplete='current-password'
                          required
                          className='form-control'
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
              </Col>
            </Card.Body>

            <Card.Footer className='p-4'>
              <div className='text-center'>
                <span>Нет аккаунта? </span>
                <a href='/signup'>Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage