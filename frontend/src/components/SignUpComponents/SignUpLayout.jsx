import { useTranslation } from 'react-i18next'
import Navbar from '../SharedComponents/Navbar'
import SignUpForm from './SignUpForm'
import avatarSignup from '../../assets/avatar_1-D7Cot-zE.jpg'

const SignUpLayout = ({ onSubmit }) => {
  const { t } = useTranslation()

  return(
    <div className="h-100 bg-light">
      <div className="d-flex flex-column h-100" id="chat">
        <Navbar />

        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img
                      src={avatarSignup}
                      className="rounded-circle"
                      alt={t('signUp.title')}
                    />
                  </div>

                  <div className="w-50">
                    <h1 className="text-center mb-4">{t('signUp.title')}</h1>
                    <SignUpForm onSubmit={onSubmit} />
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

export default SignUpLayout
