import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'

import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.js'
import filter from 'leo-profanity'

filter.loadDictionary('ru')
filter.loadDictionary('en')

const init = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
)

export default init
