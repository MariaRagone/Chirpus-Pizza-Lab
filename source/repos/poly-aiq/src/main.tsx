import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App'
import Login from './routes/Login'
import Dashboard from './Dashboard'
import './index.css'
import ErrorPage from './routes/ErrorPage'

const router = createBrowserRouter([
  { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
  // global catch-all: anything else goes to /login
  { path: '*', element: <Navigate to="/login" replace /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
