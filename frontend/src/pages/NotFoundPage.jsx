import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div>
      <h1>Страница не найдена</h1>
      <p>Но вы можете <Link to='/'>перейти на главную страницу</Link></p>
    </div>
  )
}

export default NotFoundPage

//адрес картинки src="https://cdn.hexlet.io/assets/error-page/not-found.svg"