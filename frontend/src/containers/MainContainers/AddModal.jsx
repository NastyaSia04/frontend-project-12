import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import AddChannelModal from '../../components/MainComponents/AddChannelModal'
import Modal from '../../components/MainComponents/Modal'
import { closeModal } from '../../store/entities/uiSlice'
import { addChannelAsync } from '../../store/entities/channelsSlice'

const AddModal = () => {
  const dispatch = useDispatch()

  // Список существующих имен каналов — нужен для валидации
  const existingChannelNames = useSelector(
    (state) => state.channels.list.map((channel) => channel.name)
  )

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

  const handleSubmit = useCallback((name) => {
    dispatch(addChannelAsync(name))
      .unwrap()
      .then(() => {
        handleClose()
      })
      .catch((err) => {
        console.error('Ошибка при добавлении канала:', err)
      })
  }, [dispatch, handleClose])

  // Закрытие по Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleClose])

  // Создание портала в body (вырисовывается поверх страницы) в конец body
  return createPortal(
    <Modal title='Добавить канал' onClose={handleClose}>
      <AddChannelModal
        existingChannelName={existingChannelNames}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </Modal>,
    document.body
  )
}

export default AddModal
