import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Modal from '../../components/MainComponents/Modal'
import RemoveChannelModal from '../../components/MainComponents/RemoveChannelModal'
import { removeChannelAsync } from '../../store/entities/channelsSlice'
import { closeModal } from '../../store/entities/uiSlice'

const RemoveModal = ({ channelId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loading: isDeleting } = useSelector(state => state.channels)

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

  const handleConfirm = useCallback(async () => {
    if (!channelId) return

    try {
      await dispatch(removeChannelAsync(channelId)).unwrap()
      toast.success(t('notifications.channelRemoved'))
      handleClose()
    }
    catch (err) {
      console.error('Ошибка удаления канала:', err)
      toast.error(t('notifications.networkError'))
    }
  }, [dispatch, channelId, handleClose, t])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'Enter') handleConfirm()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleClose, handleConfirm])

  return createPortal(
    <Modal title={t('channels.modal.removeTitle')} onClose={handleClose}>
      <RemoveChannelModal
        onConfirm={handleConfirm}
        onCancel={handleClose}
        isDeleting={isDeleting}
      />
    </Modal>,
    document.body,
  )
}

export default RemoveModal
