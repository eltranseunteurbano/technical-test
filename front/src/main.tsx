import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './pages/App'
import './assets/styles/index.css'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
