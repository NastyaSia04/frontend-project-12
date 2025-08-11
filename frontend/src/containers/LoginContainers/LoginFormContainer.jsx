import React from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import LoginLayout from '../../components/LoginComponents/LoginLayout'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/entities/userSlice'
import { useTranslation } from 'react-i18next'

const LoginFormContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const { token, username } = await login(values.username, values.password) // Попытка входа на сервер, Если всё хорошо, сервер отвечает: { token: '...', username: '...' }
      localStorage.setItem('token', token) //сохраняем токен и имя пользователя в localStorage, чтобы потом использовать (для запроса к серверу и доступа к чату). один раз после входа.
      localStorage.setItem('username', username)
      dispatch(setUser(username)) // Устанавливаем пользователя в Redux
      navigate('/') // переход на главную страницу (чат)
    } catch {
      setStatus(t('login.errors.invalidCredentials')) // Показываем сообщение об ошибке авторизации
    } finally {
      setSubmitting(false) //Убираем состояние "загрузки" (например, чтобы снова показать кнопку "Войти").
    }
  }

  return <LoginLayout onSubmit={handleSubmit} />
}

export default LoginFormContainer

//useNavigate позволяет программно переходить по маршрутам, как будто пользователь кликнул по ссылке:
//navigate('/login'); - редирект на страницу входа
//navigate('/', { replace: true }); - перейти без добавления в историю браузера

//setSubmitting(false) — сообщает Formik, что форма больше не в состоянии "отправки".
//setStatus('ошибка') — позволяет передать текст ошибки
