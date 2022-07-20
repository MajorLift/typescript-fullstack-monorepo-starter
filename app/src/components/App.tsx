import React from 'react'
import { Route, Routes } from 'react-router'

import { AuthLayout } from 'components/auth'
import { ItemsLayout } from 'components/items'

import { Navbar } from './Navbar'

export default function App(): JSX.Element {
  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/items" element={<ItemsLayout />} />
      </Routes>
    </div>
  )
}
