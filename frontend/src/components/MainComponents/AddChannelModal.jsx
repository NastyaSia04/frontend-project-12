import { Formik, Form, Field, ErrorMessage } from 'formik'
import channelSchema from '../../utils/validation/channelSchema'
import classNames from 'classnames'

const AddChannelModal = ({ existingChannelName, onSubmit, onCancel }) => (
  <Formik
    initialValues={{ name: '' }}
    validationSchema={channelSchema(existingChannelName)}
    validateOnBlur={false}
    validateOnChange={false}
    onSubmit={(values, actions) => {
      onSubmit(values.name)
      actions.setSubmitting(false)
      actions.resetForm()
    }}
  >
    {({ isSubmitting, errors, touched }) => (
      <Form>
        <div>
          <div>
            <Field
              id='name'
              name='name'
              type='text'
              placeholder='Введите имя канала' // можно убрать, см
              className={classNames('form-control', 'mb-2', {
                'is-invalid': touched.name && errors.name,
              })}
              autoFocus
            />
            <label htmlFor='name' className='visually-hidden'>Имя канала</label>
            <ErrorMessage
              name='name'
              component='div'
              className='invalid-feedback'
            />
          </div>
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              className='btn btn-secondary me-2'
              onClick={onCancel}
            >
              Отменить
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={isSubmitting}
            >
              Отправить
            </button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
)

export default AddChannelModal
