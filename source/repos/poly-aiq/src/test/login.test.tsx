// import { render, screen, fireEvent, waitFor } from '@testing-library/react'
// import { MemoryRouter } from 'react-router-dom'
// import { Login } from '@/routes/Login'

// // Mock the Firebase Auth bits used by Login
// const signInWithPopup = vi.fn()
// class GoogleAuthProvider { providerId = 'google.com' }
// vi.mock('firebase/auth', () => ({
//   signInWithPopup: (...args: any[]) => signInWithPopup(...args),
//   GoogleAuthProvider,
// }))

// // Mock our firebase app export
// vi.mock('@/lib/firebase', () => ({ auth: {} }))

// function renderLogin() {
//   render(
//     <MemoryRouter initialEntries={["/login"]}>
//       <Login />
//     </MemoryRouter>
//   )
// }

// test('renders a Continue with Google button', () => {
//   renderLogin()
// const googleBtn = screen.getByRole('button', { name: /google/i })
// expect(googleBtn).toBeInTheDocument()})

// test('clicking Google button calls signInWithPopup with a GoogleAuthProvider', async () => {
//   signInWithPopup.mockResolvedValueOnce({ user: { uid: 'u1' } })
//   renderLogin()
//   fireEvent.click(screen.getByRole('button', { name: /continue with google/i }))
//   await waitFor(() => expect(signInWithPopup).toHaveBeenCalled())
//   const [, provider] = signInWithPopup.mock.calls[0]
//   expect(provider?.providerId).toBe('google.com')
// })

// test('shows an error message if Google popup fails', async () => {
//   signInWithPopup.mockRejectedValueOnce(new Error('popup blocked'))
//   renderLogin()
//   fireEvent.click(screen.getByRole('button', { name: /continue with google/i }))
//   await screen.findByText(/popup blocked/i)
// })
