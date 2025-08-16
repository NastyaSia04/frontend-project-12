import { useEffect, useRef } from 'react'
import { FormGroup } from 'react-bootstrap'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const RenameChannelModal = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  onHide,
  submitCount
}) => {
  const { t } = useTranslation()

  const inputRef = useRef(null)
  
  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <input
          id="name"
          type="text"
          ref={inputRef}
          className={classNames('form-control', 'mb-2', {
            'is-invalid': (touched.name || submitCount > 0) && errors.name
          })}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t('channels.modal.newNamePlaceholder')}
          aria-describedby="nameHelpBlock"
        />
        <label htmlFor="name" className="visually-hidden">
          {t('channels.modal.newNameLabel')}
        </label>
        {(touched.name || submitCount > 0) && errors.name && (
          <div className="invalid-feedback">
            {t(errors.name)}
          </div>
        )}
      </FormGroup>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onHide}
          disabled={isSubmitting}
          aria-label={t('channels.modal.cancel')}
        >
          {t('channels.modal.cancel')}
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          aria-label={t('channels.modal.submit')}
        >
          {isSubmitting ? t('channels.modal.submitting') : t('channels.modal.submit')}
        </button>
      </div>
    </form>
  )
}

export default RenameChannelModal
