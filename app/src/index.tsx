import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@mono/core'
import App from 'components/App'
import 'styles/index.css'

const rootNode = document.querySelector('#root')
if (rootNode) {
  createRoot(rootNode).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}
