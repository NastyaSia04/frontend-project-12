import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
 
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
    <div>
      <h2>Войти</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ status, isSubmitting }) => (
          // status — это произвольное значение, которое можно установить вручную в onSubmit с помощью setStatus().
          // isSubmitting - это флаг, который показывает, что форма сейчас отправляется (т.е. обработчик onSubmit работает). Formik автоматически устанавливает isSubmitting в true, когда пользователь нажимает кнопку "Войти", и сбрасывает его в false, когда вызываем setSubmitting(false)
          <Form>
            <div>
              <label htmlFor="username">Ваш ник</label><br />
              <Field
                id='username'
                name='username'
                type='text'
              />
            </div>
            <div>
              <label htmlFor='password'>Пароль</label><br />
              <Field
                id='password'
                name='password'
                type='password'
              />
            </div>

            {status && <div>{status}</div>}

            <button type='submit' disabled={isSubmitting}>Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage