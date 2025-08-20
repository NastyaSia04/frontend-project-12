import { Formik, Form, Field } from 'formik'
import { Form as BootstrapForm, Button, Alert } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
    >
      {({ status, isSubmitting, errors, touched }) => (
        <Form>
          {/* Поле username */}
          <BootstrapForm.Group className="form-floating mb-3">
            <Field
              as={BootstrapForm.Control}
              type="text"
              name="username"
              id="username"
              placeholder={t('login.username')}
              required
              isInvalid={touched.username && !!errors.username}
              autoFocus
              autoComplete ="off"
            />
            <BootstrapForm.Label htmlFor="username">{t('login.username')}</BootstrapForm.Label>
            <BootstrapForm.Control.Feedback type="invalid">
              {t(errors.username)}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          {/* Поле password */}
          <BootstrapForm.Group className="form-floating mb-4">
            <Field
              as={BootstrapForm.Control}
              type="password"
              name="password"
              id="password"
              placeholder={t('login.password')}
              required
              isInvalid={touched.password && !!errors.password}
              autoComplete ="off"
            />
            <BootstrapForm.Label htmlFor="password">{t('login.password')}</BootstrapForm.Label>
            <BootstrapForm.Control.Feedback type="invalid">
              {t(errors.password)}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          {status && <Alert variant="danger">{status}</Alert>}

          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
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
