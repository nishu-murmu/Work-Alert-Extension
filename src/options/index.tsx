import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Options'
import '../styles/main-compiled.css'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
