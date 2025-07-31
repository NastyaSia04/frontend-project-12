import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import init from './init.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {init()}
  </StrictMode>,
)