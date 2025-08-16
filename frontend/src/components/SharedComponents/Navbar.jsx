import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LoginNavbar = ({ children }) => {
  const { t } = useTranslation()

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">{t('navbar.title')}</Link>
        {children}
      </div>
    </nav>
  )
}

export default LoginNavbar
