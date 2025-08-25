import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b">
        <div className="max-w-5xl mx-auto p-4 flex gap-6">
          <Link to="/" className="font-extrabold text-primary">MyApp</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
