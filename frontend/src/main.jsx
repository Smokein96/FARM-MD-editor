import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import './index.css'

import App from './pages//App.jsx'
import { SignIn } from './pages/signIn.jsx'
import { LogIn } from './pages/logIn.jsx'
import { NotFound } from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Navigate to="/login" replace />
  },
  {
    path : '/notes',
    element : <App/>
  },
  {
    path : '/setup',
    element : <SignIn/>
  },
  {
    path : '/login',
    element : <LogIn/>
  },
  {
    path : '*',
    element : <NotFound/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

