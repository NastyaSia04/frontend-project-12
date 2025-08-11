import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../api/auth'
import SignUpLayout from '../../components/SignUpComponents/SignUpLayout'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/entities/userSlice'
import { useTranslation } from 'react-i18next'

const SignUpFormContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { token, username } = await signup(values.username, values.password)

      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(setUser(username))
      navigate('/')
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors({
          username: ' ',
          password: ' ',
          confirmPassword: t('signUp.errors.userExists'),
        })
      } else {
        setErrors(t('signUp.errors.generic')) 
      }   
    } finally {
      setSubmitting(false)
    }
  }
  return <SignUpLayout onSubmit={handleSubmit} />
}

export default SignUpFormContainer
