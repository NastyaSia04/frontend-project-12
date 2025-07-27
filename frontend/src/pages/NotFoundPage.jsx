import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="h-100 bg-light">
      <div className="h-100 d-flex flex-column">
        <div className="text-center">
          {/* Картинка с классами и стилями как в демо */}
          <img
            src="/assets/404-D_FLHmTM.svg"
            alt="Страница не найдена"
            className="img-fluid h-25" // h-25 - как в демо (25% высоты родителя)
          />
          
          {/* Текст (полное соответствие демо) */}
          <h1 className="h4 text-muted">Страница не найдена</h1>
          <p className="text-muted">
            Но вы можете <Link to="/">перейти на главную страницу</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage