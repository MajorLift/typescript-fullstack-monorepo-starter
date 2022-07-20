import React from 'react'

import { LoginForm } from 'components/auth/LoginForm'

export const AuthLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen p-20 bg-slate-800 min-w-fit">
      <LoginForm />
    </div>
  )
}
