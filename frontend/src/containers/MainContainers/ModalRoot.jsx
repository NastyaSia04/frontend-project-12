import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AddModal from './AddModal'
import RemoveModal from './RemoveModal'
import RenameModal from './RenameModal'

const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
}

const ModalRoot = () => {
  const modal = useSelector((state) => state.ui.modal)

  useEffect(() => {
    if (modal) {
      // Если модалка открыта — блокируем прокрутку
      document.body.classList.add('modal-open')
      document.body.style.overflow = 'hidden'
      return () => {
        // Разблокируем при размонтировании или закрытии модалки
        document.body.classList.remove('modal-open')
        document.body.style.overflow = ''
      }
    }
  }, [modal]) // хук зависит от modal

  if (!modal) return null // модалки нет, ничего не делаем

  const Component = modals[modal.type]
  if (!Component) {
    console.error(`Modal type "${modal.type}" is not defined`)
    return null
  }

  return <Component {...modal.extra} />
}

export default ModalRoot
