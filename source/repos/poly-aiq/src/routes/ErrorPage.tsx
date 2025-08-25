import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

export default function ErrorPage() {
  const err = useRouteError()
  let title = 'Something went wrong'
  let message = 'Please try again.'

  if (isRouteErrorResponse(err)) {
    title = `${err.status} ${err.statusText}`
    message = (err.data as string) || message
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-slate-600 mb-4">{message}</p>
        <div className="flex gap-2">
          <Link to="/" className="px-3 py-2 rounded bg-primary text-white">Home</Link>
          <Link to="/login" className="px-3 py-2 rounded border">Login</Link>
        </div>
      </div>
    </div>
  )
}
