import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../../components/MainComponents/Modal'
import RemoveChannelModal from '../../components/MainComponents/RemoveChannelModal'
import { removeChannelAsync } from '../../store/entities/channelsSlice'
import { closeModal } from '../../store/entities/uiSlice'

const RemoveModal = ({ channelId }) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.channels)
  
  // ✅ ЛОГ: Проверяем, что в модалку пришёл channelId
  console.log('RemoveModal открыт. channelId =', channelId)

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

  const handleConfirm = useCallback(() => {
    // ✅ ЛОГ: перед отправкой в thunk
    console.log(`Удаляем канал с ID: ${channelId}`)
    if (!channelId) {
      console.error('❌ channelId пустой! Запрос на удаление не отправлен.')
      return
    }

    dispatch(removeChannelAsync(channelId))
      .unwrap()
      .then(() => {
        console.log(`✅ Канал ${channelId} успешно удалён`)
        dispatch(closeModal())
    })
      .catch((err) => console.error('Ошибка удаления канала', err))
  }, [dispatch, channelId])

  // Закрытие по Escape и подтверждение по Enter
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
      if (e.key === 'Enter') {
        handleConfirm()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleClose, handleConfirm])

  return createPortal(
    <Modal title='Удалить канал' onClose={handleClose}>
      <RemoveChannelModal
        onConfirm={handleConfirm}
        onCancel={handleClose}
        isDeleting={loading}
      />
    </Modal>,
    document.body
  )
}

export default RemoveModal
