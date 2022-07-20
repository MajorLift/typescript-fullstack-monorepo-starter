import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = (): JSX.Element => {
  return (
    <nav className="p-3 bg-slate-900">
      <button className="p-1 pl-3 pr-3 font-semibold text-gray-200 duration-200 font-sans-serif hover:text-slate-400">
        <Link to="/login">Login</Link>
      </button>
      <button className="p-1 pl-3 pr-3 font-semibold text-gray-200 duration-200 font-sans-serif hover:text-slate-400">
        <Link to="/items">Notes</Link>
      </button>
    </nav>
  )
}
