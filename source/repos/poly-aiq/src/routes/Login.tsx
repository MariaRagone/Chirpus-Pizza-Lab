import { useState, type FormEvent } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      // App’s onAuthStateChanged handler can redirect after this
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  async function onGoogle() {
    setError(null)
    setBusy(true)
    try {
      // Try popup first; fall back to redirect if blocked
      await signInWithPopup(auth, googleProvider)
    } catch (e: any) {
      if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/popup-closed-by-user') {
        try {
          await signInWithRedirect(auth, googleProvider)
        } catch (err: any) {
          setError(err.message)
        }
      } else {
        setError(e.message)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-center">POLY-AIQ</h1>

        <button
          type="button"
          onClick={onGoogle}
          disabled={busy}
          className="w-full py-2 rounded border bg-white hover:bg-slate-50"
        >
          Continue with Google
        </button>

        <div className="relative pt-2">
          <div className="text-center text-xs text-slate-400">or</div>
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          disabled={busy}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          disabled={busy}
        />

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button className="w-full py-2 rounded bg-primary text-white disabled:opacity-60" disabled={busy}>
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </button>

        <button
          type="button"
          className="w-full text-sm text-slate-600"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        >
          {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Log in'}
        </button>
      </form>
    </div>
  )
}
