import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'

// Mostrando o app dentro da div com id root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
