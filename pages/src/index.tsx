import React from 'react'
import ReactDOM from 'react-dom'

import './assets/style/index.css'

import { App } from './components/app'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
)
