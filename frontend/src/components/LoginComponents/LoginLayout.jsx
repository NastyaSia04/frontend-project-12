import Navbar from '../SharedComponents/Navbar'
import LoginForm from './LoginForm'
import { useTranslation } from 'react-i18next'
import avatarLogin from '../../assets/avatar-DIE1AEpS.jpg'

const LoginLayout = ({ onSubmit }) => {
  const { t } = useTranslation()

  return (
    <div className="h-100 bg-light">
      <div className="d-flex flex-column h-100" id="chat">
        {/* Навигационная панель */}
        <Navbar />

        {/* Основное содержимое */}
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  {/* Левая колонка с аватаркой */}
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img
                      src={avatarLogin}
                      className="rounded-circle"
                      alt={t('login.altLogin')}
                    />
                  </div>

                  {/* Правая колонка с формой */}
                  <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('login.submit')}</h1>
                    <LoginForm onSubmit={onSubmit} />
                  </div>
                </div>

                {/* Футер */}
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>
                      {t('login.noAccount')} 
                    </span>
                    <a href="/signup">{t('login.signup')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout
