import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AddModal from './AddModal'
// import RenameModal from './RenameModal'
// import RemoveModal from './RemoveModal'

const modals = {
  add: AddModal,
  //rename: RenameModal,
  //remove: RemoveModal,
}

const ModalRoot = () => {
  const modal = useSelector((state) => state.ui.modal)

  useEffect(() => {
    if (!modal) {
      // Если модалка закрыта — ничего не делаем
      return
    }
    
    // Если модалка открыта — блокируем прокрутку
    document.body.classList.add('modal-open')
    document.body.style.overflow = 'hidden'

    return () => {
      // Разблокируем при размонтировании или закрытии модалки
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
    }
  }, [modal]) // хук зависит от modal

  if (!modal) return null

  const { type, extra } = modal
  const Component = modals[type]

  return <Component {...extra} />
}

export default ModalRoot
