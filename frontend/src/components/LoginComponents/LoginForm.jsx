import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Form as BootstrapForm, Button, Alert } from 'react-bootstrap'
import loginSchema from '../../utils/validation/loginSchema'

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={onSubmit}
    validationSchema={loginSchema}
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
)

export default LoginForm
