import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import channelSchema from '../../utils/validation/channelSchema'
import AddChannelModal from '../../components/MainComponents/AddChannelModal'
import Modal from '../../components/MainComponents/Modal'
import { closeModal } from '../../store/entities/uiSlice'
import { addChannelAsync } from '../../store/entities/channelsSlice'

const AddModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const existingChannelNames = useSelector(
    state => state.channels.list.map(channel => channel.name)
  )

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

  const handleSubmit = useCallback(async ({ name }, { setSubmitting }) => {
    try {
      await dispatch(addChannelAsync(name)).unwrap()
      handleClose()
    } catch (err) {
      console.error('Ошибка при добавлении канала:', err)
    } finally {
      setSubmitting(false)
    }
  }, [dispatch, handleClose])

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && handleClose()
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleClose])

  return createPortal(
    <Modal title={t('channels.modal.addTitle')} onClose={handleClose}>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={channelSchema(t, existingChannelNames)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <AddChannelModal 
            {...formikProps}
            onHide={handleClose}
          />
        )}
      </Formik>
    </Modal>,
    document.body
  )
}

export default AddModal
