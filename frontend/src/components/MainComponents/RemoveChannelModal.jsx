import React from 'react'
import { useTranslation } from 'react-i18next'

const RemoveChannelModal = ({ onConfirm, onCancel, isDeleting }) => {
  const { t } = useTranslation()

  return (
    <>
      <p className='lead'>{t('channels.modal.confirmDelete')}</p>
      <div className='d-flex justify-content-end'>
        <button
          type='button'
          className='btn btn-secondary me-2'
          onClick={onCancel}
          disabled={isDeleting}
        >
          {t('channels.modal.cancel')}
        </button>
        <button
          type='button'
          className='btn btn-danger'
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? t('channels.modal.deleting') : t('channels.modal.delete')}
        </button>
      </div>
    </>
  )
}

export default RemoveChannelModal
