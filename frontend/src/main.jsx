import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import { SignIn } from './auth/signIn.jsx'
import { LogIn } from './auth/logIn.jsx'

const router = createBrowserRouter([
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
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {router} />
  </StrictMode>,
)
