import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import channelSchema from '../../utils/validation/channelSchema'
import RenameChannelModal from '../../components/MainComponents/RenameChannelModal'
import Modal from '../../components/MainComponents/Modal'
import { closeModal } from '../../store/entities/uiSlice'
import { renameChannelAsync } from '../../store/entities/channelsSlice'

const RenameModal = ({ channelId, currentName }) => {
  const dispatch = useDispatch()
  const existingChannelNames = useSelector(state => 
    state.channels.list
      .filter(channel => channel.id !== channelId)
      .map(channel => channel.name)
  )

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

  const handleSubmit = useCallback(async (newName, { setSubmitting }) => {
    try {
      await dispatch(renameChannelAsync({ id: channelId, name: newName })).unwrap()
      handleClose()
    } catch (err) {
      console.error('Ошибка при переименовании канала:', err)
    } finally {
      setSubmitting(false)
    }
  }, [dispatch, channelId, handleClose])

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && handleClose()
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleClose])

  return createPortal(
    <Modal title="Переименовать канал" onClose={handleClose}>
      <Formik
        initialValues={{ name: currentName }}
        validationSchema={channelSchema(existingChannelNames)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, actions) => handleSubmit(values.name, actions)}
      >
        {(formikProps) => (
          <RenameChannelModal 
            {...formikProps}
            onHide={handleClose}
          />
        )}
      </Formik>
    </Modal>,
    document.body
  )
}

export default RenameModal