import React from 'react'

const RemoveChannelModal = ({ onConfirm, onCancel, isDeleting }) => (
  <>
    <p className='lead'>Уверены?</p>
    <div className='d-flex justify-content-end'>
      <button
        type='button'
        className='btn btn-secondary me-2'
        onClick={onCancel}
        disabled={isDeleting}
      >
        Отменить
      </button>
      <button
        type='button'
        className='btn btn-danger'
        onClick={onConfirm}
        disabled={isDeleting}
      >
        {isDeleting ? 'Удаление...' : 'Удалить'}
      </button>
    </div>
  </>
)

export default RemoveChannelModal
