import { Formik, Form, Field } from 'formik'
import { Form as BootstrapForm, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import signUpSchema from '../../utils/validation/signUpSchema'

const SignUpForm = ({ onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      onSubmit={onSubmit}
      validationSchema={signUpSchema}
    >
      {({ isSubmitting, errors, touched, submitCount }) => (
        <Form>
          {/* Поле username */}
          <BootstrapForm.Group className="form-floating mb-3">
            <Field
              as={BootstrapForm.Control}
              type="text"
              name="username"
              id="username"
              placeholder={t('validation.minThree')}
              required
              isInvalid={!!errors.username && (touched.username || submitCount > 0)}
              aria-describedby="usernameHelpBlock"
              autoFocus
              autoComplete="off"
            />
            <BootstrapForm.Label htmlFor="username">{t('signUp.username')}</BootstrapForm.Label>
            {(touched.username || submitCount > 0) && errors.username && (
              <BootstrapForm.Control.Feedback type="invalid">
                {t(errors.username)}
              </BootstrapForm.Control.Feedback>
            )}
          </BootstrapForm.Group>

          {/* Поле password */}
          <BootstrapForm.Group className="form-floating mb-3">
            <Field
              as={BootstrapForm.Control}
              type="password"
              name="password"
              id="password"
              placeholder={t('validation.minSix')}
              required
              isInvalid={!!errors.password && (touched.password || submitCount > 0)}
              aria-describedby="passwordHelpBlock"
              autoComplete="off"
            />
            <BootstrapForm.Label htmlFor="password">{t('signUp.password')}</BootstrapForm.Label>
            {(touched.password || submitCount > 0) && errors.password && (
              <BootstrapForm.Control.Feedback type="invalid">
                {t(errors.password)}
              </BootstrapForm.Control.Feedback>
            )}
          </BootstrapForm.Group>

          {/* Поле confirmPassword */}
          <BootstrapForm.Group className="form-floating mb-4">
            <Field
              as={BootstrapForm.Control}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder={t('validation.passwordsMustMatch')}
              required
              isInvalid={!!errors.confirmPassword && (touched.confirmPassword || submitCount > 0)}
              autoComplete="off"
            />
            <BootstrapForm.Label htmlFor="confirmPassword">{t('signUp.confirmPassword')}</BootstrapForm.Label>
            {errors.confirmPassword && (touched.confirmPassword || submitCount > 0) && (
              <BootstrapForm.Control.Feedback type="invalid">
                {t(errors.confirmPassword)}
              </BootstrapForm.Control.Feedback>
            )}
          </BootstrapForm.Group>

          <Button
            type="submit"
            variant="outline-primary"
            className="w-100"
            disabled={isSubmitting}
          >
            {t('signUp.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
