import React, { useState } from 'react'

export const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className="flex flex-col pt-5 pl-5 pr-5 space-y-3 shadow-lg shadow-black bg-slate-500 rounded-xl">
      <div>
        <p className="font-light text-gray-100">Email or username</p>
        <input
          type="text"
          className="w-full p-1"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <p className="font-light text-gray-100">Password</p>
        <input
          type="password"
          className="w-full p-1"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <p className="font-semibold duration-200 text-slate-200 hover:text-slate-900">
        <a href="/">I forgot my password</a>
      </p>
      <div className="flex flex-row justify-between pb-5 pl-4 pr-4">
        <button
          type="submit"
          className="p-1 pl-5 pr-5 font-semibold text-gray-100 duration-200 rounded-md shadow-lg bg-slate-400 hover:bg-slate-600 hover:text-slate-200 active:bg-slate-800"
          onClick={() => null}
        >
          Signup
        </button>
        <button
          type="submit"
          className="p-1 pl-5 pr-5 font-bold text-gray-100 duration-150 rounded-md shadow-lg bg-slate-900 hover:bg-slate-600 hover:shadow-md hover:shadow-sy-500 hover:text-slate-200 active:bg-slate-400"
          onClick={() => null}
        >
          Login
        </button>
      </div>
    </form>
  )
}
