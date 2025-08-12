import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../api/auth'
import SignUpLayout from '../../components/SignUpComponents/SignUpLayout'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/entities/userSlice'
import { useTranslation } from 'react-i18next'
import { useApiError } from '../../hooks/useApiError'

const SignUpFormContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const handleApiError = useApiError()

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { token, username } = await signup(values.username, values.password)

      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(setUser(username))
      navigate('/')
    } catch (error) {
      console.error('Ошибка регистрации:', error)

      handleApiError(error, {
        setErrors,
        fieldErrors: {
          username: ' ',
          password: ' ',
          confirmPassword: t('signUp.errors.userExists'),
        },
      })  
    } finally {
      setSubmitting(false)
    }
  }
  return <SignUpLayout onSubmit={handleSubmit} />
}

export default SignUpFormContainer
