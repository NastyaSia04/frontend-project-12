import { useEffect, useRef } from 'react'
import { FormGroup } from 'react-bootstrap'
import classNames from 'classnames'

const RenameChannelModal = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  onHide
}) => {
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
            'is-invalid': touched.name && errors.name
          })}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label htmlFor="name" className="visually-hidden">
          Новое имя канала
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
          Отменить
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  )
}

export default RenameChannelModal