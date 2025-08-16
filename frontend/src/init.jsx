import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'

import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.js'
import filter from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: import.meta.env.MODE || 'development',
}

filter.loadDictionary('ru')
filter.loadDictionary('en')

const init = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
)

export default init
