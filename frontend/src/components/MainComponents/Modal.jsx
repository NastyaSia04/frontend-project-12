const Modal = ({ title, children, onClose }) => (
  <>
    <div
      className='modal fade show'
      tabIndex='-1'
      role='dialog'
      aria-modal='true'
      style={{ display: 'block' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title h4'>{title}</h4>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={onClose}
            />
          </div>
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </div>

    {/* Добавляем затемнение фона */}
    <div className='modal-backdrop fade show'></div>
  </>
)

export default Modal
