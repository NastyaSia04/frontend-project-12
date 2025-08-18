import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { createSelector } from '@reduxjs/toolkit'

import channelSchema from '../../utils/validation/channelSchema'
import RenameChannelModal from '../../components/MainComponents/RenameChannelModal'
import Modal from '../../components/MainComponents/Modal'
import { closeModal } from '../../store/entities/uiSlice'
import { renameChannelAsync } from '../../store/entities/channelsSlice'
import { useApiError } from '../../hooks/useApiError'

// Мемоизация селектора
const selectExistingChannelNames = createSelector(
  (state) => state.channels.list,
  (_, channelId) => channelId,
  (channels, channelId) => channels
    .filter(channel => channel.id !== channelId)
    .map(channel => channel.name)
)

const RenameModal = ({ channelId, currentName }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleApiError = useApiError()

  const existingChannelNames = useSelector(state =>
    selectExistingChannelNames(state, channelId))

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

  const handleSubmit = useCallback(async (newName, { setSubmitting }) => {
    try {
      const cleanedName = filter.clean(newName.trim())
      await dispatch(renameChannelAsync({ id: channelId, name: cleanedName })).unwrap()
      toast.success(t('notifications.channelRenamed'))
      handleClose()
    }
    catch (err) {
      console.error('Ошибка при переименовании канала:', err)
      handleApiError(err, { defaultMessageKey: 'notifications.networkError' })
    }
    finally {
      setSubmitting(false)
    }
  }, [dispatch, channelId, handleClose, t, handleApiError])

  useEffect(() => {
    const handleKey = e => e.key === 'Escape' && handleClose()
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleClose])

  return createPortal(
    <Modal title={t('channels.modal.renameTitle')} onClose={handleClose}>
      <Formik
        initialValues={{ name: currentName }}
        validationSchema={channelSchema(existingChannelNames)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, actions) => handleSubmit(values.name, actions)}
      >
        {formikProps => (
          <RenameChannelModal
            {...formikProps}
            onHide={handleClose}
          />
        )}
      </Formik>
    </Modal>,
    document.body,
  )
}

export default RenameModal
