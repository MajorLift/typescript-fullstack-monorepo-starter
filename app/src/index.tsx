import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'

import 'styles/index.css'

import { store } from '@mono/core'
import App from 'components/App'
import { createRoot } from 'react-dom/client'

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
