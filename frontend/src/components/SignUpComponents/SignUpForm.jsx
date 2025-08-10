import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Form as BootstrapForm, Button } from 'react-bootstrap'
import signUpSchema from '../../utils/validation/signUpSchema'

const SignUpForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '', confirmPassword: '' }}
    onSubmit={onSubmit}
    validationSchema={signUpSchema}
  >
    {({ isSubmitting, errors, touched, submitCount }) => (
      <Form>
        {/* Поле username */}
        <BootstrapForm.Group className='form-floating mb-3'>
          <Field
            as={BootstrapForm.Control}
            type='text'
            name='username'
            id='username'
            placeholder='От 3 до 20 символов'
            autoComplete='username'
            required
            className={
              ((touched.username || submitCount > 0) && errors.username) ||
              (submitCount > 0 && errors.confirmPassword)
                ? 'is-invalid'
                : ''
            }
            aria-describedby='usernameHelpBlock'
          />
          <BootstrapForm.Label>Имя пользователя</BootstrapForm.Label>
          <div className='invalid-tooltip'></div>
          {(touched.username || submitCount > 0) && errors.username && !errors.confirmPassword && (
            <div className='invalid-tooltip' placement='right'>
              {errors.username}
            </div>
          )}
        </BootstrapForm.Group>

        {/* Поле password */}
        <BootstrapForm.Group className='form-floating mb-3'>
          <Field
            as={BootstrapForm.Control}
            type='password'
            name='password'
            id='password'
            placeholder='Не менее 6 символов'
            autoComplete='new-password'
            required
            className={
              ((touched.password || submitCount > 0) && errors.password) ||
              (submitCount > 0 && errors.confirmPassword)
                ? 'is-invalid'
                : ''
            }
            aria-describedby='passwordHelpBlock'
          />
          <div className='invalid-tooltip'></div>
          {(touched.password || submitCount > 0) && errors.password && !errors.confirmPassword && (
            <div className='invalid-tooltip'>
              {errors.password}
            </div>
          )}
          <BootstrapForm.Label>Пароль</BootstrapForm.Label>
        </BootstrapForm.Group>

        {/* Поле confirmPassword */}
        <BootstrapForm.Group className='form-floating mb-4'>
          <Field
            as={BootstrapForm.Control}
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Пароли должны совпадать'
            autoComplete='new-password'
            required
            className={
              (touched.confirmPassword || submitCount > 0) && errors.confirmPassword
                ? 'is-invalid'
                : ''
            }
          />
          <div className='invalid-tooltip'>
            {(touched.confirmPassword || submitCount > 0) && errors.confirmPassword}
          </div>
          <BootstrapForm.Label>Подтвердите пароль</BootstrapForm.Label>
        </BootstrapForm.Group>

        <Button
          type='submit'
          variant='outline-primary'
          className='w-100'
          disabled={isSubmitting}
        >
          Зарегистрироваться
        </Button>
      </Form>
    )}
  </Formik>
)

export default SignUpForm
