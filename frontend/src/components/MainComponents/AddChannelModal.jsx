import { useEffect, useRef } from 'react'
import { FormGroup } from 'react-bootstrap'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const AddChannelModal = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  onHide
}) => {
  const { t } = useTranslation()

  const inputRef = useRef(null)
  
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <input
          id="name"
          type="text"
          ref={inputRef}
          className={classNames('form-control', 'mb-2', {
            'is-invalid': touched.name && errors.name
          })}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t('channels.modal.placeholder')}
        />
        <label htmlFor="name" className="visually-hidden">
          {t('channels.modal.label')}
        </label>
        {touched.name && errors.name && (
          <div className="invalid-feedback">{errors.name}</div>
        )}
      </FormGroup>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onHide}
          disabled={isSubmitting}
        >
          {t('channels.modal.cancel')}
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('channels.modal.submitting') : t('channels.modal.submit')}
        </button>
      </div>
    </form>
  )
}

export default AddChannelModal
