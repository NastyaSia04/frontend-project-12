import React from 'react'
import { PlusSquare } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

const AddChannelButton = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <button
      type='button'
      className='p-0 text-primary btn btn-group-vertical'
      aria-label={t('channels.addButtonAria')}
      onClick={onClick}
    >
      <PlusSquare size={20} />
      <span className='visually-hidden'>{t('channels.addButtonPlus')}</span>
    </button>
  )
}

export default AddChannelButton
