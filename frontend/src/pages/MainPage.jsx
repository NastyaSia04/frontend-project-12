import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      //если токена нет — редирект на /login
      navigate('/login')
    }
  }, [navigate])

  return (
    <div>
      <h1>Добро пожаловать в чат!</h1>
      {/* Здесь позже будет интерфейс чата */}
    </div>
  )
}

export default MainPage