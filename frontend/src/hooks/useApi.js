import { useContext } from 'react'
import ApiContext from '../context/ApiContext'

const useApi = () => {
  const context = useContext(ApiContext)

  if (!context) {
    throw new Error('useApi должен использоваться внутри ApiProvider')
  }
  return context
}

export default useApi
