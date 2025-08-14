import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import init from './init.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'


init().then((app) => {
  createRoot(document.getElementById('root')).render(
  <StrictMode>
    {app}
  </StrictMode>,
  )
})
