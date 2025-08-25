// src/App.tsx
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useEffect, useState } from 'react'

export default function App() {
  const nav = useNavigate()
  const [user, setUser] = useState(() => auth.currentUser)

  useEffect(() =>
    onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (!u) nav('/login')
    }),
  [nav])

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b">
        <div className="max-w-5xl mx-auto p-4 flex gap-4 items-center">
          <Link to="/" className="font-extrabold text-primary">POLY-AIQ</Link>
          <div className="ml-auto text-sm text-slate-600">{user.email}</div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
