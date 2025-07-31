import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'

const init = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default init