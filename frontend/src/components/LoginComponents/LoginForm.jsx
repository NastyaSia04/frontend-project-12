import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Form as BootstrapForm, Button, Alert } from 'react-bootstrap'
import loginSchema from '../../utils/validation/loginSchema'
import { useTranslation } from 'react-i18next'

const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={loginSchema(t)}
    >
      {({ status, isSubmitting }) => (
        <Form>
          <BootstrapForm.Group className='form-floating mb-3'>
            <Field
              as={BootstrapForm.Control}
              type='text'
              name='username'
              id='username'
              placeholder={t('login.username')}
              autoComplete='username'
              required
            />
            <BootstrapForm.Label htmlFor='username'>{t('login.username')}</BootstrapForm.Label>
          </BootstrapForm.Group>

          <BootstrapForm.Group className='form-floating mb-4'>
            <Field
              as={BootstrapForm.Control}
              type='password'
              name='password'
              id='password'
              placeholder={t('login.password')}
              autoComplete='current-password'
              required
            />
            <BootstrapForm.Label htmlFor='password'>{t('login.password')}</BootstrapForm.Label>
          </BootstrapForm.Group>

          {status && <Alert variant='danger'>{status}</Alert>}

          <Button
            type='submit'
            variant='outline-primary'
            className='w-100 mb-3'
            disabled={isSubmitting}
          >
            {t('login.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
