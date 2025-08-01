import React from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import LoginLayout from '../../components/LoginComponents/LoginLayout'

const LoginFormContainer = () => {
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

  return <LoginLayout onSubmit={handleSubmit} />
}

export default LoginFormContainer