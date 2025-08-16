import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import avatarNotfound from '../../assets/404-D_FLHmTM.svg'

const NotFoundLayout = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img
        src={avatarNotfound}
        alt={t('notFound.title')}
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.description', {
          link: (
            <Link to="/" className="text-primary">
              {t('notFound.linkText')}
            </Link>
          ),
        })}
      </p>
    </div>
  )
}

export default NotFoundLayout
