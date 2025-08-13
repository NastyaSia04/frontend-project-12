import React from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import LoginLayout from '../../components/LoginComponents/LoginLayout'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/entities/userSlice'
import { useApiError } from '../../hooks/useApiError'

const LoginFormContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleApiError = useApiError()
  
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const { token, username } = await login(values.username, values.password)
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(setUser(username))
      navigate('/')
    } catch (error) {
      console.error('Ошибка авторизации:', error)

      handleApiError(error, {
        setStatus,
        defaultMessageKey: 'login.errors.invalidCredentials',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return <LoginLayout onSubmit={handleSubmit} />
}

export default LoginFormContainer

